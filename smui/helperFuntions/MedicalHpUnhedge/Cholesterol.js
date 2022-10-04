const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function Cholesterol(object, sex) {
	let state = object.state;
	if (state == "0" || state == "3") {
		cholesterolQuery = `select impact, life_exp_val from high_chols where gender= "${sex}" and option_ = "${state}"`;
		let cholesterolimpact = await JsonConverter(
			await SqlQueryHandler(cholesterolQuery)
		);
		return cholesterolimpact;
	} else {
		cholesterolQuery = `select impact, life_exp_val, mortality_val from high_chols where gender= "${sex}" and option_ = "${state}"`;
		let cholesterolimpact = await JsonConverter(
			await SqlQueryHandler(cholesterolQuery)
		);
		cholesterolyears = `select impact, life_exp_val from high_chols_years where gender= "${sex}" and option_ =${object.level}`;
		let cholesterolyearsimpact = await JsonConverter(
			await SqlQueryHandler(cholesterolyears)
		);
		let totalImpact =
			cholesterolimpact[0]?.impact + cholesterolyearsimpact[0]?.impact;
		return [
			{
				impact: totalImpact,
				life_exp_val:
					cholesterolimpact[0]?.life_exp_val +
					cholesterolyearsimpact[0]?.life_exp_val,
				mortality_val: cholesterolimpact[0]?.mortality_val,
			},
		];
	}
};
