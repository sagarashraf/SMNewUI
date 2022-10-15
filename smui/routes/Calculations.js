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
const CostOfInsuranceController = require("../controllers/CostOfInsuranceController");
const AverageLifeExpect = require("../controllers/AverageLifeExpect");
const YourLifeExpect = require("../controllers/YourLifeExpect");
const Mortality = require("../controllers/MortalityController");
var connection = config.connection;
router.post("/calculations", async (req, res) => {
	console.log(req.body);
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
	console.log("header", req.headers);

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
			req.body?.medicalData,
			sex,
			req.body?.personalInformation?.weightBMI
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
			MedSection.medicalUnhedge,
			lifestyleUnhedge.lifeStyleUnhedge,
			legalRisk.legalStyleUnhedge,
			financialRiskUnhedge.finanvaluesUnhedge,
			insurancerating.insUnhedge
		);
		let Avg_life = await AverageLifeExpect(age, sex);
		const yourAvgExpect = await YourLifeExpect(
			MedSection.medLifeExpect,
			lifestyleUnhedge.lifeStyleExpect,
			legalRisk.legalStyleExpect,
			financialRiskUnhedge.finvaluesExpect,
			insurancerating.insLifeExpect,
			Avg_life
		);
		let Mortality_Controller = await Mortality(
			MedSection.MortalityValue,
			lifestyleUnhedge.MortalityValue,
			legalRisk.MortalityValue,
			sex
		);
		console.log("yourAvgExpect", yourAvgExpect);
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
			var LCPWithoutAIhedge = await LCPQuotesWithoutPercentStep(
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
			// COST Of INSURANCE
			let COI = await CostOfInsuranceController(
				req.body.lifeStyle.smoke.state,
				req.body.personalInformation.weightBMI,
				req.body.gender,
				req.body.age,
				LCPWithoutAIhedge.LCPBEN,
				pmntEndDate_hedge,
				pmntMode
			);
			console.log("COI", COI);

			//Commission Structure for Unhedge Date
			res.status(200).send({
				key: "LCP_Without_AI",
				LCPWithoutAIUnhedge,
				LCPWithoutAIhedge,
				CommStructureLevelUnhedge,
				CommStructureLevelhedge,
				BaseRateQoutation: base_rate_quote,
				CostOfInsuranceQoutation: COI.coi_quote,
				CostOfInsurancePaymentAmount: COI.amount,
				LifeExpectency: {
					AveragLifeExpect: Avg_life,
					YourLifeExpect: yourAvgExpect,
				},
				MortalityRate: Mortality_Controller,
			});
			console.log({
				key: "LCP_Without_AI",
				LCPWithoutAIUnhedge,
				LCPWithoutAIhedge,
				CommStructureLevelUnhedge,
				CommStructureLevelhedge,
				BaseRateQoutation: base_rate_quote,
				CostOfInsuranceQoutation: COI.coi_quote,
				CostOfInsurancePaymentAmount: COI.amount,
				LifeExpectency: {
					AveragLifeExpect: Avg_life,
					YourLifeExpect: yourAvgExpect,
				},
				MortalityRate: Mortality_Controller,
			});
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
			var LCPWithAIhedge = await LCPQuotesWithPercentStep(
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
			let COI = await CostOfInsuranceController(
				req.body.lifeStyle.smoke.state,
				req.body.personalInformation.weightBMI,
				req.body.gender,
				req.body.age,
				LCPWithAIhedge.LCPBEN,
				pmntEndDate_hedge,
				pmntMode
			);

			res.status(200).send({
				key: "LCP_With_AI",
				LCPWithAIUnhedge,
				LCPWithAIhedge,
				CommStructureLevelUnhedge,
				CommStructureLevelhedge,
				BaseRateQoutation: base_rate_quote,
				CostOfInsuranceQoutation: COI.coi_quote,
				CostOfInsurancePaymentAmount: COI.amount,

				LifeExpectency: {
					AveragLifeExpect: Avg_life,
					YourLifeExpect: yourAvgExpect,
				},
				MortalityRate: Mortality_Controller,
			});
			console.log({
				key: "LCP_With_AI",
				LCPWithAIUnhedge,
				LCPWithAIhedge,
				CommStructureLevelUnhedge,
				CommStructureLevelhedge,
				BaseRateQoutation: base_rate_quote,
				CostOfInsuranceQoutation: COI.coi_quote,
				CostOfInsurancePaymentAmount: COI.amount,
				LifeExpectency: {
					AveragLifeExpect: Avg_life,
					YourLifeExpect: yourAvgExpect,
				},
				MortalityRate: Mortality_Controller,
			});
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
			res.status(200).send({
				key: "GP_Without_AI",
				GPWithoutAI,
			});
			console.log({
				key: "GP_Without_AI",
				GPWithoutAI,
			});
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
			res.status(200).send({
				key: "GP_With_AI",
				GPWithAI,
			});
			console.log({
				key: "GP_With_AI",
				GPWithAI,
			});
		}
	}
});

//function for calculation of GP with Percent Step

module.exports = router;
