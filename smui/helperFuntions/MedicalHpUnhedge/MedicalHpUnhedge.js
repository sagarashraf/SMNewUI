const Dummydata = require("../Dummydata");
const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");
const Asthma = require("./Asthma");
const Bipolar = require("./Bipolar");
const cancerState = require("./cancerState");
const Cholesterol = require("./Cholesterol");
const HyperTension = require("./HyperTension");
const Kidney = require("./Kidney");
const Liver = require("./Liver");
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
	return psychiatricDis;
};
