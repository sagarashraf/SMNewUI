const JsonConverter = require("../helperFuntions/JsonConverter");
const SqlQueryHandler = require("../helperFuntions/SqlQueryHandler");
const CostOfInsurancePaymentAmount = require("../helperFuntions/CostOfInsurance/CostOfInsurancePayment");
const CostOfInsurance = require("../helperFuntions/CostOfInsurance/CostOfInsurance");

module.exports = async function CostOfInsuranceController(
	Smoke,
	WeightBMI,
	gender,
	age,
	LCPValue,
	pmntEndDate_hedge,
	pmntMode
) {
	let coi_smoke = Smoke;
	let coi_weight = WeightBMI;
	let coi_constfac = 0.001438;
	let coi_facm = 0;
	let coi_facf = 0;
	let coi_death = LCPValue;
	let coi_sttab = 0;
	let coi_stplus = 0;
	let coi_preftab = 0;
	let coi_uw = 0;
	let coi_ow = 0;
	let coi_ob = 0;

	if (gender == 0) {
		coi_facf = 1;
		let factorq = `select factor from age_multiple_30 where gender= "male" and age = ${age}`;
		coi_facm = await JsonConverter(await SqlQueryHandler(factorq));
		//let factorfq = `select factor from age_multiple_30 where gender= "male" and age = ${age}`;
		//coi_facf = await JsonConverter(await SqlQueryHandler(factorfq));
		// if (LCPWithoutAIhedge.LCPBEN) {
		// 	coi_death = LCPWithoutAIhedge.LCPBEN;
		// }
		// if (LCPWithAIhedge) {
		// 	coi_death = LCPWithAIhedge.LCPBEN;
		// }
		let sttabq = `select factor from standard_tobacco_30 where gender= "male" and age = ${age}`;
		coi_sttab = await JsonConverter(await SqlQueryHandler(sttabq));

		let stplusq = `select factor from standard_plus_30 where gender= "male" and age = ${age}`;
		coi_stplus = await JsonConverter(await SqlQueryHandler(stplusq));

		let preftabq = `select factor from preferred_tobacco_30 where gender= "male" and age = ${age}`;
		coi_preftab = await JsonConverter(await SqlQueryHandler(preftabq));

		let uwq = `select impact from weight_category where weight = "${coi_weight}"`;
		coi_uw = await JsonConverter(await SqlQueryHandler(uwq));

		let owq = `select impact from weight_category where weight ="${coi_weight}"`;
		coi_ow = await JsonConverter(await SqlQueryHandler(owq));

		let obq = `select impact from weight_category where weight ="${coi_weight}"`;
		coi_ob = await JsonConverter(await SqlQueryHandler(obq));

		let amount = await CostOfInsurancePaymentAmount(
			coi_smoke,
			coi_weight,
			coi_constfac,
			coi_facm[0]?.factor,
			coi_facf,
			coi_death,
			coi_sttab[0]?.factor,
			coi_stplus[0]?.factor,
			coi_preftab[0]?.factor,
			coi_uw[0]?.impact,
			coi_ow[0]?.impact,
			coi_ob[0]?.impact
		);

		var coi_pmntStartDate = new Date();
		coi_pmntStartDate.setMonth(coi_pmntStartDate.getMonth() + 3);
		let coi_quote = await CostOfInsurance(
			coi_pmntStartDate,
			pmntEndDate_hedge,
			pmntMode,
			amount,
			0.04
		);
		console.log(
			"amount",
			amount,
			"coi_quote",
			coi_quote,
			"coi_smoke, coi_weight",
			coi_smoke,
			coi_weight
		);
		return { coi_quote, amount };
	} else {
		let factorq = `select factor from age_multiple_30 where gender= "male" and age = ${age}`;
		coi_facm = await JsonConverter(await SqlQueryHandler(factorq));

		let factorfq = `select factor from age_multiple_30 where gender= "female" and age = ${age}`;
		coi_facf = await JsonConverter(await SqlQueryHandler(factorfq));
		// if (LCPWithoutAIhedge.LCPBEN) {
		// 	coi_death = LCPWithoutAIhedge.LCPBEN;
		// }
		// if (LCPWithAIhedge) {
		// 	coi_death = LCPWithAIhedge.LCPBEN;
		// }
		let sttabq = `select factor from standard_tobacco_30 where gender= "female" and age = ${age}`;
		coi_sttab = await JsonConverter(await SqlQueryHandler(sttabq));

		let stplusq = `select factor from standard_plus_30 where gender= "female" and age = ${age}`;
		coi_stplus = await JsonConverter(await SqlQueryHandler(stplusq));

		let preftabq = `select factor from preferred_tobacco_30 where gender= "female" and age = ${age}`;
		coi_preftab = await JsonConverter(await SqlQueryHandler(preftabq));

		let uwq = `select impact from weight_category where weight = "${coi_weight}"`;
		coi_uw = await JsonConverter(await SqlQueryHandler(uwq));

		let owq = `select impact from weight_category where weight ="${coi_weight}"`;
		coi_ow = await JsonConverter(await SqlQueryHandler(owq));

		let obq = `select impact from weight_category where weight ="${coi_weight}"`;
		coi_ob = await JsonConverter(await SqlQueryHandler(obq));

		let amount = await CostOfInsurancePaymentAmount(
			coi_smoke,
			coi_weight,
			coi_constfac,
			coi_facm[0]?.factor,
			coi_facf[0]?.factor,
			coi_death,
			coi_sttab[0]?.factor,
			coi_stplus[0]?.factor,
			coi_preftab[0]?.factor,
			coi_uw[0]?.impact,
			coi_ow[0]?.impact,
			coi_ob[0]?.impact
		);

		var coi_pmntStartDate = new Date();
		coi_pmntStartDate.setMonth(coi_pmntStartDate.getMonth() + 3);
		let coi_quote = await CostOfInsurance(
			coi_pmntStartDate,
			pmntEndDate_hedge,
			pmntMode,
			amount,
			0.04
		);
		console.log(
			"amount",
			amount,
			"coi_quote",
			coi_quote,
			"coi_smoke, coi_weight",
			coi_smoke,
			coi_weight
		);
		return { coi_quote, amount };
	}
};
