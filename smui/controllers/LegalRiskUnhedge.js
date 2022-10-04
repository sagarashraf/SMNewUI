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
	var legalExpectancy = [];
	var MortalityRate = [];
	// const drivingInfractions = await DrivingInfractions(data.infractions, sex);
	const criminalCharges = await CriminalCharges(data.criminal, sex);
	console.log("criminalCharges", criminalCharges);
	const drivinghistory = await DrivingHistory(data.drivingHistory, sex);
	console.log("drivinghistory", drivinghistory);
	const assault = await Assault(data.assault, sex);
	console.log("assaultassault", assault);

	valueList.push(
		assault[0]?.impact,
		criminalCharges[0]?.impact,
		drivinghistory[0]?.impact
	);

	console.log("assault===> llegalRisk", valueList);
	legalExpectancy.push(
		assault[0]?.life_exp_val,
		criminalCharges[0]?.life_exp_val,
		drivinghistory[0]?.life_exp_val
	);
	console.log("legalExpectancy legal risk", legalExpectancy);

	MortalityRate.push(
		assault[0]?.mortality_val,
		criminalCharges[0]?.mortality_val,
		drivinghistory[0]?.mortality_val
	);
	console.log("MortalityRate legal risk====?", MortalityRate);
	var ImpactValue = await [].concat.apply([], valueList);
	MdInitialBaseValues = await ImpactValue.map(
		(x) => x * sectionBaseWeightage[2]
	);
	let legalStyle = MdInitialBaseValues.reduce((a, b) => a + b, 0);
	return {
		legalStyleUnhedge: legalStyle,
		legalStyleExpect: legalExpectancy,
		MortalityValue: MortalityRate,
	};
};
