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
router.post("/calculations", async (req, res) => {
	console.log("ddfsd", req.body);
	let sex = req.body.gender;
	let age = req.body.age;
	console.log(sex, age);
	const result = await Section(age, sex);
	const MedSection = await MedicalHpUnhedge(result, req.body.medicalData, sex);
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
	let gpCal = await GpCalculations();
	console.log("insurance company ", gpCal);
	res.status(200).send({ "total Base rate": gpCal });

	let percentStep = req.body.paymentInfo.annualIncrese;
	let productType = "";

	if (
		req.body.personalInformation.paymentType == "1" ||
		req.body.personalInformation.paymentType == "3"
	) {
		productType = "LCP";
	} else {
		productType = "GP";
	}

	let pmntstartdate = new Date(req.body.paymentInfo.startDate);
	let pmntEndDate_hedge = new Date(req.body.paymentInfo.calEndDateHedge);
	let pmntEndDate_unhedge = new Date(req.body.paymentInfo.calEndDateUnhedge);
	let pmntEndDate = new Date(req.body.paymentInfo.endDate);
	let pmntAmount = parseInt(req.body.paymentInfo.paymentAmount);
	let cr = "";
	let crc = "";
	let pmntMode = req.body.paymentInfo.paymentMode;

	//For Hedge Date
	LCP_Min_Max_Quotes(
		pmntstartdate,
		pmntEndDate_hedge,
		pmntMode,
		pmntAmount,
		totalBase[1],
		totalBase[0]
	);

	//For Unhedge Date
	LCP_Min_Max_Quotes(
		pmntstartdate,
		pmntEndDate_unhedge,
		pmntMode,
		pmntAmount,
		totalBase_max,
		totalBase_min
	);

	//For Hedge Date and Percent Step LCP
	LCP_Min_Max_Quotes_AI(
		pmntstartdate,
		pmntEndDate_hedge,
		pmntMode,
		pmntAmount,
		totalBase_max,
		totalBase_min,
		percentStep
	);

	// For Unhedge date and Percent Step LCP
	LCP_Min_Max_Quotes_AI(
		pmntstartdate,
		pmntEndDate_unhedge,
		pmntMode,
		pmntAmount,
		totalBase_max,
		totalBase_min,
		percentStep
	);

	// For GP Without Percent Step
	GP_Min_Max_Quotes(pmntstartdate, pmntEndDate, pmntMode, pmntAmount, crc, cr);

	// For GP With Percent Step
	GP_Min_Max_Quotes_AI(
		pmntstartdate,
		pmntEndDate,
		pmntMode,
		pmntAmount,
		crc,
		cr,
		percentStep
	);
});

//function for calculation of LCP with hedge and unhedge date
function LCP_Min_Max_Quotes(
	pmntStartDate,
	pmntEndDate,
	pmntMode,
	pmntAmount,
	base_rate_max,
	base_rate_min
) {
	try {
		var sum = base_rate_min;
		var sumc = base_rate_max;
		var m = 0.0;
		var payments = pmntAmount;
		var freq = 0;
		if (pmntMode == "Weekly") {
			var diff = (pmntEndDate.getTime() - pmntStartDate.getTime()) / 1000;
			diff /= 60 * 60 * 24 * 7;
			freq = Math.abs(Math.round(diff));
			m = 52.0;
		}
		if (pmntMode == "Monthly") {
			freq =
				pmntEndDate.getMonth() -
				pmntStartDate.getMonth() +
				12 * (pmntEndDate.getFullYear() - pmntStartDate.getFullYear());
			m = 12.0;
		}
		if (pmntMode == "Quarterly") {
			var beginDate = Moment(pmntStartDate);
			var endDate = Moment(pmntEndDate);
			freq = Math.floor(endDate.diff(beginDate, "months") / 3);
			m = 4.0;
		}
		if (pmntMode == "Semiannually") {
			x = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
			freq = x * 2;
			m = 2.0;
		}
		if (pmntMode == "Annually") {
			freq = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
			m = 1.0;
		}
		var r = sum / m;
		var rc = sumc / m;
		var rb = 0.055 / m;

		var pva = payments + (payments * (1 - (1 + r) ** -(freq - 1))) / r;
		var pvc = payments + (payments * (1 - (1 + rc) ** -(freq - 1))) / rc;
		var benbb = payments + (payments * (1 - (1 + rb) ** -(freq - 1))) / rb;
		console.log("Min Quotation", pva);
		console.log("Max Quotation", pvc);
		console.log("Beneficiary Protection: ", benbb);
		return { maxQoutationforLCP: pva, minQoutationforLCP: pvc };
	} catch (err) {
		let error = {
			status: 500,
			error: "An error occurred. Please try again later.",
		};
		return;
	}
}

//function for calculation of LCP with Percent Step
function LCP_Min_Max_Quotes_AI(
	pmntStartDate,
	pmntEndDate,
	pmntMode,
	pmntAmount,
	base_rate_max,
	base_rate_min,
	percentStep
) {
	//Calculation Starts Here
	var sum = base_rate_min; //Minimum Discount Rate
	var sumc = base_rate_max; //Maximum Discount Rate
	var m = 0.0;

	var payments = pmntAmount;
	var freq = 0;
	if (pmntMode == "Weekly") {
		var diff = (pmntEndDate.getTime() - pmntStartDate.getTime()) / 1000;
		diff /= 60 * 60 * 24 * 7;
		freq = Math.abs(Math.round(diff));
		m = 52.0;
	}
	if (pmntMode == "Monthly") {
		freq =
			pmntEndDate.getMonth() -
			pmntStartDate.getMonth() +
			12 * (pmntEndDate.getFullYear() - pmntStartDate.getFullYear());
		m = 12.0;
	}
	if (pmntMode == "Quarterly") {
		var beginDate = Moment(pmntStartDate);
		var endDate = Moment(pmntEndDate);
		freq = Math.floor(endDate.diff(beginDate, "months") / 3);
		m = 4.0;
	}
	if (pmntMode == "Semiannually") {
		x = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
		freq = x * 2;
		m = 2.0;
	}
	if (pmntMode == "Annually") {
		freq = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
		m = 1.0;
	}

	var r = sum / m;
	var rc = sumc / m;
	var pvaf = [];
	var pvac = [];
	var pvab = [];
	var diff_in_years = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
	//Calculate the percent.
	var percent_step = (percentStep / 100) * payments;
	var ann_interest_rate = (1 + sum / m) ** m - 1;
	var ann_interest_rate_c = (1 + sumc / m) ** m - 1;
	var ann_interest_rate_b = (1 + 0.054 / m) ** m - 1;

	var rpr = ann_interest_rate / m;
	var rprc = ann_interest_rate_c / m;
	var rprb = ann_interest_rate_b / m;

	var j = 0;
	var h = 0;
	var pvaff = [];
	var pvafc = [];
	var pvabb = [];
	var nums = [];
	var nm = 0;

	if (pmntMode == "Annually") {
		pvaf.push(payments);
		pvac.push(payments);
		pvab.push(payments);
		for (j = 1; j < diff_in_years; j++) {
			percent_step = (percentStep / 100) * payments;
			payments = payments + percent_step;
			pvaf.push(payments);
			pvac.push(payments);
			pvab.push(payments);
		}
		pvaff.push(pvaf[0]);
		pvafc.push(pvac[0]);
		pvabb.push(pvab[0]);

		for (h = 1; h < pvaf.length; h++) {
			var pva = pvaf[h] / (1 + sum) ** h;
			var pvacc = pvac[h] / (1 + sumc) ** h;
			var pvabe = pvab[h] / (1 + 0.054) ** h;

			//console.log(h);
			pvaff.push(pva);
			pvafc.push(pvacc);
			pvabb.push(pvabe);
		}
		//console.log(pvaff)
		//console.log(pvaff);

		var pssum = 0.0;
		var pssumc = 0.0;
		var bensum = 0.0;
		var p = 0;

		for (p = 0; p < pvaff.length; p++) {
			pssum = pssum + pvaff[p];
		}
		for (p = 0; p < pvafc.length; p++) {
			pssumc = pssumc + pvafc[p];
		}

		for (p = 0; p < pvabb.length; p++) {
			bensum = bensum + pvabb[p];
		}
		console.log("Min Quote with Percent Step: ", pssum);
		console.log("Max Quote with Percent Step: ", pssumc);
		console.log("Beneficiary Protection with Percent Step: ", bensum);

		//Beneficiary Protection
		var date2 = new Date();
		const diffTime = Math.abs(pmntStartDate - date2);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		var kk = diffDays / 365;

		var benff = pssum / (1 + ann_interest_rate) ** kk;
		var benfc = pssumc / (1 + ann_interest_rate_c) ** kk;
	} else {
		for (j = 0; j < diff_in_years; j++) {
			if (pmntMode == "Weekly") {
				var pva = payments + (payments * (1 - (1 + rpr) ** -52)) / rpr;
				var pvacm = payments + (payments * (1 - (1 + rprc) ** -52)) / rprc;
				var pvabm = payments + (payments * (1 - (1 + rprb) ** -52)) / rprb;
			}
			if (pmntMode == "Monthly") {
				var pva = payments + (payments * (1 - (1 + rpr) ** -11)) / rpr;
				var pvacm = payments + (payments * (1 - (1 + rprc) ** -11)) / rprc;
				var pvabm = payments + (payments * (1 - (1 + rprb) ** -11)) / rprb;
			}
			if (pmntMode == "Quarterly") {
				var pva = payments + (payments * (1 - (1 + rpr) ** -3)) / rpr;
				var pvacm = payments + (payments * (1 - (1 + rprc) ** -3)) / rprc;
				var pvabm = payments + (payments * (1 - (1 + rprb) ** -3)) / rprb;
			}
			if (pmntMode == "Semiannually") {
				var pva = payments + (payments * (1 - (1 + rpr) ** -1)) / rpr;
				var pvacm = payments + (payments * (1 - (1 + rprc) ** -1)) / rprc;
				var pvabm = payments + (payments * (1 - (1 + rprb) ** -1)) / rprb;
			}
			pvaf.push(pva);
			pvac.push(pvacm);
			pvab.push(pvabm);
			//pmntStartDate.setMonth(pmntStartDate.getMonth()+12);
			payments = payments + percent_step;
			percent_step = (percentStep / 100) * payments;
			//console.log("payments",j,payments);
		}
		pvaff.push(pvaf[0]);
		pvafc.push(pvac[0]);
		pvabb.push(pvab[0]);

		for (h = 1; h < pvaf.length; h++) {
			var pva = pvaf[h] / (1 + ann_interest_rate) ** h;
			var pvaco = pvac[h] / (1 + ann_interest_rate_c) ** h;
			var benci = pvab[h] / (1 + ann_interest_rate_b) ** h;
			//console.log(h);
			pvaff.push(pva);
			pvafc.push(pvaco);
			pvabb.push(benci);
		}
		//console.log(pvaff)
		//console.log(pvaff);

		var pssum = 0.0;
		var pssumc = 0.0;
		var bensum = 0.0;
		var p = 0;

		for (p = 0; p < pvaff.length; p++) {
			pssum = pssum + pvaff[p];
		}
		//console.log(pssum);
		for (p = 0; p < pvafc.length; p++) {
			pssumc = pssumc + pvafc[p];
		}
		for (p = 0; p < pvabb.length; p++) {
			bensum = bensum + pvabb[p];
		}
		//console.log(pssumc);

		console.log("Max Quote with Percent Step: ", pssum);
		console.log("Min Quote with Percent Step: ", pssumc);
		console.log("Beneficiary Protection with Percent Step: ", bensum);
		console.log(pmntStartDate);
		console.log(pmntEndDate);

		//Beneficiary Protection
		var date2 = new Date();
		const diffTime = Math.abs(pmntStartDate - date2);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		var kk = diffDays / 365;
		console.log(kk);

		var benff = pssum / (1 + ann_interest_rate) ** kk;
		var benfc = pssumc / (1 + ann_interest_rate_c) ** kk;
	}
}

//function for calculation of GP without Percent Step
function GP_Min_Max_Quotes(
	pmntStartDate,
	pmntEndDate,
	pmntMode,
	pmntAmount,
	ins_imp_max,
	ins_imp_min
) {
	try {
		var diff_in_years_gp =
			pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
		if (diff_in_years_gp > 10 || diff_in_years_gp < 10) {
			pmntEndDate = new Date(
				pmntStartDate.getTime() + 3650 * 24 * 60 * 60 * 1000
			);
		}
		var cr = ins_imp_min;
		var crc = ins_imp_max;
		var m = 0.0;

		var diff_in_years_gp =
			pmntEndDate.getFullYear() - pmntStartDate.getFullYear();

		//Checking Ending Date of GP

		var payments = pmntAmount;
		var freq = 0;
		//pmntEndDate.setMonth(pmntStartDate.getMonth() + 120);
		if (pmntMode == "Weekly") {
			var diff = (pmntEndDate.getTime() - pmntStartDate.getTime()) / 1000;
			diff /= 60 * 60 * 24 * 7;
			freq = Math.abs(Math.round(diff));
			m = 52.0;
		}
		if (pmntMode == "Monthly") {
			freq =
				pmntEndDate.getMonth() -
				pmntStartDate.getMonth() +
				12 * (pmntEndDate.getFullYear() - pmntStartDate.getFullYear());
			m = 12.0;
		}
		if (pmntMode == "Quarterly") {
			var beginDate = Moment(pmntStartDate);
			var endDate = Moment(pmntEndDate);
			freq = Math.floor(endDate.diff(beginDate, "months") / 3);
			m = 4.0;
		}
		if (pmntMode == "Semiannually") {
			x = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
			freq = x * 2;
			m = 2.0;
		}
		if (pmntMode == "Annually") {
			freq = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
			m = 1.0;
		}
		var r = cr / m;
		var rc = crc / m;

		var pva = payments + (payments * (1 - (1 + r) ** -(freq - 1))) / r;
		var pvc = payments + (payments * (1 - (1 + rc) ** -(freq - 1))) / rc;

		console.log("Max Quote GP", pva);
		console.log("Min Quote GP", pvc);
	} catch (err) {
		console.log("err in getting results: ", err);
	}
}

//function for calculation of GP with Percent Step

function GP_Min_Max_Quotes_AI(
	pmntStartDate,
	pmntEndDate,
	pmntMode,
	pmntAmount,
	ins_imp_max,
	ins_imp_min,
	percentStep,
	age
) {
	try {
		//Get Rating
		var diff_in_years_gp =
			pmntEndDate.getFullYear() - pmntStartDate.getFullYear();

		if (diff_in_years_gp > 10 || diff_in_years_gp < 10) {
			pmntEndDate = new Date(
				pmntStartDate.getTime() + 3650 * 24 * 60 * 60 * 1000
			);
		}
		var cr = ins_imp_min;
		var crc = ins_imp_max;
		//console.log("cr", cr, "crc", crc);
		var m = 0.0;

		var payments = pmntAmount;
		var freq = 0;
		if (pmntMode == "Weekly") {
			var diff = (pmntEndDate.getTime() - pmntStartDate.getTime()) / 1000;
			diff /= 60 * 60 * 24 * 7;
			freq = Math.abs(Math.round(diff));
			m = 52.0;
		}
		if (pmntMode == "Monthly") {
			freq =
				pmntEndDate.getMonth() -
				pmntStartDate.getMonth() +
				12 * (pmntEndDate.getFullYear() - pmntStartDate.getFullYear());
			m = 12.0;
		}
		if (pmntMode == "Quarterly") {
			var beginDate = Moment(pmntStartDate);
			var endDate = Moment(pmntEndDate);
			freq = Math.floor(endDate.diff(beginDate, "months") / 3);
			m = 4.0;
		}
		if (pmntMode == "Semiannually") {
			x = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
			freq = x * 2;
			m = 2.0;
		}
		if (pmntMode == "Annually") {
			freq = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
			m = 1.0;
		}

		var pvaf = [];
		var pvac = [];
		var diff_in_years = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();

		//Calculate the percent.
		var percent_step = (percentStep / 100) * payments;
		//console.log("percent step",percent_step);
		//console.log("difference in years",diff_in_years);
		var ann_interest_rate = (1 + cr / m) ** m - 1;
		var ann_interest_rate_c = (1 + crc / m) ** m - 1;

		var rpr = ann_interest_rate / m;
		var rprc = ann_interest_rate_c / m;
		//console.log(sum);
		//console.log(ann_interest_rate);

		//console.log(calc_end);
		//onsole.log(freq,"frequency")
		var j = 0;
		var h = 0;
		var pvaff = [];
		var pvafc = [];
		var nums = [];
		var nm = 0;
		if (pmntMode == "Annually") {
			pvaf.push(payments);
			pvac.push(payments);
			for (j = 1; j < diff_in_years; j++) {
				percent_step = (percentStep / 100) * payments;
				payments = payments + percent_step;
				pvaf.push(payments);
				pvac.push(payments);
			}
			pvaff.push(pvaf[0]);
			pvafc.push(pvac[0]);

			for (h = 1; h < pvaf.length; h++) {
				var pva = pvaf[h] / (1 + cr) ** h;
				var pvacc = pvac[h] / (1 + crc) ** h;
				//console.log(h);
				pvaff.push(pva);
				pvafc.push(pvacc);
			}

			var pssum = 0.0;
			var pssumc = 0.0;
			var p = 0;
			for (p = 0; p < pvaff.length; p++) {
				pssum = pssum + pvaff[p];
			}
			for (p = 0; p < pvafc.length; p++) {
				pssumc = pssumc + pvafc[p];
			}
			console.log("Max Quote GP with Percent Step: ", pssum);
			console.log("Min Quote GP  with Percent Step: ", pssumc);

			//Beneficiary Protection
			var date2 = new Date();
			const diffTime = Math.abs(pmntStartDate - date2);
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
			var kk = diffDays / 365;
			var benff = pssum / (1 + ann_interest_rate) ** kk;
			var benfc = pssumc / (1 + ann_interest_rate_c) ** kk;

			console.log(pmntEndDate);

			var min_offer = Math.min(benff, benfc);
			var cutoff = "Yes";
			var ben_benfit = 0.0;
			if (min_offer < 200000) {
				cutoff = "No";
			}
			if (cutoff == "Yes") {
				if (age >= 18 && age <= 28) {
					var y = 0.5;
					ben_benfit = Math.round(formulajs.FLOORPRECISE(y * min_offer, 10000));
				}
				if (age >= 29 && age <= 35) {
					var y = 0.45;
					ben_benfit = Math.round(formulajs.FLOORPRECISE(y * min_offer, 10000));
				}
				if (age >= 36 && age <= 50) {
					var y = 0.4;
					ben_benfit = Math.round(formulajs.FLOORPRECISE(y * min_offer, 10000));
				}
				if (age >= 51 && age <= 65) {
					var y = 0.35;
					ben_benfit = Math.round(formulajs.FLOORPRECISE(y * min_offer, 10000));
				}
			}

			if (cutoff == "No") {
				if (age >= 18 && age <= 28) {
					ben_benfit = 150000;
				}
				if (age >= 29 && age <= 35) {
					ben_benfit = 125000;
				}
				if (age >= 36 && age <= 50) {
					ben_benfit = 100000;
				}
				if (age >= 51 && age <= 65) {
					ben_benfit = 100000;
				}
			}
			console.log("Max Quote GP with Percent Step: ", pssum);
			console.log("Min Quote with Percent Step: ", pssumc);
			console.log("Beneficiary Protection Final:", ben_benfit);
		} else {
			for (j = 0; j < diff_in_years; j++) {
				if (pmntMode == "Weekly") {
					var pva = payments + (payments * (1 - (1 + rpr) ** -52)) / rpr;
					var pvacm = payments + (payments * (1 - (1 + rprc) ** -52)) / rprc;
				}
				if (pmntMode == "Monthly") {
					var pva = payments + (payments * (1 - (1 + rpr) ** -11)) / rpr;
					var pvacm = payments + (payments * (1 - (1 + rprc) ** -11)) / rprc;
				}
				if (pmntMode == "Quarterly") {
					var pva = payments + (payments * (1 - (1 + rpr) ** -3)) / rpr;
					var pvacm = payments + (payments * (1 - (1 + rprc) ** -3)) / rprc;
				}
				if (pmntMode == "Semiannually") {
					var pva = payments + (payments * (1 - (1 + rpr) ** -1)) / rpr;
					var pvacm = payments + (payments * (1 - (1 + rprc) ** -1)) / rprc;
				}
				pvaf.push(pva);
				pvac.push(pvacm);
				payments = payments + percent_step;
				percent_step = (percentStep / 100) * payments;
				//console.log("payments",j,payments);
			}
			pvaff.push(pvaf[0]);
			pvafc.push(pvac[0]);

			for (h = 1; h < pvaf.length; h++) {
				var pva = pvaf[h] / (1 + ann_interest_rate) ** h;
				var pvaco = pvac[h] / (1 + ann_interest_rate_c) ** h;
				//console.log(h);
				pvaff.push(pva);
				pvafc.push(pvaco);
			}
			//console.log(pvaff)
			//console.log(pvaff);
			var pssum = 0.0;
			var pssumc = 0.0;
			var p = 0;
			for (p = 0; p < pvaff.length; p++) {
				pssum = pssum + pvaff[p];
			}
			//console.log(pssum);
			for (p = 0; p < pvafc.length; p++) {
				pssumc = pssumc + pvafc[p];
			}
			//console.log(pssumc);
			console.log("GP Flooring with Percent Step: ", pssum);
			console.log("GP Ceiling with Percent Step: ", pssumc);

			//Beneficiary Protection
			var date2 = new Date();
			var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

			var x = Math.round(Math.abs((pmntStartDate - date2) / oneDay));

			var kk = (x + 1) / 365;

			var benff = pssum / (1 + ann_interest_rate) ** kk;
			var benfc = pssumc / (1 + ann_interest_rate_c) ** kk;

			console.log(ann_interest_rate);
			console.log(ann_interest_rate_c);
			console.log(kk);

			console.log(
				"Beneficiary Protection GP Flooring with Percent Step: ",
				benff
			);
			console.log(
				"Beneficiary Protection GP Ceiling with Percent Step: ",
				benfc
			);

			console.log(pmntEndDate);
			var min_offer = Math.min(benff, benfc);
			var cutoff = "Yes";
			var ben_benfit = 0.0;
			if (min_offer < 200000) {
				cutoff = "No";
			}
			if (cutoff == "Yes") {
				if (age >= 18 && age <= 28) {
					var y = 0.5;
					ben_benfit = Math.round(formulajs.FLOORPRECISE(y * min_offer, 10000));
				}
				if (age >= 29 && age <= 35) {
					var y = 0.45;
					ben_benfit = Math.round(formulajs.FLOORPRECISE(y * min_offer, 10000));
				}
				if (age >= 36 && age <= 50) {
					var y = 0.4;
					ben_benfit = Math.round(formulajs.FLOORPRECISE(y * min_offer, 10000));
				}
				if (age >= 51 && age <= 65) {
					var y = 0.35;
					ben_benfit = Math.round(formulajs.FLOORPRECISE(y * min_offer, 10000));
				}
			}

			if (cutoff == "No") {
				if (age >= 18 && age <= 28) {
					ben_benfit = 150000;
				}
				if (age >= 29 && age <= 35) {
					ben_benfit = 125000;
				}
				if (age >= 36 && age <= 50) {
					ben_benfit = 100000;
				}
				if (age >= 51 && age <= 65) {
					ben_benfit = 100000;
				}
			}
			console.log(min_offer);
			console.log(cuttoff);
			console.log("Beneficiary Protection Final:", ben_benfit);
		}
	} catch (err) {
		let error = {
			status: 500,
			error: "An error occurred. Please try again later.",
		};
		return res.send(error);
	}
}

module.exports = router;
