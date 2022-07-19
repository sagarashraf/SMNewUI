const express = require("express");
const router = express.Router();
const Moment = require("moment");
const formulajs = require("@formulajs/formulajs");


router.post("/Calculate", async (req, res) => {
	//Declaration of variables.
	const data = req.body;
	console.log("dta here", data);
	var productType = "";
	var weight = "";
	var annulaCheck = "";
	var phys_exer = "";
	var blp = "";
	var chol = "";
	var dri = "";
	var smoker = "";
	var heal = "";
	var legal = "";
	var dui = "";
	var gen = "";
	var mis = "";
	var license = "";
	var sendPayload;
	var pmntStartDate = new Date(data.PaymentStartDate);
	var pmntEndDate = new Date(data.PaymentEndDate);
	var addon = 0.0;
	var values_ls = [];
	var cutoff = 90;
	var curr_date = new Date();
	var old_date = new Date("01/01/1900");
	var cuttoff = 90;
	var html_output = "";

	//Checking for correct dates before continuing with execution.

	try {
		var check_diff_y = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
		if (check_diff_y <= 0) {
			let error = {
				status: 500,
				error: "Incorrect dates entered. Please enter again",
			};
			return res.send(error);
		}
	} catch (err) {
		let error = {
			status: 500,
			error: "An error occurred. Please try again later.",
		};
		return res.send(error);
	}

	//Setting all the variables here

	//Setting misdeamnor
	if (data.Misdemanor == "") {
		mis = "Prefer Not to Answer";
	} else {
		mis = data.Misdemanor;
	}
	if (data.LicenseSuspended == "") {
		license = "Prefer Not to Answer";
	} else {
		license = data.LicenseSuspended;
	}

	//Setting Gender
	if (data.Gender == "Male") {
		gen = "M";
	}
	if (data.Gender == "Female") {
		gen = "F";
	}
	if (data.Gender == "Prefer Not to Answer") {
		gen = "M";
	}

	//Setting Product Type
	if (data.ProductType == "1") {
		productType = "LCP";
	}
	if (data.ProductType == "2") {
		productType = "GP";
	}
	if (data.ProductType == "0") {
		productType = "LCP";
	}

	//Setting Weight
	console.log("gen", gen);

	try {
		if (data.MenuallWeight) {
			bmi =
				parseFloat(data.MenuallWeight) /
				(parseFloat(data.Height) * parseFloat(data.Height));
			console.log("bmi", bmi);
			if (bmi <= 17.5 && gen == "M") {
				weight = "Underweight";
			} else if (bmi > 17.5 && bmi <= 21.0 && gen == "M") {
				weight = "Ideal Weight";
			} else if (bmi > 21.0 && bmi <= 26.0 && gen == "M") {
				weight = "Average Weight";
			} else if (bmi > 26.0 && bmi <= 31.0 && gen == "M") {
				weight = "Overweight";
			} else if (bmi > 31.0 && gen == "M") {
				weight = "Obese";
			}

			if (bmi <= 16.6 && gen == "Female") {
				weight = "Underweight";
			} else if (bmi > 16.6 && bmi <= 19.9 && gen == "F") {
				weight = "Ideal Weight";
			} else if (bmi > 19.9 && bmi <= 24.7 && gen == "F") {
				weight = "Average Weight";
			} else if (bmi > 24.7 && bmi <= 29.4 && gen == "F") {
				weight = "Overweight";
			} else if (bmi > 29.4 && gen == "F") {
				weight = "Obese";
			}
			console.log(weight);
		} else {
			weight = data.Weight;
			console.log(weight);
		}
		console.log("Weight", weight);
	} catch (err) {
		let error = {
			status: 500,
			error: "An error occurred. Please try again later.",
		};
		return res.send(error);
	}

	// if (data.AnnualCheckup == "") {
	// 	annulaCheck = "No";
	// } else {
	// 	annulaCheck = data.AnnualCheckup;
	// }
	// if (data.PhysicalExercise == "") {
	// 	phys_exer = "Prefer Not to Answer";
	// } else {
	// 	phys_exer = data.PhysicalExercise;
	// }
	if (data.BloodPressure == "") {
		blp = "Prefer Not to Answer";
	} else {
		blp = data.BloodPressure;
	}
	// if (data.Cholestrol == "") {
	// 	chol = "Prefer Not to Answer";
	// } else {
	// 	chol = data.Cholestrol;
	// }
	// if (data.DrivingInfractions == "") {
	// 	dri = "Prefer Not to Answer";
	// } else {
	// 	dri = data.DrivingInfractions;
	// }
	if (data.Smoker == "") {
		smoker = "No";
	} else {
		smoker = data.Smoker;
		//console.log(smoker)
	}
	if (data.Health == "") {
		heal = "Normal";
	} else {
		heal = data.Health;
	}
	// if (data.Legal == "") {
	// 	legal = "Prefer Not to Answer";
	// } else {
	// 	legal = data.Legal;
	// }
	// if (data.Dui_Dwi == "") {
	// 	dui = "Prefer Not to Answer";
	// } else {
	// 	dui = data.Dui_Dwi;
	// }

	console.log("age", data.Age);

	// Calculations Begins

	//Calculation of LCP with PercentStep

	if (data.PercentStep > 0 && productType == "LCP") {
		// Calculation of Life Span is here

		try {
			if (gen == "M") {
				var ideal_age_c = conn.db.collection("avg_life_span_male");
				const query_ideal = { age: data.Age };
				var cursor_ideal = await ideal_age_c.findOne(query_ideal);
				//ideal_age = cursor_ideal.avg_life_span;
				//values_ls.push(ideal_age);
				//ideal_age = convm.getMonthsFromYear(cursor_ideal.avg_life_span);
				ideal_age = cursor_ideal.avg_life_span * 12;
				//console.log(ideal_age);
				//console.log(cursor_ideal.avg_life_span)
				data.LCP_AVG_LIFE = cursor_ideal.avg_life_span * 12;
				sendPayload = { avgLifeSpan: cursor_ideal.avg_life_span * 12 };
				console.log("Average Life Span : ", cursor_ideal.avg_life_span);
			}
			if (gen == "F") {
				var ideal_age_c = conn.db.collection("avg_life_span_female");
				const query_ideal = { age: data.Age };
				var cursor_ideal = await ideal_age_c.findOne(query_ideal);
				//ideal_age = cursor_ideal.avg_life_span;
				//values_ls.push(ideal_age);
				//ideal_age = convm.getMonthsFromYear(cursor_ideal.avg_life_span);
				ideal_age = cursor_ideal.avg_life_span * 12;
				//console.log(ideal_age);
				data.LCP_AVG_LIFE = cursor_ideal.avg_life_span * 12;
				sendPayload = { avgLifeSpan: cursor_ideal.avg_life_span * 12 };
				console.log("Average Life Span : ", cursor_ideal.avg_life_span);
			}

			var is_c = conn.db.collection("insurance_term");
			const query_is = { age: data.Age, gender: gen };
			var cursor_is = await is_c.findOne(query_is);
			var is = cursor_is.insurance_term;

			var no_of_days = 365 * is;
			const diffTime = Math.abs(curr_date - old_date);
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
			var total = diffDays + cuttoff + no_of_days;
			pmntEndDate = new Date(
				old_date.getTime() + parseInt(total) * 24 * 60 * 60 * 1000
			);
			//smoke
			var smoke_ls = conn.db.collection("smoke_ls");
			const query_smoke_ls = { attributes: smoker, gender: gen };
			var cursor_smoke = await smoke_ls.findOne(query_smoke_ls);
			values_ls.push(cursor_smoke.impact);

			//weight
			var weight_lsc = conn.db.collection("weight_ls");
			const query_weight_ls = { attributes: weight, gender: gen };
			var cursor_weight_ls = await weight_lsc.findOne(query_weight_ls);
			values_ls.push(cursor_weight_ls.impact);

			//health
			var health_lsc = conn.db.collection("health_ls");
			const query_health_ls = { attributes: heal, gender: gen };
			var cursor_health_ls = await health_lsc.findOne(query_health_ls);
			values_ls.push(cursor_health_ls.impact);

			// //legal
			// var legal_lsc = conn.db.collection("legal_ls");
			// const query_legal_ls = { attributes: legal, gender: gen };
			// var cursor_legal_ls = await legal_lsc.findOne(query_legal_ls);
			// values_ls.push(cursor_legal_ls.impact);

			// //dui
			// var dui_lsc = conn.db.collection("dui_dwi_ls");
			// const query_dui_ls = { attributes: dui, gender: gen };
			// var cursor_dui_ls = await dui_lsc.findOne(query_dui_ls);
			// values_ls.push(cursor_dui_ls.impact);

			// //crime
			// var crime_ls = conn.db.collection("crime_ls");
			// const query_crime_ls = { attributes: mis, gender: gen };
			// var cursor_crime_ls = await crime_ls.findOne(query_crime_ls);
			// values_ls.push(cursor_crime_ls.impact);

			// //annual
			// var annual_ls = conn.db.collection("annual_checkup_ls");
			// const query_ann_ls = { attributes: annulaCheck, gender: gen };
			// var cursor_ann_ls = await annual_ls.findOne(query_ann_ls);
			// values_ls.push(cursor_ann_ls.impact);

			// //exercise
			// var ex_ls = conn.db.collection("physical_exercise_ls");
			// const query_ex_ls = { attributes: phys_exer, gender: gen };
			// var cursor_ex_ls = await ex_ls.findOne(query_ex_ls);
			// values_ls.push(cursor_ex_ls.impact);

			//bp
			var bp_ls = conn.db.collection("bp_ls");
			const query_bp_ls = { attributes: blp, gender: gen };
			var cursor_bp_ls = await bp_ls.findOne(query_bp_ls);
			values_ls.push(cursor_bp_ls.impact);

			// //choles
			// var choles_ls = conn.db.collection("cholestrol_ls");
			// const query_choles_ls = { attributes: chol, gender: gen };
			// var cursor_choles_ls = await choles_ls.findOne(query_choles_ls);
			// values_ls.push(cursor_choles_ls.impact);

			// //di
			// var driving_ls = conn.db.collection("driving_ls");
			// const query_dri_ls = { attributes: dri, gender: gen };
			// var cursor_dri_ls = await driving_ls.findOne(query_dri_ls);
			// values_ls.push(cursor_dri_ls.impact);

			//ls
			var ls_ls = conn.db.collection("license_suspended_ls");
			const query_ls_ls = { attributes: license, gender: gen };
			var cursor_ls_ls = await ls_ls.findOne(query_ls_ls);
			values_ls.push(cursor_ls_ls.impact);

			var x = 0;
			var sum_ls = 0.0;

			for (x = 0; x < values_ls.length; x++) {
				sum_ls = sum_ls + values_ls[x];
			}
			//console.log(sum_ls);
			var fr = cursor_ideal.avg_life_span * (1 + sum_ls);
			var life_exp = parseInt(fr) * 12;
			//console.log(fr);
			data.LCP_YOUR_LIFE = life_exp;
			sendPayload.YouravgLifeSpan = life_exp;
			console.log("Your Life Expectancy : ", life_exp);
		} catch (err) {
			error = {
				status: 500,
				error: "An error occurred. Please try again later.",
			};
			return res.send(error);
		}

		//Getting Data for Calculation

		try {
			var aged = data.Age;
			//Get Rating
			var rate = conn.db.collection("credit_rating_master");
			const query_rate = { "Company Name": data.InsuranceCompany };
			var cursor_rate = await rate.findOne(query_rate);

			var rating = cursor_rate.Rating;

			//Get Age
			var age = conn.db.collection("age");
			const query_age = { Gender: gen, Age: aged };
			var cursor_age = await age.findOne(query_age);

			// //Get Annual Checkup
			// var ann_check = conn.db.collection("annual_checkup");
			// const query_ann_check = { Attributes: annulaCheck };
			// var cursor_ann_check = await ann_check.findOne(query_ann_check);

			//Get Blood Pressure
			var bp = conn.db.collection("blood_pressure");
			const query_bp = { Attributes: blp };
			var cursor_bp = await bp.findOne(query_bp);

			// //Get Cholestrol
			// var chlsrl = conn.db.collection("cholestrol");
			// const query_chlsrl = { Attributes: chol };
			// var cursor_chlsrl = await chlsrl.findOne(query_chlsrl);

			//Get Credit Rating
			var credit_r = conn.db.collection("credit_rating");
			const query_credit_r = { Attributes: rating };
			var cursor_credit_r = await credit_r.findOne(query_credit_r);

			// //Get drive infractions impact
			// var dric = conn.db.collection("driver_infractions_impact");
			// const query_dri = { "Attributes Name": dri };
			// var cursor_dri = await dric.findOne(query_dri);

			// //Get dui/dwi
			// var duic = conn.db.collection("dwi");
			// const query_dui = { "Attributes Name": dui };
			// var cursor_dui = await duic.findOne(query_dui);

			//Get health
			var health = conn.db.collection("health");
			const query_health = { "Attributes Name": heal };
			var cursor_health = await health.findOne(query_health);

			// //Get legal
			// var legaly = conn.db.collection("legal");
			// const query_legal = { "Attributes Name": legal };
			// var cursor_legal = await legaly.findOne(query_legal);

			//Get license suspended
			var lics = conn.db.collection("license_suspended");
			const query_lics = { "Attributes Name": license };
			var cursor_lics = await lics.findOne(query_lics);

			// //Get misdemanor
			// var misd = conn.db.collection("misdemeanor_or_felony");
			// const query_misd = { "Attributes Name": mis };
			// var cursor_misd = await misd.findOne(query_misd);

			// //Get physical_exercise
			// var phy = conn.db.collection("physical_exercise");
			// const query_phy = { "Attributes Name": phys_exer };
			// var cursor_phy = await phy.findOne(query_phy);

			//Get Smoker
			var smokers = conn.db.collection("smoker");
			const query_smoker = { "Attributes Name": smoker };
			var cursor_smoker = await smokers.findOne(query_smoker);

			//Get Weight
			var weightw = conn.db.collection("weight");
			const query_weight = { "Attributes Name": weight };
			var cursor_weight = await weightw.findOne(query_weight);
		} catch (err) {
			error = {
				status: 500,
				error: "An error occurred. Please try again later.",
			};
			return res.send(error);
		}

		//Calculation Starts Here

		try {
			var dis_ratef = [];
			var dis_ratec = [];
			var valuesc = [];
			var values = [];

			var agee = cursor_age.Flooring;
			var ageec = cursor_age.Ceiling;
			dis_ratef.push(agee);
			dis_ratec.push(ageec);

			var crv = cursor_credit_r.Flooring;
			var crcv = cursor_credit_r.Ceiling;

			// var ann_checkv = cursor_ann_check.Impact;
			var bpv = cursor_bp.Impact;
			// var chlsrlv = cursor_chlsrl.Impact;

			// var drii = cursor_dri.Impact;
			// var dui_dwiv = cursor_dui.Impact;

			var healthyv = cursor_health.Impact;
			// var legalyv = cursor_legal.Impact;

			var licsu = cursor_lics.Impact;
			// var misde = cursor_misd.Impact;

			// var physx = cursor_phy.Impact;
			var smokerv = cursor_smoker.Impact;
			var weightv = cursor_weight.Impact;
			values.push(crv, smokerv, healthyv, licsu, bpv, weightv);
			valuesc.push(crcv, smokerv, healthyv, licsu, bpv, weightv);

			var i = 0;
			var n = 0;
			//console.log("===>", values, valuesc);
			for (i = 0; i < values.length; i++) {
				n = values[i] * dis_ratef[0];

				//x=Math.round((n + Number.EPSILON)*100)/100;
				dis_ratef.push(n);
				//console.log(n)
			}

			for (i = 0; i < valuesc.length; i++) {
				n = valuesc[i] * dis_ratec[0];

				//x=Math.round((n + Number.EPSILON)*100)/100;
				dis_ratec.push(n);
				//console.log(n)
			}

			var sum = 0.0;
			var sumc = 0.0;
			var m = 0.0;

			for (i = 0; i < dis_ratef.length; i++) {
				sum = sum + dis_ratef[i];
				// console.log(sum);
			}

			for (i = 0; i < dis_ratec.length; i++) {
				sumc = sumc + dis_ratec[i];
				// console.log(sum);
			}

			//Calculation of ADDONs
			var dateaddon = new Date();
			var a_diff_in_years =
				pmntStartDate.getFullYear() - dateaddon.getFullYear();

			if (a_diff_in_years >= 11 && a_diff_in_years <= 15) {
				sum = sum + 0.005;
				sumc = sumc + 0.005;
			}
			if (a_diff_in_years >= 16 && a_diff_in_years <= 20) {
				sum = sum + 0.007;
				sumc = sumc + 0.007;
			}
			if (a_diff_in_years >= 21 && a_diff_in_years <= 25) {
				sum = sum + 0.0085;
				sumc = sumc + 0.0085;
			}
			if (a_diff_in_years >= 21 && a_diff_in_years <= 25) {
				sum = sum + 0.0085;
				sumc = sumc + 0.0085;
			}
			if (a_diff_in_years >= 26 && a_diff_in_years <= 30) {
				sum = sum + 0.01;
				sumc = sumc + 0.01;
			}
			if (a_diff_in_years >= 31 && a_diff_in_years <= 35) {
				sum = sum + 0.0115;
				sumc = sumc + 0.0115;
			}
			if (a_diff_in_years >= 36 && a_diff_in_years <= 45) {
				sum = sum + 0.015;
				sumc = sumc + 0.015;
			}

			var payments = data.PaymentAmount;
			var freq = 0;
			if (data.PaymentMode == "Weekly") {
				var diff = (pmntEndDate.getTime() - pmntStartDate.getTime()) / 1000;
				diff /= 60 * 60 * 24 * 7;
				freq = Math.abs(Math.round(diff));
				m = 52.0;
			}
			if (data.PaymentMode == "Monthly") {
				freq =
					pmntEndDate.getMonth() -
					pmntStartDate.getMonth() +
					12 * (pmntEndDate.getFullYear() - pmntStartDate.getFullYear());
				m = 12.0;
			}
			if (data.PaymentMode == "Quarterly") {
				var beginDate = Moment(data.PaymentStartDate);
				var endDate = Moment(pmntEndDate);
				freq = Math.floor(endDate.diff(beginDate, "months") / 3);
				m = 4.0;
			}
			if (data.PaymentMode == "Semiannually") {
				x = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
				freq = x * 2;
				m = 2.0;
			}
			if (data.PaymentMode == "Annually") {
				freq = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
				m = 1.0;
			}

			// Calculation of end date

			var ins_terms_c = conn.db.collection("insurance_term");
			const query_ins = { age: data.Age, gender: gen };
			var cursor_ins = await ins_terms_c.findOne(query_ins);
			var ins_terms = cursor_ins.insurance_term;
			var no_of_days = ins_terms * 365;
			var calc_end = no_of_days + ins_terms + pmntStartDate;
			var r = sum / m;
			var rc = sumc / m;
			var pvaf = [];
			var pvac = [];
			var pvab = [];
			var diff_in_years =
				pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
			//Calculate the percent.
			var percent_step = (data.PercentStep / 100) * payments;
			//console.log("percent step",percent_step);
			//console.log("difference in years",diff_in_years);
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

			if (data.PaymentMode == "Annually") {
				pvaf.push(payments);
				pvac.push(payments);
				pvab.push(payments);
				for (j = 1; j < diff_in_years; j++) {
					percent_step = (data.PercentStep / 100) * payments;
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
				console.log("LCP Flooring with Percent Step: ", pssum);
				console.log("LCP Ceiling with Percent Step: ", pssumc);
				console.log("Beneficiary Protection with Percent Step: ", bensum);

				//Beneficiary Protection
				var date2 = new Date();
				const diffTime = Math.abs(pmntStartDate - date2);
				const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
				var kk = diffDays / 365;

				var benff = pssum / (1 + ann_interest_rate) ** kk;
				var benfc = pssumc / (1 + ann_interest_rate_c) ** kk;

				data.PVA_LCP_Flooring = pssum;
				data.PVA_LCP_Ceiling = pssumc;
				data.LCP_BEN = Math.ceil(bensum/5000)*5000//Math.round(formulajs.FLOORPRECISE(bensum, 5000))+5000;
				console.log(data.LCP_BEN)
				sendPayload.pva = pssum;
				sendPayload.pvc = pssumc;
				sendPayload.ben_benfit = Math.ceil(bensum/5000)*5000//Math.round(formulajs.FLOORPRECISE(bensum, 5000))+5000;
				sendPayload.status = 200;
				sendPayload.message = "Success";
				html_output = "<p><strong>Min Offer:</strong> "+pssum+"</p><p><strong>Max Offer</strong>: "+pssumc+"</p><p><strong>Family Protection</strong>: "+Math.ceil(bensum/5000)*5000+"</p>"
				sendPayload.html_ = html_output
				console.log(
					"Beneficiary Protection LCP Flooring with Percent Step: ",
					benff
				);
				console.log(
					"Beneficiary Protection Ceiling with Percent Step: ",
					benfc
				);
			} else {
				for (j = 0; j < diff_in_years; j++) {
					if (data.PaymentMode == "Weekly") {
						var pva = payments + (payments * (1 - (1 + rpr) ** -52)) / rpr;
						var pvacm = payments + (payments * (1 - (1 + rprc) ** -52)) / rprc;
						var pvabm = payments + (payments * (1 - (1 + rprb) ** -52)) / rprb;
					}
					if (data.PaymentMode == "Monthly") {
						var pva = payments + (payments * (1 - (1 + rpr) ** -11)) / rpr;
						var pvacm = payments + (payments * (1 - (1 + rprc) ** -11)) / rprc;
						var pvabm = payments + (payments * (1 - (1 + rprb) ** -11)) / rprb;
					}
					if (data.PaymentMode == "Quarterly") {
						var pva = payments + (payments * (1 - (1 + rpr) ** -3)) / rpr;
						var pvacm = payments + (payments * (1 - (1 + rprc) ** -3)) / rprc;
						var pvabm = payments + (payments * (1 - (1 + rprb) ** -3)) / rprb;
					}
					if (data.PaymentMode == "Semiannually") {
						var pva = payments + (payments * (1 - (1 + rpr) ** -1)) / rpr;
						var pvacm = payments + (payments * (1 - (1 + rprc) ** -1)) / rprc;
						var pvabm = payments + (payments * (1 - (1 + rprb) ** -1)) / rprb;
					}
					pvaf.push(pva);
					pvac.push(pvacm);
					pvab.push(pvabm);
					//pmntStartDate.setMonth(pmntStartDate.getMonth()+12);
					payments = payments + percent_step;
					percent_step = (data.PercentStep / 100) * payments;
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

				console.log("LCP Flooring with Percent Step: ", pssum);
				console.log("LCP Ceiling with Percent Step: ", pssumc);
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

				console.log(
					"Beneficiary Protection LCP Flooring with Percent Step: ",
					benff
				);
				console.log(
					"Beneficiary Protection Ceiling with Percent Step: ",
					benfc
				);

				data.PVA_LCP_Flooring = pssum;
				data.PVA_LCP_Ceiling = pssumc;
				data.LCP_BEN = Math.ceil(bensum/5000)*5000//Math.round(formulajs.FLOORPRECISE(bensum, 5000))+5000;
				console.log(data.LCP_BEN)
				sendPayload.pva = pssum;
				sendPayload.pvc = pssumc;
				sendPayload.ben_benfit = Math.ceil(bensum/5000)*5000//Math.round(formulajs.FLOORPRECISE(bensum, 5000))+5000;
				sendPayload.status = 200;
				sendPayload.message = "Success";
				html_output = "<p><strong>Min Offer:</strong> "+pssum+"</p><p><strong>Max Offer</strong>: "+pssumc+"</p><p><strong>Family Protection</strong>: "+Math.ceil(bensum/5000)*5000+"</p>"
				sendPayload.html_ = html_output
				/* 	var min_offer = Math.min(benff,benfc);

  		if(data.Age >= 18 && data.Age <= 28){
  			var y = 0.5;
  		}
  		if(data.Age >= 29 && data.Age <= 35){
  			var y = 0.45;
  		}
  		if(data.Age >= 36 && data.Age <= 50){
  			var y = 0.40;
  		}
  		if(data.Age >= 51 && data.Age <= 65){
  			var y = 0.35;
  		}

  		var ben_benfit = y*min_offer;
  		console.log("Beneficiary Protection Final:", ben_benfit) */

				//Death Benefit
			}
		} catch (err) {
			error = {
				status: 500,
				error: "An error occurred. Please try again later.",
			};
			return res.send(error);
		}
	}

	//GP KI PERCENT STEP GAME
	if (data.PercentStep > 0 && productType == "GP") {
		try {
			//Get Rating
			var diff_in_years_gp =
				pmntEndDate.getFullYear() - pmntStartDate.getFullYear();

			if (diff_in_years_gp > 10 || diff_in_years_gp < 10) {
				pmntEndDate = new Date(
					pmntStartDate.getTime() + 3650 * 24 * 60 * 60 * 1000
				);
			}
			console.log(pmntStartDate);
			var rate = conn.db.collection("credit_rating_master");
			const query_rate = { "Company Name": data.InsuranceCompany };
			var cursor_rate = await rate.findOne(query_rate);

			var rating = cursor_rate.Rating;

			//Get Credit Rating
			var credit_r = conn.db.collection("credit_rating");
			const query_credit_r = { Attributes: rating };
			var cursor_credit_r = await credit_r.findOne(query_credit_r);
			var cr = cursor_credit_r.Flooring;

			var crc = cursor_credit_r.Ceiling;
			//console.log("cr", cr, "crc", crc);
			var m = 0.0;

			var payments = data.PaymentAmount;
			var freq = 0;
			if (data.PaymentMode == "Weekly") {
				var diff = (pmntEndDate.getTime() - pmntStartDate.getTime()) / 1000;
				diff /= 60 * 60 * 24 * 7;
				freq = Math.abs(Math.round(diff));
				m = 52.0;
			}
			if (data.PaymentMode == "Monthly") {
				freq =
					pmntEndDate.getMonth() -
					pmntStartDate.getMonth() +
					12 * (pmntEndDate.getFullYear() - pmntStartDate.getFullYear());
				m = 12.0;
			}
			if (data.PaymentMode == "Quarterly") {
				var beginDate = Moment(data.PaymentStartDate);
				var endDate = Moment(pmntEndDate);
				freq = Math.floor(endDate.diff(beginDate, "months") / 3);
				m = 4.0;
			}
			if (data.PaymentMode == "Semiannually") {
				x = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
				freq = x * 2;
				m = 2.0;
			}
			if (data.PaymentMode == "Annually") {
				freq = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
				m = 1.0;
			}

			// Calculation of end date

			var ins_terms_c = conn.db.collection("insurance_term");
			const query_ins = { age: data.Age, gender: gen };
			var cursor_ins = await ins_terms_c.findOne(query_ins);
			var ins_terms = cursor_ins.insurance_term;
			var no_of_days = ins_terms * 365;
			var calc_end = no_of_days + ins_terms + pmntStartDate;
			var r = cr / m;
			var rc = crc / m;
			var pvaf = [];
			var pvac = [];
			var diff_in_years =
				pmntEndDate.getFullYear() - pmntStartDate.getFullYear();

			//Calculate the percent.
			var percent_step = (data.PercentStep / 100) * payments;
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
			if (data.PaymentMode == "Annually") {
				pvaf.push(payments);
				pvac.push(payments);
				for (j = 1; j < diff_in_years; j++) {
					percent_step = (data.PercentStep / 100) * payments;
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
				console.log("GP Flooring with Percent Step: ", pssum);
				console.log("GP Ceiling with Percent Step: ", pssumc);

				//Beneficiary Protection
				var date2 = new Date();
				const diffTime = Math.abs(pmntStartDate - date2);
				const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
				var kk = diffDays / 365;
				var benff = pssum / (1 + ann_interest_rate) ** kk;
				var benfc = pssumc / (1 + ann_interest_rate_c) ** kk;

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
					if (data.Age >= 18 && data.Age <= 28) {
						var y = 0.5;
						ben_benfit = Math.round(
							formulajs.FLOORPRECISE(y * min_offer, 10000)
						);
					}
					if (data.Age >= 29 && data.Age <= 35) {
						var y = 0.45;
						ben_benfit = Math.round(
							formulajs.FLOORPRECISE(y * min_offer, 10000)
						);
					}
					if (data.Age >= 36 && data.Age <= 50) {
						var y = 0.4;
						ben_benfit = Math.round(
							formulajs.FLOORPRECISE(y * min_offer, 10000)
						);
					}
					if (data.Age >= 51 && data.Age <= 65) {
						var y = 0.35;
						ben_benfit = Math.round(
							formulajs.FLOORPRECISE(y * min_offer, 10000)
						);
					}
				}

				if (cutoff == "No") {
					if (data.Age >= 18 && data.Age <= 28) {
						ben_benfit = 150000;
					}
					if (data.Age >= 29 && data.Age <= 35) {
						ben_benfit = 125000;
					}
					if (data.Age >= 36 && data.Age <= 50) {
						ben_benfit = 100000;
					}
					if (data.Age >= 51 && data.Age <= 65) {
						ben_benfit = 100000;
					}
				}
				console.log("GP Flooring with Percent Step: ", pssum);
				console.log("GP Ceiling with Percent Step: ", pssumc);
				data.GP_BEN = ben_benfit;
				sendPayload = {
					pva: pssum,
					pvc: pssumc,
					ben_benfit: ben_benfit,
					status: 200,
					sendPayload: "Success",
				};
				console.log("Beneficiary Protection Final:", ben_benfit);
			} else {
				for (j = 0; j < diff_in_years; j++) {
					if (data.PaymentMode == "Weekly") {
						var pva = payments + (payments * (1 - (1 + rpr) ** -52)) / rpr;
						var pvacm = payments + (payments * (1 - (1 + rprc) ** -52)) / rprc;
					}
					if (data.PaymentMode == "Monthly") {
						var pva = payments + (payments * (1 - (1 + rpr) ** -11)) / rpr;
						var pvacm = payments + (payments * (1 - (1 + rprc) ** -11)) / rprc;
					}
					if (data.PaymentMode == "Quarterly") {
						var pva = payments + (payments * (1 - (1 + rpr) ** -3)) / rpr;
						var pvacm = payments + (payments * (1 - (1 + rprc) ** -3)) / rprc;
					}
					if (data.PaymentMode == "Semiannually") {
						var pva = payments + (payments * (1 - (1 + rpr) ** -1)) / rpr;
						var pvacm = payments + (payments * (1 - (1 + rprc) ** -1)) / rprc;
					}
					pvaf.push(pva);
					pvac.push(pvacm);
					payments = payments + percent_step;
					percent_step = (data.PercentStep / 100) * payments;
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
					if (data.Age >= 18 && data.Age <= 28) {
						var y = 0.5;
						ben_benfit = Math.round(
							formulajs.FLOORPRECISE(y * min_offer, 10000)
						);
					}
					if (data.Age >= 29 && data.Age <= 35) {
						var y = 0.45;
						ben_benfit = Math.round(
							formulajs.FLOORPRECISE(y * min_offer, 10000)
						);
					}
					if (data.Age >= 36 && data.Age <= 50) {
						var y = 0.4;
						ben_benfit = Math.round(
							formulajs.FLOORPRECISE(y * min_offer, 10000)
						);
					}
					if (data.Age >= 51 && data.Age <= 65) {
						var y = 0.35;
						ben_benfit = Math.round(
							formulajs.FLOORPRECISE(y * min_offer, 10000)
						);
					}
				}

				if (cutoff == "No") {
					if (data.Age >= 18 && data.Age <= 28) {
						ben_benfit = 150000;
					}
					if (data.Age >= 29 && data.Age <= 35) {
						ben_benfit = 125000;
					}
					if (data.Age >= 36 && data.Age <= 50) {
						ben_benfit = 100000;
					}
					if (data.Age >= 51 && data.Age <= 65) {
						ben_benfit = 100000;
					}
				}
				console.log(min_offer);
				console.log(cuttoff);
				data.PVA_LCP_Flooring = pssum;
				data.PVA_LCP_Ceiling = pssumc;
				data.GP_BEN = ben_benfit;
				console.log("Beneficiary Protection Final:", ben_benfit);
				sendPayload = {
					pva: pssum,
					pvc: pssumc,
					ben_benfit: ben_benfit,
					status: 200,
					sendPayload: "Success",
				};
			}
		} catch (err) {
			let error = {
				status: 500,
				error: "An error occurred. Please try again later.",
			};
			return res.send(error);
		}
	}
	// Calculation for BEGHAIR PERCENT STEP K  LCP is here
	if (data.PercentStep <= 0 && productType == "LCP") {
		try {
			// Calculation of Life Span is here
			if (gen == "M") {
				var ideal_age_c = conn.db.collection("avg_life_span_male");
				const query_ideal = { age: data.Age };
				var cursor_ideal = await ideal_age_c.findOne(query_ideal);
				//ideal_age = cursor_ideal.avg_life_span;
				//values_ls.push(ideal_age);
				//ideal_age = convm.getMonthsFromYear(cursor_ideal.avg_life_span);
				ideal_age = cursor_ideal.avg_life_span * 12;
				//console.log(ideal_age);
				//console.log(cursor_ideal.avg_life_span)
				console.log("Average Life Span : ", cursor_ideal.avg_life_span * 12);
				data.LCP_AVG_LIFE = cursor_ideal.avg_life_span * 12;
				sendPayload = { avgLifeSpan: cursor_ideal.avg_life_span * 12 };
			}
			if (gen == "F") {
				var ideal_age_c = conn.db.collection("avg_life_span_female");
				const query_ideal = { age: data.Age };
				var cursor_ideal = await ideal_age_c.findOne(query_ideal);
				//ideal_age = cursor_ideal.avg_life_span;
				//values_ls.push(ideal_age);
				//ideal_age = convm.getMonthsFromYear(cursor_ideal.avg_life_span);
				ideal_age = cursor_ideal.avg_life_span * 12;
				//console.log(ideal_age);
				console.log("Average Life Span : ", cursor_ideal.avg_life_span);
				data.LCP_AVG_LIFE = cursor_ideal.avg_life_span * 12;
				sendPayload = { avgLifeSpan: cursor_ideal.avg_life_span * 12 };
			}

			//Getting Insurance Terms Values and Setting End date

			var is_c = conn.db.collection("insurance_term");
			const query_is = { age: data.Age, gender: gen };
			var cursor_is = await is_c.findOne(query_is);
			var is = cursor_is.insurance_term;

			var no_of_days = 365 * is;
			const diffTime = Math.abs(curr_date - old_date);
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
			var total = diffDays + cuttoff + no_of_days;
			pmntEndDate = new Date(
				old_date.getTime() + parseInt(total) * 24 * 60 * 60 * 1000
			);

			//smoke
			var smoke_ls = conn.db.collection("smoke_ls");
			const query_smoke_ls = { attributes: smoker, gender: gen };
			var cursor_smoke = await smoke_ls.findOne(query_smoke_ls);
			values_ls.push(cursor_smoke.impact);

			//weight
			var weight_lsc = conn.db.collection("weight_ls");
			const query_weight_ls = { attributes: weight, gender: gen };
			var cursor_weight_ls = await weight_lsc.findOne(query_weight_ls);
			values_ls.push(cursor_weight_ls.impact);

			//health
			var health_lsc = conn.db.collection("health_ls");
			const query_health_ls = { attributes: heal, gender: gen };
			var cursor_health_ls = await health_lsc.findOne(query_health_ls);
			values_ls.push(cursor_health_ls.impact);

			// //legal
			// var legal_lsc = conn.db.collection("legal_ls");
			// const query_legal_ls = { attributes: legal, gender: gen };
			// var cursor_legal_ls = await legal_lsc.findOne(query_legal_ls);
			// values_ls.push(cursor_legal_ls.impact);

			// //dui
			// var dui_lsc = conn.db.collection("dui_dwi_ls");
			// const query_dui_ls = { attributes: dui, gender: gen };
			// var cursor_dui_ls = await dui_lsc.findOne(query_dui_ls);
			// values_ls.push(cursor_dui_ls.impact);

			// //crime
			// var crime_ls = conn.db.collection("crime_ls");
			// const query_crime_ls = { attributes: mis, gender: gen };
			// var cursor_crime_ls = await crime_ls.findOne(query_crime_ls);
			// values_ls.push(cursor_crime_ls.impact);

			// //annual
			// var annual_ls = conn.db.collection("annual_checkup_ls");
			// const query_ann_ls = { attributes: annulaCheck, gender: gen };
			// var cursor_ann_ls = await annual_ls.findOne(query_ann_ls);
			// values_ls.push(cursor_ann_ls.impact);

			// //exercise
			// var ex_ls = conn.db.collection("physical_exercise_ls");
			// const query_ex_ls = { attributes: phys_exer, gender: gen };
			// var cursor_ex_ls = await ex_ls.findOne(query_ex_ls);
			// values_ls.push(cursor_ex_ls.impact);

			//bp
			var bp_ls = conn.db.collection("bp_ls");
			const query_bp_ls = { attributes: blp, gender: gen };
			var cursor_bp_ls = await bp_ls.findOne(query_bp_ls);
			values_ls.push(cursor_bp_ls.impact);

			// //choles
			// var choles_ls = conn.db.collection("cholestrol_ls");
			// const query_choles_ls = { attributes: chol, gender: gen };
			// var cursor_choles_ls = await choles_ls.findOne(query_choles_ls);
			// values_ls.push(cursor_choles_ls.impact);

			// //di
			// var driving_ls = conn.db.collection("driving_ls");
			// const query_dri_ls = { attributes: dri, gender: gen };
			// var cursor_dri_ls = await driving_ls.findOne(query_dri_ls);
			// values_ls.push(cursor_dri_ls.impact);

			//ls
			var ls_ls = conn.db.collection("license_suspended_ls");
			const query_ls_ls = { attributes: license, gender: gen };
			var cursor_ls_ls = await ls_ls.findOne(query_ls_ls);
			values_ls.push(cursor_ls_ls.impact);

			var x = 0;
			var sum_ls = 0.0;

			for (x = 0; x < values_ls.length; x++) {
				sum_ls = sum_ls + values_ls[x];
			}
			//console.log(sum_ls);
			var fr = cursor_ideal.avg_life_span * (1 + sum_ls);
			var life_exp = parseInt(fr) * 12;
			//console.log(fr);
			console.log("Your Life Expectancy : ", life_exp);
			data.LCP_YOUR_LIFE = life_exp;
			sendPayload.YouravgLifeSpan = life_exp;
		} catch (err) {
			let error = {
				status: 500,
				error: "An error occurred. Please try again later.",
			};
			return res.send(error);
		}

		try {
			var aged = data.Age;
			//Get Rating
			var rate = conn.db.collection("credit_rating_master");
			const query_rate = { "Company Name": data.InsuranceCompany };
			var cursor_rate = await rate.findOne(query_rate);

			var rating = cursor_rate.Rating;

			//Get Age
			var age = conn.db.collection("age");
			const query_age = { Gender: gen, Age: aged };
			var cursor_age = await age.findOne(query_age);

			// //Get Annual Checkup
			// var ann_check = conn.db.collection("annual_checkup");
			// const query_ann_check = { Attributes: annulaCheck };
			// var cursor_ann_check = await ann_check.findOne(query_ann_check);

			//Get Blood Pressure
			var bp = conn.db.collection("blood_pressure");
			const query_bp = { Attributes: blp };
			var cursor_bp = await bp.findOne(query_bp);

			// //Get Cholestrol
			// var chlsrl = conn.db.collection("cholestrol");
			// const query_chlsrl = { Attributes: chol };
			// var cursor_chlsrl = await chlsrl.findOne(query_chlsrl);

			//Get Credit Rating
			var credit_r = conn.db.collection("credit_rating");
			const query_credit_r = { Attributes: rating };
			var cursor_credit_r = await credit_r.findOne(query_credit_r);

			// //Get drive infractions impact
			// var dric = conn.db.collection("driver_infractions_impact");
			// const query_dri = { "Attributes Name": dri };
			// var cursor_dri = await dric.findOne(query_dri);

			// //Get dui/dwi
			// var duic = conn.db.collection("dwi");
			// const query_dui = { "Attributes Name": dui };
			// var cursor_dui = await duic.findOne(query_dui);

			//Get health
			var health = conn.db.collection("health");
			const query_health = { "Attributes Name": heal };
			var cursor_health = await health.findOne(query_health);

			// //Get legal
			// var legaly = conn.db.collection("legal");
			// const query_legal = { "Attributes Name": legal };
			// var cursor_legal = await legaly.findOne(query_legal);

			//Get license suspended
			var lics = conn.db.collection("license_suspended");
			const query_lics = { "Attributes Name": license };
			var cursor_lics = await lics.findOne(query_lics);

			// //Get misdemanor
			// var misd = conn.db.collection("misdemeanor_or_felony");
			// const query_misd = { "Attributes Name": mis };
			// var cursor_misd = await misd.findOne(query_misd);

			// //Get physical_exercise
			// var phy = conn.db.collection("physical_exercise");
			// const query_phy = { "Attributes Name": phys_exer };
			// var cursor_phy = await phy.findOne(query_phy);

			//Get Smoker
			var smokers = conn.db.collection("smoker");
			const query_smoker = { "Attributes Name": smoker };
			var cursor_smoker = await smokers.findOne(query_smoker);

			//Get Weight
			var weightw = conn.db.collection("weight");
			const query_weight = { "Attributes Name": weight };
			var cursor_weight = await weightw.findOne(query_weight);

			var dis_ratef = [];
			var dis_ratec = [];
			var valuesc = [];
			var values = [];

			var agee = cursor_age.Flooring;
			var ageec = cursor_age.Ceiling;
			dis_ratef.push(agee);
			dis_ratec.push(ageec);

			var crv = cursor_credit_r.Flooring;
			var crcv = cursor_credit_r.Ceiling;

			// var ann_checkv = cursor_ann_check.Impact;
			var bpv = cursor_bp.Impact;
			// var chlsrlv = cursor_chlsrl.Impact;

			// var drii = cursor_dri.Impact;
			// var dui_dwiv = cursor_dui.Impact;

			var healthyv = cursor_health.Impact;
			// var legalyv = cursor_legal.Impact;

			var licsu = cursor_lics.Impact;
			// var misde = cursor_misd.Impact;

			// var physx = cursor_phy.Impact;
			var smokerv = cursor_smoker.Impact;
			var weightv = cursor_weight.Impact;
			values.push(crv, smokerv, healthyv, licsu, bpv, weightv);
			valuesc.push(crcv, smokerv, healthyv, licsu, bpv, weightv);

			var i = 0;
			var n = 0;
			//console.log("===>", values, valuesc);
			for (i = 0; i < values.length; i++) {
				n = values[i] * dis_ratef[0];

				//x=Math.round((n + Number.EPSILON)*100)/100;
				dis_ratef.push(n);
				//console.log(n)
			}

			for (i = 0; i < valuesc.length; i++) {
				n = valuesc[i] * dis_ratec[0];

				//x=Math.round((n + Number.EPSILON)*100)/100;
				dis_ratec.push(n);
				//console.log(n)
			}

			var sum = 0.0;
			var sumc = 0.0;
			var m = 0.0;

			for (i = 0; i < dis_ratef.length; i++) {
				sum = sum + dis_ratef[i];
				// console.log(sum);
			}

			for (i = 0; i < dis_ratec.length; i++) {
				sumc = sumc + dis_ratec[i];
				// console.log(sum);
			}

			//Calculation of ADDONs
			var dateaddon = new Date();
			var a_diff_in_years =
				pmntStartDate.getFullYear() - dateaddon.getFullYear();

			if (a_diff_in_years >= 11 && a_diff_in_years <= 15) {
				sum = sum + 0.005;
				sumc = sumc + 0.005;
			}
			if (a_diff_in_years >= 16 && a_diff_in_years <= 20) {
				sum = sum + 0.007;
				sumc = sumc + 0.007;
			}
			if (a_diff_in_years >= 21 && a_diff_in_years <= 25) {
				sum = sum + 0.0085;
				sumc = sumc + 0.0085;
			}
			if (a_diff_in_years >= 21 && a_diff_in_years <= 25) {
				sum = sum + 0.0085;
				sumc = sumc + 0.0085;
			}
			if (a_diff_in_years >= 26 && a_diff_in_years <= 30) {
				sum = sum + 0.01;
				sumc = sumc + 0.01;
			}
			if (a_diff_in_years >= 31 && a_diff_in_years <= 35) {
				sum = sum + 0.0115;
				sumc = sumc + 0.0115;
			}
			if (a_diff_in_years >= 36 && a_diff_in_years <= 45) {
				sum = sum + 0.015;
				sumc = sumc + 0.015;
			}

			var payments = data.PaymentAmount;
			var freq = 0;
			if (data.PaymentMode == "Weekly") {
				var diff = (pmntEndDate.getTime() - pmntStartDate.getTime()) / 1000;
				diff /= 60 * 60 * 24 * 7;
				freq = Math.abs(Math.round(diff));
				m = 52.0;
			}
			if (data.PaymentMode == "Monthly") {
				freq =
					pmntEndDate.getMonth() -
					pmntStartDate.getMonth() +
					12 * (pmntEndDate.getFullYear() - pmntStartDate.getFullYear());
				m = 12.0;
			}
			if (data.PaymentMode == "Quarterly") {
				var beginDate = Moment(data.PaymentStartDate);
				var endDate = Moment(pmntEndDate);
				freq = Math.floor(endDate.diff(beginDate, "months") / 3);
				m = 4.0;
			}
			if (data.PaymentMode == "Semiannually") {
				x = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
				freq = x * 2;
				m = 2.0;
			}
			if (data.PaymentMode == "Annually") {
				freq = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
				m = 1.0;
			}

			// Calculation of end date

			var ins_terms_c = conn.db.collection("insurance_term");
			const query_ins = { age: data.Age, gender: gen };
			var cursor_ins = await ins_terms_c.findOne(query_ins);
			var ins_terms = cursor_ins.insurance_term;
			var no_of_days = ins_terms * 365;
			var calc_end = no_of_days + ins_terms + pmntStartDate;
			var r = sum / m;
			var rc = sumc / m;
			var rb = 0.054 / m;

			//console.log(calc_end);
			//console.log(freq,"frequency")

			var pva = payments + (payments * (1 - (1 + r) ** -(freq - 1))) / r;
			var pvc = payments + (payments * (1 - (1 + rc) ** -(freq - 1))) / rc;
			var benbb = payments + (payments * (1 - (1 + rb) ** -(freq - 1))) / rb;

			//console.log("sum", sum);
			//console.log("sumC", sumc);

			var ann_interest_rate = (1 + sum / m) ** m - 1;
			var ann_interest_rate_c = (1 + sumc / m) ** m - 1;
			var ann_interest_rate_b = (1 + 0.054 / m) ** m - 1;

			var yearfrac = formulajs.YEARFRAC(pmntStartDate, pmntEndDate);
			console.log(yearfrac);

			console.log("LCP Flooring", pva);
			console.log("LCP Ceiling", pvc);
			console.log("LCP Beneficiary Protection Flooring: ", benff);
			console.log("LCP Beneficiary Protection Ceiling: ", benfc);
			console.log("LCP Beneficiary Protection Final: ", benbb);

			console.log(sum);
			console.log(sumc);

			data.PVA_LCP_Flooring = pva;
			data.PVA_LCP_Ceiling = pvc;
			data.LCP_BEN = Math.ceil(benbb/5000)*5000;
			sendPayload.pva = pva;
			sendPayload.pvc = pvc;
			sendPayload.ben_benfit = Math.ceil(benbb/5000)*5000//Math.round(formulajs.FLOORPRECISE(benbb, 5000))+5000;
			sendPayload.status = 200;
			sendPayload.message = "Success";
		} catch (err) {
			let error = {
				status: 500,
				error: "An error occurred. Please try again later.",
			};
			return res.send(error);
		}
	}

	//Calculation of SAADA GP
	if (data.PercentStep <= 0 && productType == "GP") {
		try {
			//Get Rating

			//Setting date for GP bha

			var diff_in_years_gp =
				pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
			if (diff_in_years_gp > 10 || diff_in_years_gp < 10) {
				pmntEndDate = new Date(
					pmntStartDate.getTime() + 3650 * 24 * 60 * 60 * 1000
				);
			}

			var rate = conn.db.collection("credit_rating_master");
			const query_rate = { "Company Name": data.InsuranceCompany };
			var cursor_rate = await rate.findOne(query_rate);

			var rating = cursor_rate.Rating;

			//Get Credit Rating
			var credit_r = conn.db.collection("credit_rating");
			const query_credit_r = { Attributes: rating };
			var cursor_credit_r = await credit_r.findOne(query_credit_r);

			var dis_ratef = 0;
			var dis_ratec = 0;

			var cr = cursor_credit_r.Flooring;

			var crc = cursor_credit_r.Ceiling;
			//console.log("cr", cr, "crc", crc);
			var m = 0.0;

			var diff_in_years_gp =
				pmntEndDate.getFullYear() - pmntStartDate.getFullYear();

			//Checking Ending Date of GP

			var payments = data.PaymentAmount;
			var freq = 0;
			//pmntEndDate.setMonth(pmntStartDate.getMonth() + 120);
			if (data.PaymentMode == "Weekly") {
				var diff = (pmntEndDate.getTime() - pmntStartDate.getTime()) / 1000;
				diff /= 60 * 60 * 24 * 7;
				freq = Math.abs(Math.round(diff));
				m = 52.0;
			}
			if (data.PaymentMode == "Monthly") {
				freq =
					pmntEndDate.getMonth() -
					pmntStartDate.getMonth() +
					12 * (pmntEndDate.getFullYear() - pmntStartDate.getFullYear());
				m = 12.0;
			}
			if (data.PaymentMode == "Quarterly") {
				var beginDate = Moment(data.PaymentStartDate);
				var endDate = Moment(pmntEndDate);
				freq = Math.floor(endDate.diff(beginDate, "months") / 3);
				m = 4.0;
			}
			if (data.PaymentMode == "Semiannually") {
				x = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
				freq = x * 2;
				m = 2.0;
			}
			if (data.PaymentMode == "Annually") {
				freq = pmntEndDate.getFullYear() - pmntStartDate.getFullYear();
				m = 1.0;
			}
			var r = cr / m;
			var rc = crc / m;

			var pva = payments + (payments * (1 - (1 + r) ** -(freq - 1))) / r;
			var pvc = payments + (payments * (1 - (1 + rc) ** -(freq - 1))) / rc;
			sendPayload = { pva: pva, pvc: pvc };
			var ann_interest_rate = (1 + cr / m) ** m - 1;
			var ann_interest_rate_c = (1 + crc / m) ** m - 1;

			//console.log(freq,"frequency")
			//console.log("cr",cr);
			//console.log("crc",crc);
			//Beneficiary Protection
			var date2 = new Date();
			var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

			var x = Math.round(Math.abs((pmntStartDate - date2) / oneDay));

			var kk = (x + 1) / 365;

			var benff = pva / (1 + ann_interest_rate) ** kk;
			var benfc = pvc / (1 + ann_interest_rate_c) ** kk;

			console.log("interest rate", ann_interest_rate);

			console.log("Beneficiary Protection GP Flooring : ", benff);
			console.log("Beneficiary Protection GP Ceiling : ", benfc);
			data.PVA_GP_Flooring = pva;
			data.PVA_GP_Ceiling = pvc;
			console.log("Flooring GP", pva);
			console.log("Ceiling GP", pvc);
			var min_offer = Math.min(benff, benfc);
			var cutoff = "Yes";
			var ben_benfit = 0.0;
			if (min_offer < 200000) {
				cutoff = "No";
			}
			if (cutoff == "Yes") {
				if (data.Age >= 18 && data.Age <= 28) {
					var y = 0.5;
					ben_benfit = Math.round(formulajs.FLOORPRECISE(y * min_offer, 10000));
				}
				if (data.Age >= 29 && data.Age <= 35) {
					var y = 0.45;
					ben_benfit = Math.round(formulajs.FLOORPRECISE(y * min_offer, 10000));
				}
				if (data.Age >= 36 && data.Age <= 50) {
					var y = 0.4;
					ben_benfit = Math.round(formulajs.FLOORPRECISE(y * min_offer, 10000));
				}
				if (data.Age >= 51 && data.Age <= 65) {
					var y = 0.35;
					ben_benfit = Math.round(formulajs.FLOORPRECISE(y * min_offer, 10000));
				}
			}

			if (cutoff == "No") {
				if (data.Age >= 18 && data.Age <= 28) {
					ben_benfit = 150000;
				}
				if (data.Age >= 29 && data.Age <= 35) {
					ben_benfit = 125000;
				}
				if (data.Age >= 36 && data.Age <= 50) {
					ben_benfit = 100000;
				}
				if (data.Age >= 51 && data.Age <= 65) {
					ben_benfit = 100000;
				}
			}
			data.GP_BEN = ben_benfit;
			sendPayload = {
				pva: pva,
				pvc: pvc,
				ben_benfit: ben_benfit,
				status: 200,
				message: "Success",
			};

			console.log("Beneficiary Protection Final:", ben_benfit);
		} catch (err) {
			sendPayload.error = "An error occurred. Please try again later.";
			console.log("err in getting results: ", err);
		}
	}
	const insert = new Insert(data);
	console.log("=====>", sendPayload);
	try {
		await insert.save();
		return res.send(sendPayload);
	} catch (err) {
		let error = {
			status: 500,
			error: "An error occurred. Please try again later.",
		};
		return res.send(error);
	}
});

module.exports = router;

// router.get("/getallDropDowns", async (req, res) => {
// 	try {
// 		var ABC = conn.db.collection("credit_rating_master");
// 		console.log("impact", ABC);
// 		const cursor = ABC.find({});
// 		const allValues = await cursor.toArray();
// 		var ABC2 = conn.db.collection("weight");
// 		console.log("impact", ABC2);
// 		const cursor1 = ABC2.find({});
// 		const allValues2 = await cursor1.toArray();
// 		var ABC3 = conn.db.collection("frequency");
// 		console.log("impact", ABC3);
// 		const cursor2 = ABC3.find({});
// 		const allValues3 = await cursor2.toArray();
// 		let data = {
// 			companies: allValues,
// 			weight: allValues2,
// 			frequency: allValues3,
// 		};
// 		res.send(data);
// 	} catch (err) {
// 		sendPayload.error = "An error occurred. Please try again later.";
// 		return res.status(400).json({ err: "not found" });
// 	}
// });
