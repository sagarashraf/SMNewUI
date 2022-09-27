const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");
module.exports = async function FruitVeg(option, sex) {
	switch (option) {
		case 1:
			yesQuery = `select impact, life_exp_val from vegies where gender= "${sex}" and option_ = "1"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));

			return yesStateImpact;
		case 0:
			noQuery = `select impact, life_exp_val from vegies where gender= "${sex}" and option_ = "0"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));

			return noStateimpact;
		default:
			break;
	}
};
