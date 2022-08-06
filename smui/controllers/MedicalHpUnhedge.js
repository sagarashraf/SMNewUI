const Dummydata = require("../helperFuntions/Dummydata");
const Angiography = require("../helperFuntions/MedicalHpUnhedge/Angiography");
const AnnualCheckUp = require("../helperFuntions/MedicalHpUnhedge/AnnualCheckUp");
const Anxiety = require("../helperFuntions/MedicalHpUnhedge/Anxiety");
const Asthma = require("../helperFuntions/MedicalHpUnhedge/Asthma");
const Bipolar = require("../helperFuntions/MedicalHpUnhedge/Bipolar");
const cancerState = require("../helperFuntions/MedicalHpUnhedge/cancerState");
const Cholesterol = require("../helperFuntions/MedicalHpUnhedge/Cholesterol");
const Diabetes = require("../helperFuntions/MedicalHpUnhedge/Diabetes");
const Heart = require("../helperFuntions/MedicalHpUnhedge/Heart");
const Hiv = require("../helperFuntions/MedicalHpUnhedge/Hiv");
const HyperTension = require("../helperFuntions/MedicalHpUnhedge/HyperTension");
const Kidney = require("../helperFuntions/MedicalHpUnhedge/Kidney");
const Liver = require("../helperFuntions/MedicalHpUnhedge/Liver");
const MedIcalHistory = require("../helperFuntions/MedicalHpUnhedge/MedIcalHistory");
const NeurologicalDis = require("../helperFuntions/MedicalHpUnhedge/NeurologicalDis");
const PsychiatricDis = require("../helperFuntions/MedicalHpUnhedge/PsychiatricDis");
const SleepApnea = require("../helperFuntions/MedicalHpUnhedge/SleepApnea");

module.exports = async function MedicalHpUnhedge(
	sectionBaseWeightage,
	data,
	sex
) {
	var valueList = [];
	const cancerResults = await cancerState(data.cancer, sex);
	const hypertension = await HyperTension(data.hypertension, sex);
	const asthma = await Asthma(data.asthma, sex);
	const cholesterol = await Cholesterol(data.cholesterol, sex);
	const liver = await Liver(data.liver, sex);
	const kidney = await Kidney(data.kidney, sex);
	const sleepApnea = await SleepApnea(data.apnea, sex);
	const bipolar = await Bipolar(data.bipolar, sex);
	const neurologicalDis = await NeurologicalDis(data.neuroDisorder, sex);
	const psychiatricDis = await PsychiatricDis(data.psychiatric, sex);
	const anxiety = await Anxiety(data.anxiety, sex);
	const heart = await Heart(data.heartIssue, sex);
	const angiography = await Angiography(data.angiography, sex);
	const diabetes = await Diabetes(data.diabetes, sex);
	const hiv = await Hiv(data.hiv, sex);
	const annualCheckup = await AnnualCheckUp(data.checkUp, sex);
	const medicalHis = await MedIcalHistory(data.medHistory, sex);
	valueList.push(
		cancerResults,
		hypertension,
		asthma,
		cholesterol,
		liver,
		kidney,
		sleepApnea,
		bipolar,
		neurologicalDis,
		psychiatricDis,
		anxiety,
		heart,
		angiography,
		diabetes,
		hiv,
		annualCheckup,
		medicalHis
	);
	console.log(valueList);
	var ImpactValue = await [].concat.apply([], valueList);
	MdInitialBaseValues = await ImpactValue.map(
		(x) => x * sectionBaseWeightage[0]
	);
	let me = MdInitialBaseValues.reduce((a, b) => a + b, 0);

	return [me];
};
