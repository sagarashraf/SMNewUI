module.exports = async function TotalBaseRate(
	Medical,
	lifestyle,
	legalrisk,
	financialrisk,
	insurance
) {
	var valueList = [];
	valueList.push(Medical, lifestyle, legalrisk, financialrisk, insurance);
	var ImpactValue = await [].concat.apply([], valueList);
	let me = ImpactValue.reduce((a, b) => a + b, 0);
	return {
		maxBaseRate: me + 0.03,
		minBaseRate: me + 0.02,
		originalBaseRate: me,
	};
};
