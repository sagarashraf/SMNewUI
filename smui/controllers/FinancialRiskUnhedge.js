const Dummydata = require("../helperFuntions/Dummydata");
const Bankcrupt = require("../helperFuntions/FinancialRisk/Bankcrupt");
const CreditRating = require("../helperFuntions/FinancialRisk/CreditRating");

module.exports = async function FinancialRiskUnhedge(
	sectionBaseWeightage,
	data,
	sex
) {
	var valueList = [];
	var FinanExpectancy = [];
	const bankcrupt = await Bankcrupt(data.bankcrupt, sex);
	const creditcardrating = await CreditRating(data.creditrating, sex);
	valueList.push(bankcrupt[0]?.impact, creditcardrating[0]?.impact);
	FinanExpectancy.push(
		bankcrupt[0]?.life_exp_val,
		creditcardrating[0]?.life_exp_val
	);
	console.log("FinanExpectancy ---> financial ", FinanExpectancy);
	var ImpactValue = await [].concat.apply([], valueList);
	MdInitialBaseValues = await ImpactValue.map(
		(x) => x * sectionBaseWeightage[4]
	);
	let finvalues = MdInitialBaseValues.reduce((a, b) => a + b, 0);
	return {
		finanvaluesUnhedge: finvalues,
		finvaluesExpect: FinanExpectancy,
	};
};
