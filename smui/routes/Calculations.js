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
			let LCPWithoutAIUnhedge = LCPQuotesWithoutPercentStep(
				pmntstartdate,
				pmntEndDate_unhedge,
				pmntMode,
				pmntAmount,
				totalBase.maxBaseRate,
				totalBase.minBaseRate
			);
			//Commission Structure for Unhedge Date
			//Commission Level 1 for Revenue at 5%
			let cost_of_deal = 7500;
			let min_rev_5 = ((base_rate_quote - cost_of_deal - min_quote)/2)* 0.05
			let min_com_rev_5 = (min_rev_5/0.05) - min_rev_5;

			let max_rev_5 = ((base_rate_quote - cost_of_deal - max_quote)/2)* 0.05
			let max_com_rev_5 = (min_rev_5/0.05) - max_rev_5;

			//Commission Level 2 for Revenue at 10%
			let min_rev_10 = ((base_rate_quote - cost_of_deal - min_quote)/2)* 0.1
			let min_com_rev_10 = (min_rev_10/0.1) - min_rev_10;

			let max_rev_10 = ((base_rate_quote - cost_of_deal - max_quote)/2)* 0.1
			let max_com_rev_10 = (min_rev_10/0.1) - max_rev_10;


			//Commission Level 3 for Revenue at 20%
			let min_rev_20 = ((base_rate_quote - cost_of_deal - min_quote)/2)* 0.2
			let min_com_rev_20 = (min_rev_20/0.2) - min_rev_20;

			let max_rev_20 = ((base_rate_quote - cost_of_deal - max_quote)/2)* 0.2
			let max_com_rev_20 = (min_rev_20/0.2) - max_rev_20;

			//For hedge Date
			let LCPWithoutAIhedge = LCPQuotesWithoutPercentStep(
				pmntstartdate,
				pmntEndDate_hedge,
				pmntMode,
				pmntAmount,
				0.104,
				0.094
			);
			//Commission Structure for Unhedge Date
			//Commission Level 1 for Revenue at 5%
			let min_rev_5_h = ((base_rate_quote - cost_of_deal - min_quote)/2)* 0.05
			let min_com_rev_5_h = (min_rev_5_h/0.05) - min_rev_5_h;

			let max_rev_5_h = ((base_rate_quote - cost_of_deal - max_quote)/2)* 0.05
			let max_com_rev_5_h = (min_rev_5_h/0.05) - max_rev_5_h;

			//Commission Level 2 for Revenue at 10%
			let min_rev_10_h = ((base_rate_quote - cost_of_deal - min_quote)/2)* 0.1
			let min_com_rev_10_h = (min_rev_10_h/0.1) - min_rev_10_h;

			let max_rev_10_h = ((base_rate_quote - cost_of_deal - max_quote)/2)* 0.1
			let max_com_rev_10_h = (min_rev_10_h/0.1) - max_rev_10_h;


			//Commission Level 3 for Revenue at 20%
			let min_rev_20_h = ((base_rate_quote - cost_of_deal - min_quote)/2)* 0.2
			let min_com_rev_20_h = (min_rev_20_h/0.2) - min_rev_20_h;

			let max_rev_20_h = ((base_rate_quote - cost_of_deal - max_quote)/2)* 0.2
			let max_com_rev_20_h = (min_rev_20_h/0.2) - max_rev_20_h;
			console.log(
				"LCPWithoutAIUnhedge and hedge",
				LCPWithoutAIUnhedge,
				LCPWithoutAIhedge
			);


		} else {
			// For Unhedge date and Percent Step LCP
			let LCPWithAIUnhedge = LCPQuotesWithPercentStep(
				pmntstartdate,
				pmntEndDate_unhedge,
				pmntMode,
				pmntAmount,
				totalBase.maxBaseRate,
				totalBase.minBaseRate,
				percentStep
			);
			//Commission Structure for Unhedge Date
			//Commission Level 1 for Revenue at 5%
			let cost_of_deal = 7500;
			let min_rev_5 = ((base_rate_quote - cost_of_deal - min_quote)/2)* 0.05
			let min_com_rev_5 = (min_rev_5/0.05) - min_rev_5;

			let max_rev_5 = ((base_rate_quote - cost_of_deal - max_quote)/2)* 0.05
			let max_com_rev_5 = (min_rev_5/0.05) - max_rev_5;

			//Commission Level 2 for Revenue at 10%
			let min_rev_10 = ((base_rate_quote - cost_of_deal - min_quote)/2)* 0.1
			let min_com_rev_10 = (min_rev_10/0.1) - min_rev_10;

			let max_rev_10 = ((base_rate_quote - cost_of_deal - max_quote)/2)* 0.1
			let max_com_rev_10 = (min_rev_10/0.1) - max_rev_10;


			//Commission Level 3 for Revenue at 20%
			let min_rev_20 = ((base_rate_quote - cost_of_deal - min_quote)/2)* 0.2
			let min_com_rev_20 = (min_rev_20/0.2) - min_rev_20;

			let max_rev_20 = ((base_rate_quote - cost_of_deal - max_quote)/2)* 0.2
			let max_com_rev_20 = (min_rev_20/0.2) - max_rev_20;

			
			//For Hedge Date and Percent Step LCP
			let LCPWithAIhedge = LCPQuotesWithPercentStep(
				pmntstartdate,
				pmntEndDate_hedge,
				pmntMode,
				pmntAmount,
				0.104,
				0.094,
				percentStep
			);
			//Commission Structure for Unhedge Date
			//Commission Level 1 for Revenue at 5%
			let min_rev_5_h = ((base_rate_quote - cost_of_deal - min_quote)/2)* 0.05
			let min_com_rev_5_h = (min_rev_5_h/0.05) - min_rev_5_h;

			let max_rev_5_h = ((base_rate_quote - cost_of_deal - max_quote)/2)* 0.05
			let max_com_rev_5_h = (min_rev_5_h/0.05) - max_rev_5_h;

			//Commission Level 2 for Revenue at 10%
			let min_rev_10_h = ((base_rate_quote - cost_of_deal - min_quote)/2)* 0.1
			let min_com_rev_10_h = (min_rev_10_h/0.1) - min_rev_10_h;

			let max_rev_10_h = ((base_rate_quote - cost_of_deal - max_quote)/2)* 0.1
			let max_com_rev_10_h = (min_rev_10_h/0.1) - max_rev_10_h;


			//Commission Level 3 for Revenue at 20%
			let min_rev_20_h = ((base_rate_quote - cost_of_deal - min_quote)/2)* 0.2
			let min_com_rev_20_h = (min_rev_20_h/0.2) - min_rev_20_h;

			let max_rev_20_h = ((base_rate_quote - cost_of_deal - max_quote)/2)* 0.2
			let max_com_rev_20_h = (min_rev_20_h/0.2) - max_rev_20_h;
			console.log(
				"LCPWithAIUnhedge and hedge",
				LCPWithAIUnhedge,
				LCPWithAIhedge
			);
		}
	} else {
		let gpCal = await GpCalculations();
		if (percentStep == 0) {
			let GPWithoutAI = GPQuotesWithoutPercentStep(
				pmntstartdate,
				pmntEndDate,
				pmntMode,
				pmntAmount,
				gpCal[1],
				gpCal[0]
			);
			console.log("GPWithoutAI", GPWithoutAI);
		} else {
			let GPWithAI = GPQuotesWithPercentStep(
				pmntstartdate,
				pmntEndDate,
				pmntMode,
				pmntAmount,
				gpCal[1],
				gpCal[0],
				percentStep
			);

			console.log("GPWithAI", GPWithAI);
		}
	}
	console.log("ddfsd", req.body);

	


	

	res.status(200).send("hello");
});

//function for calculation of GP with Percent Step

module.exports = router;
