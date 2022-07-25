const Dummydata = require("../Dummydata");
const CreditDecline = require("./CreditDecline");
const CurrentLifeIns = require("./CurrentLifeIns");
module.exports = async function InsuranceRatingUnhedge(sectionBaseWeightage) {
	var valueList = [];
	let sex = Dummydata.insurance.gender;
	const currentLifeIns = await CurrentLifeIns(
		Dummydata.insurance.lifeCoverage,
		sex
	);
	const creditDecline = await CreditDecline(Dummydata.insurance.decline, sex);

	valueList.push(currentLifeIns, creditDecline);
	console.log(valueList);
	var ImpactValue = await [].concat.apply([], valueList);
	MdInitialBaseValues = await ImpactValue.map(
		(x) => x * sectionBaseWeightage[4]
	);
	let me = MdInitialBaseValues.reduce((a, b) => a + b, 0);
	return [me];
};
