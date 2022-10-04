const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function Lungs(object, sex) {
	switch (object.state) {
		case 1:
			yesQuery = `select impact , life_exp_val from lung_disease where gender= "${sex}" and option_ = "1"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));
			console.log(yesStateImpact);
			yearsLevelQuery = `select impact, life_exp_val from lung_disease_years where gender= "${sex}" and option_ =${object.level}`;
			let yearLevelImpact = await JsonConverter(
				await SqlQueryHandler(yearsLevelQuery)
			);
			console.log(yearLevelImpact);
			let type = `select impact, life_exp_val, mortality_val from lung_disease_options where gender= "${sex}" and option_ = "${object.type}" `;
			let typeImpact = await JsonConverter(await SqlQueryHandler(type));
			console.log(typeImpact);
			let totalImpact =
				yesStateImpact[0]?.impact +
				yearLevelImpact[0]?.impact +
				typeImpact[0]?.impact;
			return [
				{
					impact: totalImpact,
					life_exp_val:
						yesStateImpact[0]?.life_exp_val +
						yearLevelImpact[0]?.life_exp_val +
						typeImpact[0]?.life_exp_val,
					mortality_val: typeImpact[0]?.mortality_val,
				},
			];
		case 0:
			noQuery = `select impact, life_exp_val from lung_disease where gender= "${sex}" and option_ = "0"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));
			noStateimpact[0].mortality_val = 0;
			return noStateimpact;
		default:
			break;
	}
};
