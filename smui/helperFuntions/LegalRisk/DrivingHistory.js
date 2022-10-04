const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");
module.exports = async function DrivingHistory(option, sex) {
	switch (option.state) {
		case 1:
			yesQuery = `select impact, life_exp_val from driving_history where gender= "${sex}" and option_ = "1"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));
			let type = `select impact, life_exp_val, mortality_val from driving_history_options where gender= "${sex}" and option_ = "${option.type}" `;
			let typeImpact = await JsonConverter(await SqlQueryHandler(type));
			let totalImpact = yesStateImpact[0]?.impact + typeImpact[0]?.impact;
			return [
				{
					impact: totalImpact,
					life_exp_val:
						yesStateImpact[0]?.life_exp_val + typeImpact[0]?.life_exp_val,
					mortality_val: typeImpact[0]?.mortality_val,
				},
			];
		case 0:
			noQuery = `select impact, life_exp_val from driving_history where gender= "${sex}" and option_ = "0"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));
			noStateimpact[0].mortality_val = 0;
			return noStateimpact;
		default:
			break;
	}
};
