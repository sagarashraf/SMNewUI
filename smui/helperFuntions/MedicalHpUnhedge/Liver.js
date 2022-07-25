const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function Liver(object, sex) {
	switch (object.state) {
		case "yes":
			yesQuery = `select impact from liver where gender= "${sex}" and option_ = "yes"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));

			yearsLevelQuery = `select impact from liver_years where gender= "${sex}" and option_ =${object.level}`;
			let yearLevelImpact = await JsonConverter(
				await SqlQueryHandler(yearsLevelQuery)
			);
			return [yesStateImpact[0].impact, yearLevelImpact[0].impact];
		case "no":
			noQuery = `select impact from liver where gender= "${sex}" and option_ = "no"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));

			return [noStateimpact[0].impact, 0];
		default:
			break;
	}
};
