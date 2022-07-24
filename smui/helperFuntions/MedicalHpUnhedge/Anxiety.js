const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function Anxiety(object, sex) {
	switch (object.state) {
		case "yes":
			yesQuery = `select impact from anxiety where gender= "${sex}" and option_ = "yes"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));

			yearsLevelQuery = `select impact from anxiety_years where gender= "${sex}" and option_ =${object.level}`;
			let yearLevelImpact = await JsonConverter(
				await SqlQueryHandler(yearsLevelQuery)
			);
			return {
				anxietyImpact: yesStateImpact[0].impact,
				anxietyLevel: yearLevelImpact[0].impact,
			};
		case "no":
			noQuery = `select impact from anxiety where gender= "${sex}" and option_ = "no"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));

			return {
				anxietyImpact: noStateimpact[0].impact,
				anxietyLevel: 0,
			};
		default:
			break;
	}
};
