const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function AnnualCheckUp(option, sex) {
	switch (option) {
		case 1:
			yesQuery = `select impact , life_exp_val from annual_checkup where gender= "${sex}" and option_ = "1"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));
			console.log(
				"life_exp_val",
				yesStateImpact[0].impact,
				yesStateImpact[0].life_exp_val
			);
			return yesStateImpact;
		case 0:
			noQuery = `select impact , life_exp_val from annual_checkup where gender= "${sex}" and option_ = "0"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));
			console.log(
				"life_exp_val",
				yesStateImpact[0].impact,
				yesStateImpact[0].life_exp_val
			);
			return noStateimpact;
		default:
			break;
	}
};
