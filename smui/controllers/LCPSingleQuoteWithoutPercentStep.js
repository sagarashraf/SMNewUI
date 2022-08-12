//function for calculation of LCP with hedge and unhedge date
const Moment = require("moment");
module.exports = function LCP_Single_Quote(
	pmntStartDate,
	pmntEndDate,
	pmntMode,
	pmntAmount,
	base_rate
) {
	try {
		var sum = base_rate;
		//var sumc = base_rate_max;
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
		var rb = 0.055 / m;

		var pva = payments + (payments * (1 - (1 + r) ** -(freq - 1))) / r;
		//var pvc = payments + (payments * (1 - (1 + rc) ** -(freq - 1))) / rc;
		var benbb = payments + (payments * (1 - (1 + rb) ** -(freq - 1))) / rb;
		console.log("Base Rate Quotation", pva);
		//console.log("Max Quotation", pvc);
		console.log("Beneficiary Protection: ", benbb);
		return {
			LCPSingeQuoteWithoutAI: pva,
			LCPBEN: benbb,
		};
	} catch (err) {
		return {
			error: "Calculation Error",
		};
	}
};
