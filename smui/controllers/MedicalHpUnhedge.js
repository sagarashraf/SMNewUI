const Dummydata = require("../helperFuntions/Dummydata");
//const Angiography = require("../helperFuntions/MedicalHpUnhedge/Angiography");
const AnnualCheckUp = require("../helperFuntions/MedicalHpUnhedge/AnnualCheckUp");
//const Anxiety = require("../helperFuntions/MedicalHpUnhedge/Anxiety");
//const Asthma = require("../helperFuntions/MedicalHpUnhedge/Asthma");
//const Bipolar = require("../helperFuntions/MedicalHpUnhedge/Bipolar");
const cancerState = require("../helperFuntions/MedicalHpUnhedge/cancerState");
const MedIcalHistory = require("../helperFuntions/MedicalHpUnhedge/MedIcalHistory");
const Hiv = require("../helperFuntions/MedicalHpUnhedge/Hiv");
const HyperTension = require("../helperFuntions/MedicalHpUnhedge/HyperTension");
const Cholesterol = require("../helperFuntions/MedicalHpUnhedge/Cholesterol");
const Lung = require("../helperFuntions/MedicalHpUnhedge/Lungs");
const Diabetes = require("../helperFuntions/MedicalHpUnhedge/Diabetes");
const Liver = require("../helperFuntions/MedicalHpUnhedge/Liver");
const Kidney = require("../helperFuntions/MedicalHpUnhedge/Kidney");
const Suicide = require("../helperFuntions/MedicalHpUnhedge/Suicide");
const Heart = require("../helperFuntions/MedicalHpUnhedge/HeartIssues");
const MentalIssues = require("../helperFuntions/MedicalHpUnhedge/MentalIssues");
const NeurologicalDis = require("../helperFuntions/MedicalHpUnhedge/NeurologicalDis");
const PainManagement = require("../helperFuntions/MedicalHpUnhedge/PainManagement");
const Lead = require("../helperFuntions/MedicalHpUnhedge/LeadPoison");
const DrugAbuse = require("../helperFuntions/MedicalHpUnhedge/DrugAbuse");
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
	const annualCheckup = await AnnualCheckUp(data.checkUp, sex);
	console.log("annualCheckup", annualCheckup);
	const medicalHis = await MedIcalHistory(data.medHistory, sex);
	console.log("medicalHis", medicalHis);
	const hypertension = await HyperTension(data.hypertension, sex);
	console.log("hypertension", hypertension);
	const cholesterol = await Cholesterol(data.cholesterol, sex);
	console.log("cholesterol", cholesterol);
	const lungs = await Lung(data.lung, sex);
	console.log("lungs", lungs);
	const diabetes = await Diabetes(data.diabetes, sex);
	console.log("Diabetes", diabetes);
	const liver = await Liver(data.liver, sex);
	console.log("liver", liver);
	const kidney = await Kidney(data.kidney, sex);
	console.log("kidney", kidney);
	const suicide = await Suicide(data.suicide, sex);
	console.log("suicide", suicide);
	const mentalIssues = await MentalIssues(data.mentalHealth, sex);
	console.log("MentalIssues", mentalIssues);
	const neurologicalDis = await NeurologicalDis(data.neuroDisorder, sex);
	console.log("neurologicalDis", neurologicalDis);
	const painManagement = await PainManagement(data.pain, sex);
	console.log("PainManagement", painManagement);
	const lead = await Lead(data.lead, sex);
	console.log("Lead", lead);
	const heart = await Heart(data.heartIssue, sex);
	console.log("heart", heart);
	const drugAbuse = await DrugAbuse(data.drug, sex);
	console.log("drugAbuse", drugAbuse);
	//const sleepApnea = await SleepApnea(data.apnea, sex);
	//console.log("sleepApnea", sleepApnea);
	// const bipolar = await Bipolar(data.bipolar, sex);
	// console.log("bipolar", bipolar);
	// const psychiatricDis = await PsychiatricDis(data.psychiatric, sex);
	// console.log("psychiatricDis", psychiatricDis);
	// const anxiety = await Anxiety(data.anxiety, sex);
	// console.log("anxietyr", anxiety);
	// const angiography = await Angiography(data.angiography, sex);
	// console.log("angiography", angiography);
	// const asthma = await Asthma(data.asthma, sex);
	// console.log("asthma", asthma);
	//const diabetes = await Diabetes(data.diabetes, sex);
	//console.log("diabetes", diabetes);
	// const hiv = await Hiv(data.hiv, sex);
	// console.log("hiv", hiv);

	valueList.push(
		cancerResults,
		annualCheckup,
		medicalHis,
		hypertension,
		cholesterol,
		lungs,
		diabetes,
		liver,
		kidney,
		suicide,
		mentalIssues,
		neurologicalDis,
		painManagement,
		lead,
		heart,
		drugAbuse
	);
	console.log(valueList);
	var ImpactValue = await [].concat.apply([], valueList);
	MdInitialBaseValues = await ImpactValue.map(
		(x) => x * sectionBaseWeightage[0]
	);
	let me = MdInitialBaseValues.reduce((a, b) => a + b, 0);

	return [me];
};
