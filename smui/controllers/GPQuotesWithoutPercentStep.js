const Moment = require("moment");
//function for calculation of GP without Percent Step
module.exports = function GP_Min_Max_Quotes(
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

		return {
			GPMaxQuoteWithoutAI: pva,
			GPMinQuoteWithoutAI: pvc,
		};
	} catch (err) {
		return { error: "calulation error" };
	}
};
