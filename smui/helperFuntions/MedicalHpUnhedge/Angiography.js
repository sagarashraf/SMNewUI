const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function Angiography(object, sex) {
	switch (object.state) {
		case "yes":
			yesQuery = `select impact from angiography where gender= "${sex}" and option_ = "yes"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));

			yearsLevelQuery = `select impact from angiography_years where gender= "${sex}" and option_ =${object.level}`;
			let yearLevelImpact = await JsonConverter(
				await SqlQueryHandler(yearsLevelQuery)
			);
			return {
				angiographyImpact: yesStateImpact[0].impact,
				angiographyLevel: yearLevelImpact[0].impact,
			};
		case "no":
			noQuery = `select impact from angiography where gender= "${sex}" and option_ = "no"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));

			return {
				angiographyImpact: noStateimpact[0].impact,
				angiographyLevel: 0,
			};
		default:
			break;
	}
};
