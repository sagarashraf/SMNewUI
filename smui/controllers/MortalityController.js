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
		ImpactValue.push(0.3, 1);
	} else {
		ImpactValue.push(0.25, 1);
	}
	let yourMortalityRate = ImpactValue.reduce((a, b) => a + b, 0);
	return yourMortalityRate;
};
