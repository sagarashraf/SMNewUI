const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function PsychiatricDis(object, sex) {
	switch (object.state) {
		case "yes":
			yesQuery = `select impact from psych_disorder where gender= "${sex}" and option_ = "yes"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));

			yearsLevelQuery = `select impact from psych_disorder_years where gender= "${sex}" and option_ =${object.level}`;
			let yearLevelImpact = await JsonConverter(
				await SqlQueryHandler(yearsLevelQuery)
			);
			return {
				psych_disorderImpact: yesStateImpact[0].impact,
				psych_disorderLevel: yearLevelImpact[0].impact,
			};
		case "no":
			noQuery = `select impact from psych_disorder where gender= "${sex}" and option_ = "no"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));

			return {
				psych_disorderImpact: noStateimpact[0].impact,
				psych_disorderLevel: 0,
			};
		default:
			break;
	}
};
