const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

SqlQueryHandler;
module.exports = async function HyperTension(object, sex) {
	let state = object.state;
	if (state == "0" || state == "3") {
		hypertensionQuery = `select impact, life_exp_val, mortality_val from high_bp where gender= "${sex}" and option_ = "${state}"`;

		let hypertensionimpact = await JsonConverter(
			await SqlQueryHandler(hypertensionQuery)
		);
		return hypertensionimpact;
	} else {
		hypertensionQuery = `select impact, life_exp_val, mortality_val from high_bp where gender= "${sex}" and option_ = "${state}"`;
		let hypertensionimpact = await JsonConverter(
			await SqlQueryHandler(hypertensionQuery)
		);

		hypertensionyears = `select impact, life_exp_val from high_bp_years where gender= "${sex}" and option_ =${object.level}`;

		let hypertensionyearsimpact = await JsonConverter(
			await SqlQueryHandler(hypertensionyears)
		);
		let totalImpact =
			hypertensionimpact[0]?.impact + hypertensionyearsimpact[0]?.impact;
		return [
			{
				impact: totalImpact,
				life_exp_val:
					hypertensionimpact[0]?.life_exp_val +
					hypertensionyearsimpact[0]?.life_exp_val,
				mortality_val: hypertensionimpact[0]?.mortality_val,
			},
		];
	}
};
