const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");
module.exports = async function Tobacco(option, sex) {
	switch (option.state) {
		case 1:
			yesQuery = `select impact from smoke where gender= "${sex}" and option_ = "1"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));
			let type = `select impact from smoke_options where gender= "${sex}" and option_ = "${option.type}" `;
			let typeImpact = await JsonConverter(await SqlQueryHandler(type));
			return [yesStateImpact[0]?.impact + typeImpact[0]?.impact];
		case 0:
			noQuery = `select impact from smoke where gender= "${sex}" and option_ = "no"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));

			return [noStateimpact[0]?.impact];
		default:
			break;
	}
};
