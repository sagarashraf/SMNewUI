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
const CostOfInsurancePaymentAmount = require("../controllers/CostOfInsurancePayment");
const CostOfInsurance = require("../controllers/CostOfInsurance");
const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");
const CostOfInsurancePayment = require("../controllers/CostOfInsurancePayment");
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
			res.status(200).send({
				key: "LCP_Without_AI",
				LCPWithoutAIUnhedge,
				LCPWithoutAIhedge,
				CommStructureLevelUnhedge,
				CommStructureLevelhedge,
				BaseRateQoutation: base_rate_quote,
				CostOfInsuranceQoutation: "",
				CostOfInsurancePaymentAmount: "",
				LifeExpectency: {
					AveragLifeExpect: "",
					YourLifeExpect: "",
				},
				MortalityRate: "",
			});
			console.log({
				key: "LCP_Without_AI",
				LCPWithoutAIUnhedge,
				LCPWithoutAIhedge,
				CommStructureLevelUnhedge,
				CommStructureLevelhedge,
				BaseRateQoutation: base_rate_quote,
				CostOfInsuranceQoutation: "",
				CostOfInsurancePaymentAmount: "",
				LifeExpectency: {
					AveragLifeExpect: "",
					YourLifeExpect: "",
				},
				MortalityRate: "",
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
			res.status(200).send({
				key: "LCP_With_AI",
				LCPWithAIUnhedge,
				LCPWithAIhedge,
				CommStructureLevelUnhedge,
				CommStructureLevelhedge,
				BaseRateQoutation: base_rate_quote,
				CostOfInsuranceQoutation: "",
				CostOfInsurancePaymentAmount: "",
				LifeExpectency: {
					AveragLifeExpect: "",
					YourLifeExpect: "",
				},
				MortalityRate: "",
			});
			console.log({
				key: "LCP_With_AI",
				LCPWithAIUnhedge,
				LCPWithAIhedge,
				CommStructureLevelUnhedge,
				CommStructureLevelhedge,
				BaseRateQoutation: base_rate_quote,
				CostOfInsuranceQoutation: "",
				CostOfInsurancePaymentAmount: "",
				LifeExpectency: {
					AveragLifeExpect: "",
					YourLifeExpect: "",
				},
				MortalityRate: "",
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
	let coi_smoke = req.body.lifeStyle.smoke;
	let coi_weight = req.body.personalInformation.weightBMI;
	let coi_constfac = 0.001438;
	let coi_facm = 0;
	let coi_facf = 0;
	let coi_death = 0;
	let coi_sttab = 0;
	let coi_stplus = 0;
	let coi_preftab = 0;
	let coi_uw = 0;
	let coi_ow = 0;
	let coi_ob = 0;



	if(req.body.gender == 0){
		coi_facf = 1;
		let factorq = `select factor from age_mulitple_30 where gender= "male" and age = "${req.body.age}`;
		coi_facm = await JsonConverter(await SqlQueryHandler(factorq));
		if(LCPWithoutAIhedge.LCPBEN){
			coi_death = LCPWithoutAIhedge.LCPBEN;

		}
		if(LCPWithAIhedge){
			coi_death = LCPWithAIhedge.LCPBEN;
		}
		let sttabq = `select factor from standard_tobacco_30 where gender= "male" and age = "${req.body.age}"`;
		coi_sttab = await JsonConverter(await SqlQueryHandler(sttabq));

		let stplusq = `select factor from standard_plus_30 where gender= "male" and age = "${req.body.age}"`;
		coi_stplus = await JsonConverter(await SqlQueryHandler(stplusq));

		let preftabq = `select factor from preferred_tobacco_30 where gender= "male" and age = "${req.body.age}"`;
		coi_preftab = await JsonConverter(await SqlQueryHandler(preftabq));

		let uwq = `select impact from weight_category where weight = "${coi_weight}"`;
		coi_uw = await JsonConverter(await SqlQueryHandler(uwq));

		let owq = `select impact from weight_category where weight ="${coi_weight}"`;
		coi_ow = await JsonConverter(await SqlQueryHandler(owq));

		let obq = `select impact from weight_category where weight ="${coi_weight}"`;
		coi_ob = await JsonConverter(await SqlQueryHandler(obq));

		let amount = await CostOfInsurancePaymentAmount(coi_smoke,coi_weight,coi_constfac,coi_facm,
			coi_facf,coi_death,coi_sttab,coi_stplus,coi_preftab,coi_uw,coi_ow,coi_ob)

		let curDate = new Date()
		var coi_pmntStartDate = curDate.setDate(curDate.getDate() + 90);

		let coi_quote = await CostOfInsurance(coi_pmntStartDate,pmntEndDate_hedge,pmntMode,amount,totalBase);



		

	}
	else{
		let factorq = `select factor from age_mulitple_30 where gender= "male" and age = "${req.body.age}`;
		coi_facm = await JsonConverter(await SqlQueryHandler(factorq));

		let factorfq = `select factor from age_mulitple_30 where gender= "female" and age = "${req.body.age}`;
		coi_facf = await JsonConverter(await SqlQueryHandler(factorfq));
		if(LCPWithoutAIhedge.LCPBEN){
			coi_death = LCPWithoutAIhedge.LCPBEN;

		}
		if(LCPWithAIhedge){
			coi_death = LCPWithAIhedge.LCPBEN;
		}
		let sttabq = `select factor from standard_tobacco_30 where gender= "female" and age = "${req.body.age}"`;
		coi_sttab = await JsonConverter(await SqlQueryHandler(sttabq));

		let stplusq = `select factor from standard_plus_30 where gender= "female" and age = "${req.body.age}"`;
		coi_stplus = await JsonConverter(await SqlQueryHandler(stplusq));

		let preftabq = `select factor from preferred_tobacco_30 where gender= "female" and age = "${req.body.age}"`;
		coi_preftab = await JsonConverter(await SqlQueryHandler(preftabq));

		let uwq = `select impact from weight_category where weight = "${coi_weight}"`;
		coi_uw = await JsonConverter(await SqlQueryHandler(uwq));

		let owq = `select impact from weight_category where weight ="${coi_weight}"`;
		coi_ow = await JsonConverter(await SqlQueryHandler(owq));

		let obq = `select impact from weight_category where weight ="${coi_weight}"`;
		coi_ob = await JsonConverter(await SqlQueryHandler(obq));

		let amount = await CostOfInsurancePaymentAmount(coi_smoke,coi_weight,coi_constfac,coi_facm,
			coi_facf,coi_death,coi_sttab,coi_stplus,coi_preftab,coi_uw,coi_ow,coi_ob)

		let curDate = new Date()
		var coi_pmntStartDate = curDate.setDate(curDate.getDate() + 90);

		let coi_quote = await CostOfInsurance(coi_pmntStartDate,pmntEndDate_hedge,pmntMode,amount,totalBase);

	}
	


});

//function for calculation of GP with Percent Step

module.exports = router;
