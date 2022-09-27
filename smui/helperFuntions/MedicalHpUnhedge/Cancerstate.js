const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function Cancerstate(cancerobject, sex) {
	switch (cancerobject.state) {
		case 1:
			yesQuery = `select impact,	life_exp_val from cancer where gender= "${sex}" and option_ = "1"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));
			yearsLevelQuery = `select impact, life_exp_val from cancer_years where gender= "${sex}" and option_ =${cancerobject.level}`;
			let yearLevelImpact = await JsonConverter(
				await SqlQueryHandler(yearsLevelQuery)
			);
			let type = `select impact, life_exp_val from cancer_options where gender= "${sex}" and option_ = "${cancerobject.type}" `;

			let typeImpact = await JsonConverter(await SqlQueryHandler(type));
			let totalImpact =
				yesStateImpact[0]?.impact +
				yearLevelImpact[0]?.impact +
				typeImpact[0]?.impact;

			console.log("_______", yesStateImpact, yearLevelImpact, typeImpact);
			return [
				{
					impact: totalImpact,
					life_exp_val:
						yesStateImpact[0].life_exp_val +
						yearLevelImpact[0]?.life_exp_val +
						typeImpact[0]?.life_exp_val,
				},
			];
		case 0:
			noQuery = `select impact, life_exp_val from cancer where gender= "${sex}" and option_ = "0"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));

			return noStateimpact;
		default:
			break;
	}
};
