const Dummydata = require("../helperFuntions/Dummydata");
const CreditDecline = require("../helperFuntions/InsuranceRating/CreditDecline");
const CurrentLifeIns = require("../helperFuntions/InsuranceRating/CurrentLifeIns");
module.exports = async function InsuranceRatingUnhedge(
	sectionBaseWeightage,
	data,
	sex
) {
	var valueList = [];
	var LifeExpectancy = [];
	const currentLifeIns = await CurrentLifeIns(data.lifeCoverage, sex);
	const creditDecline = await CreditDecline(data.decline, sex);

	valueList.push(currentLifeIns[0]?.impact, creditDecline[0]?.impact);
	LifeExpectancy.push(
		currentLifeIns[0]?.life_exp_val,
		creditDecline[0]?.life_exp_val
	);
	console.log(valueList);
	console.log("LifeExpectancy rating====>", LifeExpectancy);
	var ImpactValue = await [].concat.apply([], valueList);
	MdInitialBaseValues = await ImpactValue.map(
		(x) => x * sectionBaseWeightage[4]
	);
	let ins = MdInitialBaseValues.reduce((a, b) => a + b, 0);
	return { insUnhedge: ins, insLifeExpect: LifeExpectancy };
};
