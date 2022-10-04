const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function BMIWeight(BMIWeight) {
	let Query = `Select impact ,life_exp_val, mortality_val from weight_category where weight like "%${BMIWeight}%"`;
	let BMIImpact = await JsonConverter(await SqlQueryHandler(Query));

	return {
		impact: BMIImpact[0]?.impact,
		life_exp_val: BMIImpact[0]?.life_exp_val,
		mortality_val: BMIImpact[0]?.mortality_val,
	};
};
