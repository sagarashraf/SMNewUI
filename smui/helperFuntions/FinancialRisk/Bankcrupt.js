const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function Bankcrupt(object, sex) {
	switch (object.state) {
		case "yes":
			yesQuery = `select impact from bankrupt where gender= "${sex}" and option_ = "yes"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));

			yearsLevelQuery = `select impact from bankrupt_years where gender= "${sex}" and option_ =${object.level}`;
			let yearLevelImpact = await JsonConverter(
				await SqlQueryHandler(yearsLevelQuery)
			);
			return [yesStateImpact[0].impact + yearLevelImpact[0].impact];
		case "no":
			noQuery = `select impact from bankrupt where gender= "${sex}" and option_ = "no"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));
			return [noStateimpact[0].impact + 0];
		default:
			break;
	}
};
