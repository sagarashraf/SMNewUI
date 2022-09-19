const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");
module.exports = async function FruitVegPattern(option, sex) {
	yesQuery = `select impact from vegies_pattern where gender= "${sex}" and option_ = "${option}"`;
	let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));
	console.log("vp", yesQuery, yesStateImpact);
	return [yesStateImpact[0]?.impact];
};
