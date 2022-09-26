const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");
module.exports = async function CriminalCharges(option, sex) {
	switch (option.state) {
		case 1:
			yesQuery = `select impact from criminal where gender= "${sex}" and option_ = "1"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));
			let type = `select impact from criminal_options where gender= "${sex}" and option_ = "${option.type}" `;
			let typeImpact = await JsonConverter(await SqlQueryHandler(type));
			console.log("yesStateImpact CriminalCharges", yesStateImpact);
			console.log("typeImpact CriminalCharges", typeImpact);
			return [yesStateImpact[0]?.impact + typeImpact[0]?.impact];
		case 0:
			noQuery = `select impact from criminal where gender= "${sex}" and option_ = "no"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));

			return [noStateimpact[0]?.impact];
		default:
			break;
	}
};
