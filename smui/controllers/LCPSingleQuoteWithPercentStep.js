const Moment = require("moment");
//function for calculation of LCP with Percent Step
module.exports = async function LCP_Single_Quote_AI(
	pmntStartDate,
	pmntEndDate,
	pmntMode,
	pmntAmount,
	base_rate,
	percentStep
) {
	//Calculation Starts Here
	var sum = base_rate; //Minimum Discount Rate
	//var sumc = base_rate_max; //Maximum Discount Rate
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
	//var rc = sumc / m;
	var pvaf = [];
	var pvac = [];
	var pvab = [];
	var diff_in_years = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
	//Calculate the percent.
	var percent_step = (percentStep / 100) * payments;
	var ann_interest_rate = (1 + sum / m) ** m - 1;
	//var ann_interest_rate_c = (1 + sumc / m) ** m - 1;
	var ann_interest_rate_b = (1 + 0.054 / m) ** m - 1;

	var rpr = ann_interest_rate / m;
	//var rprc = ann_interest_rate_c / m;
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
		//pvac.push(payments);
		pvab.push(payments);
		for (j = 1; j < diff_in_years; j++) {
			percent_step = (percentStep / 100) * payments;
			payments = payments + percent_step;
			pvaf.push(payments);
			//pvac.push(payments);
			pvab.push(payments);
		}
		pvaff.push(pvaf[0]);
		//pvafc.push(pvac[0]);
		pvabb.push(pvab[0]);

		for (h = 1; h < pvaf.length; h++) {
			var pva = pvaf[h] / (1 + sum) ** h;
			//var pvacc = pvac[h] / (1 + sumc) ** h;
			var pvabe = pvab[h] / (1 + 0.054) ** h;

			//console.log(h);
			pvaff.push(pva);
			//pvafc.push(pvacc);
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
		/* for (p = 0; p < pvafc.length; p++) {
			pssumc = pssumc + pvafc[p];
		} */

		for (p = 0; p < pvabb.length; p++) {
			bensum = bensum + pvabb[p];
		}
		console.log("Single Quote with Percent Step: ", pssum);
		//console.log("Max Quote with Percent Step: ", pssumc);
		console.log("Beneficiary Protection with Percent Step: ", bensum);
		return {
			LCPSingleQuoteWithAI: pssum,
			LCPBEN: bensum,
		};

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
				//var pvacm = payments + (payments * (1 - (1 + rprc) ** -52)) / rprc;
				var pvabm = payments + (payments * (1 - (1 + rprb) ** -52)) / rprb;
			}
			if (pmntMode == "Monthly") {
				var pva = payments + (payments * (1 - (1 + rpr) ** -11)) / rpr;
				//var pvacm = payments + (payments * (1 - (1 + rprc) ** -11)) / rprc;
				var pvabm = payments + (payments * (1 - (1 + rprb) ** -11)) / rprb;
			}
			if (pmntMode == "Quarterly") {
				var pva = payments + (payments * (1 - (1 + rpr) ** -3)) / rpr;
				//var pvacm = payments + (payments * (1 - (1 + rprc) ** -3)) / rprc;
				var pvabm = payments + (payments * (1 - (1 + rprb) ** -3)) / rprb;
			}
			if (pmntMode == "Semiannually") {
				var pva = payments + (payments * (1 - (1 + rpr) ** -1)) / rpr;
				//var pvacm = payments + (payments * (1 - (1 + rprc) ** -1)) / rprc;
				var pvabm = payments + (payments * (1 - (1 + rprb) ** -1)) / rprb;
			}
			pvaf.push(pva);
			//pvac.push(pvacm);
			pvab.push(pvabm);
			//pmntStartDate.setMonth(pmntStartDate.getMonth()+12);
			payments = payments + percent_step;
			percent_step = (percentStep / 100) * payments;
			//console.log("payments",j,payments);
		}
		pvaff.push(pvaf[0]);
		//pvafc.push(pvac[0]);
		pvabb.push(pvab[0]);

		for (h = 1; h < pvaf.length; h++) {
			var pva = pvaf[h] / (1 + ann_interest_rate) ** h;
			//var pvaco = pvac[h] / (1 + ann_interest_rate_c) ** h;
			var benci = pvab[h] / (1 + ann_interest_rate_b) ** h;
			//console.log(h);
			pvaff.push(pva);
			// pvafc.push(pvaco);
			pvabb.push(benci);
		}
		//console.log(pvaff)
		//console.log(pvaff);

		var pssum = 0.0;
		//var pssumc = 0.0;
		var bensum = 0.0;
		var p = 0;

		for (p = 0; p < pvaff.length; p++) {
			pssum = pssum + pvaff[p];
		}
		//console.log(pssum);
		/* for (p = 0; p < pvafc.length; p++) {
			pssumc = pssumc + pvafc[p];
		} */
		for (p = 0; p < pvabb.length; p++) {
			bensum = bensum + pvabb[p];
		}
		//console.log(pssumc);

		console.log("Single Quote with Percent Step: ", pssum);
		//console.log("Min Quote with Percent Step: ", pssumc);
		console.log("Beneficiary Protection with Percent Step: ", bensum);
		return {
			LCPSingleQuoteWithAI: pssum,
			LCPBEN: bensum,
		};
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
};
