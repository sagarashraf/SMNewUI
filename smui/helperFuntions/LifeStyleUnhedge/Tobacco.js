const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");
module.exports = async function Tobacco(option, sex) {
	switch (option.state) {
		case 1:
			yesQuery = `select impact, life_exp_val from smoke where gender= "${sex}" and option_ = "1"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));
			let type = `select impact, life_exp_val, mortality_val from smoke_options where gender= "${sex}" and option_ = "${option.type}" `;
			let typeImpact = await JsonConverter(await SqlQueryHandler(type));
			let totalImpact = yesStateImpact[0]?.impact + typeImpact[0]?.impact;
			console.log("Smoker", yesStateImpact, typeImpact);
			return [
				{
					impact: totalImpact,
					life_exp_val:
						yesStateImpact[0]?.life_exp_val + typeImpact[0]?.life_exp_val,
					mortality_val: typeImpact[0]?.mortality_val,
				},
			];
		case 0:
			noQuery = `select impact, life_exp_val from smoke where gender= "${sex}" and option_ = "no"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));
			noStateimpact[0].mortality_val = 0;
			return noStateimpact;
		default:
			break;
	}
};
