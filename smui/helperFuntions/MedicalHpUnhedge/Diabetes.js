const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function Diabetes(object, sex) {
	switch (object.state) {
		case 1:
			yesQuery = `select impact, life_exp_val from diabetes where  gender= "${sex}" and option_ = "1"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));

			yearsLevelQuery = `select impact, life_exp_val, mortality_val from diabetes_option where gender= "${sex}" and option_ ="${object.level}"`;
			let yearLevelImpact = await JsonConverter(
				await SqlQueryHandler(yearsLevelQuery)
			);
			console.log();
			let totalImpact = yesStateImpact[0]?.impact + yearLevelImpact[0]?.impact;
			return [
				{
					impact: totalImpact,
					life_exp_val:
						yesStateImpact[0]?.life_exp_val + yearLevelImpact[0]?.life_exp_val,
					mortality_val: yearLevelImpact[0]?.mortality_val,
				},
			];
		case 0:
			noQuery = `select impact, life_exp_val from diabetes where gender= "${sex}" and option_ = "0"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));
			noStateimpact[0].mortality_val = 0;
			console.log("noStateimpact ++++++", noStateimpact);
			return noStateimpact;
		default:
			break;
	}
};
