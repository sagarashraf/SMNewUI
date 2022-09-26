const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function Bankcrupt(object, sex) {
	switch (object.state) {
		case 1:
			yesQuery = `select impact from bankrupt where gender= "${sex}" and option_ = "1"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));

			yearsLevelQuery = `select impact from bankrupt_options where gender= "${sex}" and option_ ="${object.type}"`;
			let yearLevelImpact = await JsonConverter(
				await SqlQueryHandler(yearsLevelQuery)
			);
			console.log("yesStateImpact bankrupt", yearLevelImpact, yesStateImpact);
			return [yesStateImpact[0].impact + yearLevelImpact[0].impact];
		case 0:
			noQuery = `select impact from bankrupt where gender= "${sex}" and option_ = "0"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));
			return [noStateimpact[0].impact + 0];
		default:
			break;
	}
};
