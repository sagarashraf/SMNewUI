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
	console.log("cancer", cancerResults);
	const hypertension = await HyperTension(data.hypertension, sex);
	console.log("hypertension", hypertension);
	const asthma = await Asthma(data.asthma, sex);
	console.log("asthma", asthma);
	const cholesterol = await Cholesterol(data.cholesterol, sex);
	console.log("cholesterol", cholesterol);
	const liver = await Liver(data.liver, sex);
	console.log("liver", liver);
	const kidney = await Kidney(data.kidney, sex);
	console.log("kidney", kidney);
	const sleepApnea = await SleepApnea(data.apnea, sex);
	console.log("sleepApnea", sleepApnea);
	const bipolar = await Bipolar(data.bipolar, sex);
	console.log("bipolar", bipolar);
	const neurologicalDis = await NeurologicalDis(data.neuroDisorder, sex);
	console.log("neurologicalDis", neurologicalDis);
	const psychiatricDis = await PsychiatricDis(data.psychiatric, sex);
	console.log("psychiatricDis", psychiatricDis);
	const anxiety = await Anxiety(data.anxiety, sex);
	console.log("anxietyr", anxiety);
	const heart = await Heart(data.heartIssue, sex);
	console.log("heart", heart);
	const angiography = await Angiography(data.angiography, sex);
	console.log("angiography", angiography);
	//const diabetes = await Diabetes(data.diabetes, sex);
	//console.log("diabetes", diabetes);
	// const hiv = await Hiv(data.hiv, sex);
	// console.log("hiv", hiv);
	const annualCheckup = await AnnualCheckUp(data.checkUp, sex);
	console.log("annualCheckup", annualCheckup);
	const medicalHis = await MedIcalHistory(data.medHistory, sex);
	console.log("medicalHis", medicalHis);
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
		//diabetes,
		// hiv,
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
