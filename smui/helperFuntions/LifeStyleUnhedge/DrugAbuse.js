const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");
module.exports = async function DrugAbuse(option, sex) {
	switch (option.state) {
		case 1:
			yesQuery = `select impact, life_exp_val from alcohol_abuse where gender= "${sex}" and option_ = "1"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));
			let type = `select impact, life_exp_val from alcohol_abuse_options where gender= "${sex}" and option_ = "${option.type}" `;
			let typeImpact = await JsonConverter(await SqlQueryHandler(type));
			console.log("drug abuse", yesStateImpact, typeImpact);
			let totalImpact = yesStateImpact[0]?.impact + typeImpact[0]?.impact;
			return [
				{
					impact: totalImpact,
					life_exp_val:
						yesStateImpact[0]?.life_exp_val + typeImpact[0]?.life_exp_val,
				},
			];
		case 0:
			noQuery = `select impact, life_exp_val  from alcohol_abuse where gender= "${sex}" and option_ = "0"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));

			return noStateimpact;
		default:
			break;
	}
};
