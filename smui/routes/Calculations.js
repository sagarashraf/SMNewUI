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

var connection = config.connection;
router.get("/b", async (req, res) => {
	let sex = "male";
	const result = await Section(21, sex);
	const MedSection = await MedicalHpUnhedge(result);
	const lifestyleUnhedge = await LifeStyleUnhedge(result);
	const legalRisk = await LegalRiskUnhedge(result);
	const financialRiskUnhedge = await FinancialRiskUnhedge(result);
	const insurancerating = await InsuranceRatingUnhedge(result);
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
	let gpCal = await GpCalculations();
	console.log("insurance company ", gpCal);
	res.status(200).send({ "total Base rate": gpCal });
});

router.post("/Calculate", async (req, res) => {
	//System Information

	let paymentType = "";
	let gender = "";
	let age = 0;
	let manualHeight = 0;
	let manualWeight = 0;
	let bmi = "";
	let rating = "";
	let startDate = "";
	let endDate = "";
	let calcEndHedge = "";
	let calcEndUnhedge = "";
	let at = 0;
	let annualIncrease = 0;

	//BHQ Starts Here

	//Medical Profile
	let hiv = "";
	let cancer = "";
	let cancer_y = 0;
	let annualCheckup = "";
	let majorMH = "";
	let bp = "";
	let bp_y = 0;
	let highCh = "";
	let highCh_y = 0;
	let asthma = "";
	let asthma_y = 0;
	let diabetes = "";
	let diabetes_y = "";
	let liver = "";
	let liver_y = 0;
	let kidney = "";
	let kidney_y = 0;
	let sleep = "";
	let sleep_y = 0;
	let bipolar = "";
	let bipolar_y = 0;
	let nd = "";
	let nd_y = 0;
	let pd = "";
	let pd_y = 0;
	let anxiety = "";
	let anxiety_y = 0;
	let heart = "";
	let heart_y = 0;
	let ango = "";
	let ango_y = 0;

	// Lifestyle BHQ

	let phyA = "";
	let exer = "";
	let veg = "";
	let dis = "";
	let smoke = "";
	let alch = "";
	let drug = "";

	// Legal Risk BHQ

	let drivingIn = "";
	let crime = "";
	let dui = "";
	let dui_y = 0;

	// Financial Risk History

	let bankrupt = "";
	let bankrupt_y = 0;
	let creditRating = "";

	//Insurance rating BHQ
	let lic = "";
	let dlic = "";
});

module.exports = router;
