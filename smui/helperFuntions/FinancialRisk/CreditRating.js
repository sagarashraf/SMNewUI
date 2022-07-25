const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");
module.exports = async function CreditRating(option, sex) {
	yesQuery = `select impact from credit_rating where gender= "${sex}" and option_ = "${option}"`;
	let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));
	return [yesStateImpact[0].impact];
};
