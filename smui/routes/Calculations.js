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
const SqlQueryHandler = require("../helperFuntions/SqlQueryHandler");
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
				// new Date("01/01/2039"),
				// new Date("01/03/2063"),
				// "Monthly",
				// 10000,
				// 0.2,
				// 0.3,
				pmntstartdate,
				pmntEndDate_unhedge,
				pmntMode,
				pmntAmount,
				totalBase.maxBaseRate,
				totalBase.minBaseRate,
				"unhed==========?"
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
				0.094,
				"hed==========?"
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

	const insert = `INSERT INTO bhq_form_data 
	( first_name ,
	 last_name ,
	 pmnt_type ,
	 address ,
	 gender ,
	 date_of_birth ,
	 age ,
	 contact ,
	 social_security ,
	 email ,
	 height ,
	 weight_lbs ,
	 bmi ,
	 ins_name ,
	 ins_rating ,
	 pmnt_start_date ,
	 pmnt_end_date ,
	 hedge_date ,
	 unhedge_date ,
	 pmnt_amount ,
	 at_ ,
	 pmnt_mode ,
	 annual_increase ,
	 hiv ,
	 cancer ,
	 cancer_years ,
	 cancer_type ,
	 annual_checkup ,
	 medical_history ,
	 blood_pressure ,
	 blood_pressure_years ,
	 cholestrol ,
	 cholestrol_years ,
	 lung ,
	 lung_years ,
	 lung_type ,
	 diabetes ,
	 diabetes_type ,
	 liver_issue ,
	 liver_issue_years ,
	 liver_issue_type ,
	 kidney_issue ,
	 kidney_issue_years ,
	 kidney_issue_type ,
	 suicide ,
	 suicide_years ,
	 suicide_type ,
	 mental_health ,
	 mental_health_years ,
	 mental_health_type ,
	 nuero_disorder ,
	 nuero_disorder_years ,
	 nuero_disorder_type ,
	 pain_management ,
	 pain_management_years ,
	 pain_management_type ,
	 lead_poisioning ,
	 lead_posioning_years ,
	 lead_posioning_type ,
	 heart_issues ,
	 heart_issues_years ,
	 heart_issues_type ,
	 physical_active ,
	 physical_active_type ,
	 vegies ,
	 vegies_servings ,
	 disabilities ,
	 disabilities_type ,
	 smoke ,
	 smoke_type ,
	 alcohol ,
	 drug_abuse ,
	 drug_abuse_type ,
	 dui_dwi ,
	 dui_dwi_type ,
	 criminal ,
	 criminal_type ,
	 assault ,
	 assault_years ,
	 assault_type ,
	 bankrupt ,
	 bankrupt_type ,
	 credit_rating ,
	 life_ins_cov ,
	 declined_life_cov ,
	 child_support ,
	 child_support_value ,
	 marital_status ,
	 submitted_date ,
	 drug ,
	 drug_years ,
	 drug_type )
	VALUES
	('${req.body.personalInformation.firstName}',
	 '${req.body.personalInformation.lastName}',
	 '${req.body.personalInformation.paymentType}', 
	 '${req.body.personalInformation.address}',
	 '${req.body.gender}', 
	 ' ${req.body.personalInformation.dateBirth}',
	 '${req.body.personalInformation.ageAuto}',
	 '${req.body.personalInformation.contact}',
	 '${req.body.personalInformation.SSN}',
	 '${req.body.personalInformation.email}',
	 '${req.body.personalInformation.height}', 
	 '${req.body.personalInformation.weightLBS}', 
	 '${req.body.personalInformation.weightBMI}', 
	 '${req.body.personalInformation.insuranceCompany}',
	 '${req.body.personalInformation.insuranceCompanyRating}',
	 '${req.body.paymentInfo.startDate}', 
	 '${req.body.paymentInfo.endDate}',
	 '${req.body.paymentInfo.calEndDateHedge}', 
	 '${req.body.paymentInfo.calEndDateUnhedge}', 
	 '${req.body.paymentInfo.paymentAmount}', 
	 '${req.body.paymentInfo.atPercent}', 
	 '${req.body.paymentInfo.paymentMode}', 
	 '${req.body.paymentInfo.annualIncrese}', 
	 '${req.body.medicalData.hiv}', 
	 '${req.body.medicalData.cancer.state}', 
	 '${req.body.medicalData.cancer.level}', 
	 '${req.body.medicalData.cancer.type}',
	 '${req.body.medicalData.checkUp}', 
	 '${req.body.medicalData.medHistory}', 
	 '${req.body.medicalData.hypertension.state}', 
	 '${req.body.medicalData.hypertension.level}', 
	 '${req.body.medicalData.cholesterol.state}',
	 '${req.body.medicalData.cholesterol.level}',
	 '${req.body.medicalData.lung.state}', 
	 '${req.body.medicalData.lung.level}', 
	 '${req.body.medicalData.lung.type}',
	 '${req.body.medicalData.diabetes.state}',
	 '${req.body.medicalData.diabetes.type}',
	 '${req.body.medicalData.liver.state}',
	 '${req.body.medicalData.liver.level}', 
	 '${req.body.medicalData.liver.type}',
	 '${req.body.medicalData.kidney.state}', 
	 '${req.body.medicalData.kidney.level}', 
	 '${req.body.medicalData.kidney.type}', 
	 '${req.body.medicalData.suicide.state}',
	 '${req.body.medicalData.suicide.level}', 
	 '${req.body.medicalData.suicide.type}', 
	 '${req.body.medicalData.mentalHealth.state}', 
	 '${req.body.medicalData.mentalHealth.level}', 
	 '${req.body.medicalData.mentalHealth.type}', 
	 '${req.body.medicalData.neuroDisorder.state}', 
	 '${req.body.medicalData.neuroDisorder.level}',
	 '${req.body.medicalData.neuroDisorder.type}',
	 '${req.body.medicalData.pain.state}', 
	 '${req.body.medicalData.pain.level}',
	 '${req.body.medicalData.pain.type}', 
	 '${req.body.medicalData.lead.state}', 
	 '${req.body.medicalData.lead.level}', 
	 '${req.body.medicalData.lead.type}', 
	 '${req.body.medicalData.heartIssue.state}',
	 '${req.body.medicalData.heartIssue.level}',
	 '${req.body.medicalData.heartIssue.type}', 
	 '${req.body.lifeStyle.phyActive}', 
	 '${req.body.lifeStyle.phyActivities}', 
	 '${req.body.lifeStyle.fruitVeg}', 
	 '${req.body.lifeStyle.fruitvegportion}', 
	 '${req.body.lifeStyle.disabilities.state}', 
	 '${req.body.lifeStyle.disabilities.type}', 
	 '${req.body.lifeStyle.smoke.state}', 
	 '${req.body.lifeStyle.smoke.type}', 
	 '${req.body.lifeStyle.alchohol}', 
	 '${req.body.lifeStyle.drugabuse.state}',
	 '${req.body.lifeStyle.drugabuse.type}', 
	 '${req.body.legalRisk.drivingHistory.state}',
	 '${req.body.legalRisk.drivingHistory.type}',
	 '${req.body.legalRisk.criminal.state}', 
	 '${req.body.legalRisk.criminal.type}',
	 '${req.body.legalRisk.assault.state}', 
	 '${req.body.legalRisk.assault.level}',
	 '${req.body.legalRisk.assault.type}',
	 '${req.body.financialRisk.bankcrupt.state}',
	 '${req.body.financialRisk.bankcrupt.type}', 
	 '${req.body.financialRisk.creditrating}', 
	 '${req.body.insurance.lifeCoverage}',
	 '${req.body.insurance.decline}', 
	 '${req.body.moreDetails.childSupport.state}',
	 '${req.body.moreDetails.childSupport.level}', 
	 '${req.body.moreDetails.married}', 
	 '${new Date().toString()}', 
	 '${req.body.medicalData.drug.state}',
	 '${req.body.medicalData.drug.level}',
	 '${req.body.medicalData.drug.type}')`;


	 





let ins_result = await SqlQueryHandler(insert);
});

//function for calculation of GP with Percent Step

module.exports = router;
