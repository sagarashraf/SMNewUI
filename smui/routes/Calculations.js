const express = require("express");
const router = express.Router();
const Moment = require("moment");
const formulajs = require("@formulajs/formulajs");
var config = require("../db_connection/connection");
const Section = require("../helperFuntions/SectionWeightage");
const MedicalHpUnhedge = require("../controllers/MedicalHpUnhedge");
const LifeStyleUnhedge = require("../controllers/LifeStyleUnhedge");
const LegalRiskUnhedge = require("../controllers/LegalRiskUnhedge");
const FinancialRiskUnhedge = require("../controllers/FinancialRiskUnhedge");
const InsuranceRatingUnhedge = require("../controllers/InsuranceRatingUnhedge");
const TotalBaseRate = require("../helperFuntions/TotalBaseRate");
const GpCalculations = require("../controllers/GpCalculations");
const LCPQuotesWithoutPercentStep = require("../controllers/LCPQuotesWithoutPercentStep");
const LCPQuotesWithPercentStep = require("../controllers/LCPQuotesWithPercentStep");
const GPQuotesWithPercentStep = require("../controllers/GPQuotesWithPercentStep");
const GPQuotesWithoutPercentStep = require("../controllers/GPQuotesWithoutPercentStep");
const LCPSingleQuoteWithoutPercentStep = require("../controllers/LCPSingleQuoteWithoutPercentStep");
const LCPSingleQuoteWithPercentStep = require("../controllers/LCPSingleQuoteWithPercentStep");
const CommissionStructureLevel = require("../controllers/CommissionStructureLevel");
var connection = config.connection;
router.post("/calculations", async (req, res) => {
	let pmntstartdate = new Date(req.body.paymentInfo.startDate);
	let pmntEndDate_hedge = new Date(req.body.paymentInfo.calEndDateHedge);
	let pmntEndDate_unhedge = new Date(req.body.paymentInfo.calEndDateUnhedge);
	let pmntEndDate = new Date(req.body.paymentInfo.endDate);
	let pmntAmount = parseInt(req.body.paymentInfo.paymentAmount);
	let pmntMode = req.body.paymentInfo.paymentMode;
	let percentStep = req.body.paymentInfo.annualIncrese;
	console.log("A", pmntstartdate);
	console.log("B", pmntEndDate_hedge);
	console.log("C", pmntEndDate_unhedge);
	console.log("D", pmntEndDate);
	console.log("E", pmntAmount);
	console.log("F", percentStep);
	console.log("G", pmntMode);

	if (
		req.body.personalInformation.paymentType == 1 ||
		req.body.personalInformation.paymentType == 3
	) {
		let sex = req.body.gender;
		let age = req.body.age;
		console.log(sex, age);
		const result = await Section(age, sex);
		const MedSection = await MedicalHpUnhedge(
			result,
			req.body.medicalData,
			sex
		);
		const lifestyleUnhedge = await LifeStyleUnhedge(
			result,
			req.body.lifeStyle,
			sex
		);
		const legalRisk = await LegalRiskUnhedge(result, req.body.legalRisk, sex);
		const financialRiskUnhedge = await FinancialRiskUnhedge(
			result,
			req.body.financialRisk,
			sex
		);
		const insurancerating = await InsuranceRatingUnhedge(
			result,
			req.body.insurance,
			sex
		);
		const totalBase = await TotalBaseRate(
			MedSection,
			lifestyleUnhedge,
			legalRisk,
			financialRiskUnhedge,
			insurancerating
		);
		console.log("Medical", MedSection);
		console.log("lifestyle", lifestyleUnhedge);
		console.log("legal", legalRisk);
		console.log("financial risk", financialRiskUnhedge);
		console.log("Insurance rating ", insurancerating);
		console.log("total Base ", totalBase);
		if (percentStep == 0) {
			//For Unhedge Date
			let LCPWithoutAIUnhedge = await LCPQuotesWithoutPercentStep(
				pmntstartdate,
				pmntEndDate_unhedge,
				pmntMode,
				pmntAmount,
				totalBase.maxBaseRate,
				totalBase.minBaseRate
			);
			let base_rate_quote = await LCPSingleQuoteWithoutPercentStep(
				pmntstartdate,
				pmntEndDate_unhedge,
				pmntMode,
				pmntAmount,
				totalBase.originalBaseRate
			);
			let CommStructureLevelUnhedge = await CommissionStructureLevel(
				base_rate_quote.LCPSingleQuoteWithoutAI,
				LCPWithoutAIUnhedge.LCPMaxQuotesWithoutAI,
				LCPWithoutAIUnhedge.LCPMinQuotesWithoutAI
			);
			//For hedge Date
			let LCPWithoutAIhedge = await LCPQuotesWithoutPercentStep(
				pmntstartdate,
				pmntEndDate_hedge,
				pmntMode,
				pmntAmount,
				0.104,
				0.094
			);
			let CommStructureLevelhedge = await CommissionStructureLevel(
				base_rate_quote.LCPSingleQuoteWithoutAI,
				LCPWithoutAIhedge.LCPMaxQuotesWithoutAI,
				LCPWithoutAIhedge.LCPMinQuotesWithoutAI
			);
			//Commission Structure for Unhedge Date

			console.log(
				"LCPWithoutAIUnhedge and hedge",
				LCPWithoutAIUnhedge,
				LCPWithoutAIhedge,
				CommStructureLevelUnhedge,
				CommStructureLevelhedge
			);
		} else {
			// For Unhedge date and Percent Step LCP
			let LCPWithAIUnhedge = await LCPQuotesWithPercentStep(
				pmntstartdate,
				pmntEndDate_unhedge,
				pmntMode,
				pmntAmount,
				totalBase.maxBaseRate,
				totalBase.minBaseRate,
				percentStep
			);

			let base_rate_quote = await LCPSingleQuoteWithPercentStep(
				pmntstartdate,
				pmntEndDate_unhedge,
				pmntMode,
				pmntAmount,
				totalBase.originalBaseRate,
				percentStep
			);

			let CommStructureLevelUnhedge = await CommissionStructureLevel(
				base_rate_quote.LCPSingleQuoteWithAI,
				LCPWithAIUnhedge.LCPMinQuotesWithAI,
				LCPWithAIUnhedge.LCPMaxQuotesWithAI
			);

			//For Hedge Date and Percent Step LCP
			let LCPWithAIhedge = await LCPQuotesWithPercentStep(
				pmntstartdate,
				pmntEndDate_hedge,
				pmntMode,
				pmntAmount,
				0.104,
				0.094,
				percentStep
			);
			//Commission Structure for Unhedge Date
			let CommStructureLevelhedge = await CommissionStructureLevel(
				base_rate_quote.LCPSingleQuoteWithAI,
				LCPWithAIhedge.LCPMinQuotesWithAI,
				LCPWithAIhedge.LCPMaxQuotesWithAI
			);
			console.log(
				"LCPWithAIUnhedge and hedge",
				LCPWithAIUnhedge,
				LCPWithAIhedge,
				CommStructureLevelUnhedge,
				CommStructureLevelhedge
			);
		}
	} else {
		let gpCal = await GpCalculations();
		console.log("gpCal", gpCal);
		if (percentStep == 0) {
			let GPWithoutAI = await GPQuotesWithoutPercentStep(
				pmntstartdate,
				pmntEndDate,
				pmntMode,
				pmntAmount,
				gpCal[0].max_impact,
				gpCal[0].min_impact
			);
			console.log("GPWithoutAI", GPWithoutAI);
		} else {
			let GPWithAI = await GPQuotesWithPercentStep(
				pmntstartdate,
				pmntEndDate,
				pmntMode,
				pmntAmount,
				gpCal[0].max_impact,
				gpCal[0].min_impact,
				percentStep
			);

			console.log("GPWithAI", GPWithAI);
		}
	}

	res.status(200).send("hello");
});

//function for calculation of GP with Percent Step

module.exports = router;
