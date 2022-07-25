const Dummydata = require("../Dummydata");
const Bankcrupt = require("./Bankcrupt");
const CreditRating = require("./CreditRating");

module.exports = async function FinancialRiskUnhedge(sectionBaseWeightage) {
	var valueList = [];
	let sex = Dummydata.financialRisk.gender;
	const bankcrupt = await Bankcrupt(Dummydata.financialRisk.bankcrupt, sex);
	const creditcardrating = await CreditRating(
		Dummydata.financialRisk.creditrating,
		sex
	);
	valueList.push(bankcrupt, creditcardrating);
	var ImpactValue = await [].concat.apply([], valueList);
	MdInitialBaseValues = await ImpactValue.map(
		(x) => x * sectionBaseWeightage[3]
	);
	let me = MdInitialBaseValues.reduce((a, b) => a + b, 0);
	return [me];
};
