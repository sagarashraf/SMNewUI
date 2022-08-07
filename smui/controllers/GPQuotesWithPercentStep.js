const Moment = require("moment");
module.exports = function GP_Min_Max_Quotes_AI(
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
			return {
				GPMaxQuoteWithAI: pssum,
				GPMinQuoteWithAI: pssumc,
			};
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
			return {
				GPMaxQuoteWithAI: pssum,
				GPMinQuoteWithAI: pssumc,
			};

			// //Beneficiary Protection
			// var date2 = new Date();
			// var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

			// var x = Math.round(Math.abs((pmntStartDate - date2) / oneDay));

			// var kk = (x + 1) / 365;

			// var benff = pssum / (1 + ann_interest_rate) ** kk;
			// var benfc = pssumc / (1 + ann_interest_rate_c) ** kk;

			// console.log(ann_interest_rate);
			// console.log(ann_interest_rate_c);
			// console.log(kk);

			// console.log(
			// 	"Beneficiary Protection GP Flooring with Percent Step: ",
			// 	benff
			// );
			// console.log(
			// 	"Beneficiary Protection GP Ceiling with Percent Step: ",
			// 	benfc
			// );

			// console.log(pmntEndDate);
			// var min_offer = Math.min(benff, benfc);
			// var cutoff = "Yes";
			// var ben_benfit = 0.0;
			// if (min_offer < 200000) {
			// 	cutoff = "No";
			// }
			// if (cutoff == "Yes") {
			// 	if (age >= 18 && age <= 28) {
			// 		var y = 0.5;
			// 		ben_benfit = Math.round(formulajs.FLOORPRECISE(y * min_offer, 10000));
			// 	}
			// 	if (age >= 29 && age <= 35) {
			// 		var y = 0.45;
			// 		ben_benfit = Math.round(formulajs.FLOORPRECISE(y * min_offer, 10000));
			// 	}
			// 	if (age >= 36 && age <= 50) {
			// 		var y = 0.4;
			// 		ben_benfit = Math.round(formulajs.FLOORPRECISE(y * min_offer, 10000));
			// 	}
			// 	if (age >= 51 && age <= 65) {
			// 		var y = 0.35;
			// 		ben_benfit = Math.round(formulajs.FLOORPRECISE(y * min_offer, 10000));
			// 	}
			// }

			// if (cutoff == "No") {
			// 	if (age >= 18 && age <= 28) {
			// 		ben_benfit = 150000;
			// 	}
			// 	if (age >= 29 && age <= 35) {
			// 		ben_benfit = 125000;
			// 	}
			// 	if (age >= 36 && age <= 50) {
			// 		ben_benfit = 100000;
			// 	}
			// 	if (age >= 51 && age <= 65) {
			// 		ben_benfit = 100000;
			// 	}
			// }
			// console.log(min_offer);
			// console.log(cuttoff);
			// console.log("Beneficiary Protection Final:", ben_benfit);
		}
	} catch (err) {
		return { error: "Calculation Error" };
	}
};
