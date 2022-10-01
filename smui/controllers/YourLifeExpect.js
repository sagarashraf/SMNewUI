module.exports = async function YourLifeExpect(
	Medical,
	lifestyle,
	legalrisk,
	financialrisk,
	insurance,
	Avg_life
) {
	var valueList = [];
	valueList.push(Medical, lifestyle, legalrisk, financialrisk, insurance);

	var ImpactValue = await [].concat.apply([], valueList);
	console.log("Values list ", ImpactValue);
	InitialBaseValues = await ImpactValue.map((x) => {
		let result = x * Avg_life;
		console.log(`values${x} Avg_life : ${Avg_life}`, result);
		return result;
	});
	console.log(" life expectency values", InitialBaseValues);
	let yourExpectLife = InitialBaseValues.reduce((a, b) => a + b, 0);
	return yourExpectLife;
};
