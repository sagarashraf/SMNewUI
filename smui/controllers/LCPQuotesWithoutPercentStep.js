//function for calculation of LCP with hedge and unhedge date
const Moment = require("moment");
const DateDiff = require("../helperFuntions/DateDiff");
module.exports = async function LCP_Min_Max_Quotes(
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
		console.log("pva pvc before date", pva, pvc);
		var ann_interest_rate = (1 + sum / m) ** m - 1;
		var ann_interest_rate_c = (1 + sumc / m) ** m - 1;
		var ann_interest_rate_b = (1 + 0.054 / m) ** m - 1;

		var pvad = await DateDiff(pmntEndDate, pmntStartDate);
		pva = pva / (1 + ann_interest_rate) ** (pvad / 365);
		pvc = pvc / (1 + ann_interest_rate_c) ** (pvad / 365);
		benbb = benbb / (1 + ann_interest_rate_b) ** (pvad / 365);

		console.log("Min Quotation", pva);
		console.log("Max Quotation", pvc);
		console.log("pvad pvad: ", pvad);
		console.log("pmntEndDate, pmntStartDate =>>>", pmntEndDate, pmntStartDate);
		return {
			LCPMinQuotesWithoutAI: pvc,
			LCPMaxQuotesWithoutAI: pva,
			LCPBEN: benbb,
		};
	} catch (err) {
		console.log("Zeeshan error", err);
		return {
			error: "Calculation Error",
		};
	}
};
