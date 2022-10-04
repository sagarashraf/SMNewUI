const WOMAN_GENDER_FACTOR = 0.25;
const MALE_GENDER_FACTOR = 0.3;
const CONSTANT_SETUP = 1;
module.exports = async function MortalityController(
	Medical,
	lifestyle,
	legalrisk,
	sex
) {
	var valueList = [];
	valueList.push(Medical, lifestyle, legalrisk);

	var ImpactValue = await [].concat.apply([], valueList);
	console.log("Values list ", ImpactValue);
	if (sex === 0) {
		ImpactValue.push(MALE_GENDER_FACTOR, CONSTANT_SETUP);
	} else {
		ImpactValue.push(WOMAN_GENDER_FACTOR, CONSTANT_SETUP);
	}
	let yourMortalityRate = ImpactValue.reduce((a, b) => a + b, 0);
	return yourMortalityRate;
};
