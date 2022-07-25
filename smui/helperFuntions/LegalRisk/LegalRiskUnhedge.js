const Dummydata = require("../Dummydata");
const CriminalCharges = require("./CriminalCharges");
const DrivingInfractions = require("./DrivingInfractions");
const DuiDwi = require("./DuiDwi");

module.exports = async function LegalRiskUnhedge(sectionBaseWeightage) {
	var valueList = [];
	let sex = Dummydata.legalRisk.gender;

	const drivingInfractions = await DrivingInfractions(
		Dummydata.legalRisk.infractions,
		sex
	);
	const criminalCharges = await CriminalCharges(
		Dummydata.legalRisk.criminal,
		sex
	);
	const dwidui = await DuiDwi(Dummydata.legalRisk.duidwi, sex);

	valueList.push(drivingInfractions, criminalCharges, criminalCharges, dwidui);
	console.log(valueList);
	var ImpactValue = await [].concat.apply([], valueList);
	MdInitialBaseValues = await ImpactValue.map(
		(x) => x * sectionBaseWeightage[2]
	);
	let me = MdInitialBaseValues.reduce((a, b) => a + b, 0);
	return [me];
};
