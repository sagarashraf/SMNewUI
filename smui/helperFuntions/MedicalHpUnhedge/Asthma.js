const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function Asthma(object, sex) {
	switch (object.state) {
		case "yes":
			yesQuery = `select impact from asthma where gender= "${sex}" and option_ = "yes"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));

			yearsLevelQuery = `select impact from asthma_years where gender= "${sex}" and option_ =${object.level}`;
			let yearLevelImpact = await JsonConverter(
				await SqlQueryHandler(yearsLevelQuery)
			);
			return {
				asthmaImpact: yesStateImpact[0].impact,
				asthmaLevel: yearLevelImpact[0].impact,
			};
		case "no":
			noQuery = `select impact from asthma where gender= "${sex}" and option_ = "no"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));
			console.log("cancer query for noooo", noStateimpact);
			return {
				asthmaImpact: nostateimpact[0].impact,
				asthmaLevel: 0,
			};
		default:
			break;
	}
};
