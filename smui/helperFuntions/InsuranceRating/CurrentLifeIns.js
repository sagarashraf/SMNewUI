const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");
module.exports = async function CurrentLifeIns(option, sex) {
	yesQuery = `select impact, life_exp_val from life_coverage where gender= "${sex}" and option_ = "${option}"`;
	let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));
	console.log("Al", yesQuery, yesStateImpact);
	return yesStateImpact;
};
