const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function Cancerstate(cancerobject, sex) {
	switch (cancerobject.state) {
		case "yes":
			yesQuery = `select impact from cancer where gender= "${sex}" and option_ = "yes"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));
			yearsLevelQuery = `select impact from cancer_years where gender= "${sex}" and option_ =${cancerobject.level}`;
			let yearLevelImpact = await JsonConverter(
				await SqlQueryHandler(yearsLevelQuery)
			);
			return [yesStateImpact[0].impact + yearLevelImpact[0].impact];
		case "no":
			noQuery = `select impact from cancer where gender= "${sex}" and option_ = "no"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));

			return [noStateimpact[0].impact + 0];
		default:
			break;
	}
};
