const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function Bipolar(object, sex) {
	switch (object.state) {
		case "yes":
			yesQuery = `select impact from bipolar where gender= "${sex}" and option_ = "yes"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));

			yearsLevelQuery = `select impact from bipolar_years where gender= "${sex}" and option_ =${object.level}`;
			let yearLevelImpact = await JsonConverter(
				await SqlQueryHandler(yearsLevelQuery)
			);
			return {
				bipolarImpact: yesStateImpact[0].impact,
				bipolarLevel: yearLevelImpact[0].impact,
			};
		case "no":
			noQuery = `select impact from bipolar where gender= "${sex}" and option_ = "no"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));

			return {
				bipolarImpact: noStateimpact[0].impact,
				bipolarLevel: 0,
			};
		default:
			break;
	}
};
