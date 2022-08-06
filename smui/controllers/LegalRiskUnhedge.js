const Dummydata = require("../helperFuntions/Dummydata");
const CriminalCharges = require("../helperFuntions/LegalRisk/CriminalCharges");
const DrivingInfractions = require("../helperFuntions/LegalRisk/DrivingInfractions");
const DuiDwi = require("../helperFuntions/LegalRisk/DuiDwi");

module.exports = async function LegalRiskUnhedge(
	sectionBaseWeightage,
	data,
	sex
) {
	var valueList = [];
	const drivingInfractions = await DrivingInfractions(data.infractions, sex);
	const criminalCharges = await CriminalCharges(data.criminal, sex);
	const dwidui = await DuiDwi(data.duidwi, sex);

	valueList.push(drivingInfractions, criminalCharges, dwidui);
	console.log(valueList);
	var ImpactValue = await [].concat.apply([], valueList);
	MdInitialBaseValues = await ImpactValue.map(
		(x) => x * sectionBaseWeightage[2]
	);
	let me = MdInitialBaseValues.reduce((a, b) => a + b, 0);
	return [me];
};
