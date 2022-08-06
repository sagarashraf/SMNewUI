const Dummydata = require("../helperFuntions/Dummydata");
const CreditDecline = require("../helperFuntions/InsuranceRating/CreditDecline");
const CurrentLifeIns = require("../helperFuntions/InsuranceRating/CurrentLifeIns");
module.exports = async function InsuranceRatingUnhedge(
	sectionBaseWeightage,
	data,
	sex
) {
	var valueList = [];
	const currentLifeIns = await CurrentLifeIns(data.lifeCoverage, sex);
	const creditDecline = await CreditDecline(data.decline, sex);

	valueList.push(currentLifeIns, creditDecline);
	console.log(valueList);
	var ImpactValue = await [].concat.apply([], valueList);
	MdInitialBaseValues = await ImpactValue.map(
		(x) => x * sectionBaseWeightage[4]
	);
	let me = MdInitialBaseValues.reduce((a, b) => a + b, 0);
	return [me];
};
