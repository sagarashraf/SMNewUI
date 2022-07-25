const Dummydata = require("../Dummydata");
const Angiography = require("./Angiography");
const AnnualCheckUp = require("./AnnualCheckUp");
const Anxiety = require("./Anxiety");
const Asthma = require("./Asthma");
const Bipolar = require("./Bipolar");
const cancerState = require("./cancerState");
const Cholesterol = require("./Cholesterol");
const Diabetes = require("./Diabetes");
const Heart = require("./Heart");
const Hiv = require("./Hiv");
const HyperTension = require("./HyperTension");
const Kidney = require("./Kidney");
const Liver = require("./Liver");
const MedIcalHistory = require("./MedIcalHistory");
const NeurologicalDis = require("./NeurologicalDis");
const PsychiatricDis = require("./PsychiatricDis");
const SleepApnea = require("./SleepApnea");

module.exports = async function MedicalHpUnhedge(sectionBaseWeightage) {
	var valueList = [];

	let dummydata = Dummydata.medicalData;
	let sex = dummydata.gender;
	const cancerResults = await cancerState(Dummydata.medicalData.cancer, sex);
	const hypertension = await HyperTension(
		Dummydata.medicalData.hypertension,
		sex
	);
	const asthma = await Asthma(Dummydata.medicalData.asthma, sex);
	const cholesterol = await Cholesterol(Dummydata.medicalData.cholesterol, sex);
	const liver = await Liver(Dummydata.medicalData.liver, sex);
	const kidney = await Kidney(Dummydata.medicalData.kidney, sex);
	const sleepApnea = await SleepApnea(Dummydata.medicalData.apnea, sex);
	const bipolar = await Bipolar(Dummydata.medicalData.bipolar, sex);
	const neurologicalDis = await NeurologicalDis(
		Dummydata.medicalData.neuroDisorder,
		sex
	);
	const psychiatricDis = await PsychiatricDis(
		Dummydata.medicalData.psychiatric,
		sex
	);
	const anxiety = await Anxiety(Dummydata.medicalData.anxiety, sex);
	const heart = await Heart(Dummydata.medicalData.heartIssue, sex);
	const angiography = await Angiography(Dummydata.medicalData.angiography, sex);
	const diabetes = await Diabetes(Dummydata.medicalData.diabetes, sex);
	const hiv = await Hiv(Dummydata.medicalData.hiv, sex);
	const annualCheckup = await AnnualCheckUp(Dummydata.medicalData.checkUp, sex);
	const medicalHis = await MedIcalHistory(
		Dummydata.medicalData.medHistory,
		sex
	);
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
