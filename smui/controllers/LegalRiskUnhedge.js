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
	// const drivingInfractions = await DrivingInfractions(data.infractions, sex);
	const criminalCharges = await CriminalCharges(data.criminal, sex);
	const drivinghistory = await DrivingHistory(data.drivingHistory, sex);
	const assault = await Assault(data.assault, sex);

	valueList.push(assault, criminalCharges, drivinghistory);
	console.log(valueList);
	var ImpactValue = await [].concat.apply([], valueList);
	MdInitialBaseValues = await ImpactValue.map(
		(x) => x * sectionBaseWeightage[2]
	);
	let me = MdInitialBaseValues.reduce((a, b) => a + b, 0);
	return [me];
};
