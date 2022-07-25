const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");
module.exports = async function PhysicalActivities(option, sex) {
	yesQuery = `select impact from phys_active_pattern where gender= "${sex}" and option_ = "${option}"`;
	let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));
	return [yesStateImpact[0].impact];
};
