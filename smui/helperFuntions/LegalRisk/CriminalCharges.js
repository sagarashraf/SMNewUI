const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");
module.exports = async function CriminalCharges(option, sex) {
	yesQuery = `select impact from criminal where gender= "${sex}" and option_ = "${option}"`;
	let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));
	console.log("Al", yesQuery, yesStateImpact);
	return [yesStateImpact[0].impact];
};
