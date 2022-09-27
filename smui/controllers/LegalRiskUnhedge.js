const Dummydata = require("../helperFuntions/Dummydata");
const CriminalCharges = require("../helperFuntions/LegalRisk/CriminalCharges");
const DrivingInfractions = require("../helperFuntions/LegalRisk/DrivingInfractions");
const DrivingHistory = require("../helperFuntions/LegalRisk/DrivingHistory");
const Assault = require("../helperFuntions/LegalRisk/Assault");

module.exports = async function LegalRiskUnhedge(
	sectionBaseWeightage,
	data,
	sex
) {
	var valueList = [];
	var LifeExpectancy = [];
	// const drivingInfractions = await DrivingInfractions(data.infractions, sex);
	const criminalCharges = await CriminalCharges(data.criminal, sex);
	const drivinghistory = await DrivingHistory(data.drivingHistory, sex);
	const assault = await Assault(data.assault, sex);

	valueList.push(
		assault[0]?.impact,
		criminalCharges[0]?.impact,
		drivinghistory[0]?.impact
	);

	console.log(valueList);
	LifeExpectancy.push(
		assault[0]?.life_exp_val,
		criminalCharges[0]?.life_exp_val,
		drivinghistory[0]?.life_exp_val
	);
	console.log("LifeExpectancy legal risk", LifeExpectancy);
	var ImpactValue = await [].concat.apply([], valueList);
	MdInitialBaseValues = await ImpactValue.map(
		(x) => x * sectionBaseWeightage[2]
	);
	let me = MdInitialBaseValues.reduce((a, b) => a + b, 0);
	return [me];
};
