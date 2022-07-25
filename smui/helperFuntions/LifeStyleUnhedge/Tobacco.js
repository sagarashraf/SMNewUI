const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");
module.exports = async function Tobacco(option, sex) {
	switch (option) {
		case "yes":
			yesQuery = `select impact from smoke where gender= "${sex}" and option_ = "yes"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));

			return [yesStateImpact[0].impact];
		case "no":
			noQuery = `select impact from smoke where gender= "${sex}" and option_ = "no"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));

			return [noStateimpact[0].impact];
		default:
			break;
	}
};
