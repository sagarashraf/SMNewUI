const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function NeurologicalDis(object, sex) {
	switch (object.state) {
		case 1:
			yesQuery = `select impact from neuro_disorder where gender= "${sex}" and option_ = "1"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));

			yearsLevelQuery = `select impact from neuro_disorder_years where gender= "${sex}" and option_ =${object.level}`;
			let yearLevelImpact = await JsonConverter(
				await SqlQueryHandler(yearsLevelQuery)
			);
			let type = `select imapct from neuro_disorder_options where gender= "${sex}" and option_ = "${cancerobject.type}" `;

			let typeImpact = await JsonConverter(await SqlQueryHandler(type));

			return [
				yesStateImpact[0].impact +
					yearLevelImpact[0].impact +
					typeImpact[0]?.impact,
			];
		case 0:
			noQuery = `select impact from neuro_disorder where gender= "${sex}" and option_ = "0"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));

			return [noStateimpact[0].impact + 0];
		default:
			break;
	}
};
