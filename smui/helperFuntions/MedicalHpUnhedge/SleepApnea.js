const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function SleepApnea(object, sex) {
	switch (object.state) {
		case "yes":
			yesQuery = `select impact from sleep_apnea where gender= "${sex}" and option_ = "yes"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));

			yearsLevelQuery = `select impact from sleep_apnea_years where gender= "${sex}" and option_ =${object.level}`;
			let yearLevelImpact = await JsonConverter(
				await SqlQueryHandler(yearsLevelQuery)
			);
			return {
				sleepapneaImpact: yesStateImpact[0].impact,
				sleepapneaLevel: yearLevelImpact[0].impact,
			};
		case "no":
			noQuery = `select impact from sleep_apnea where gender= "${sex}" and option_ = "no"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));
			return {
				sleepapneaImpact: noStateimpact[0].impact,
				sleepapneaLevel: 0,
			};
		default:
			break;
	}
};
