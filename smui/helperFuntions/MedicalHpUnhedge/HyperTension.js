const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

SqlQueryHandler;
module.exports = async function HyperTension(object, sex) {
	let state = object.state;
	hypertensionQuery = `select impact from high_bp where gender= "${sex}" and option_ = "${state}"`;
	let hypertensionimpact = await JsonConverter(
		await SqlQueryHandler(hypertensionQuery)
	);
	hypertensionyears = `select impact from high_bp_years where gender= "${sex}" and option_ =${object.level}`;
	let hypertensionyearsimpact = await JsonConverter(
		await SqlQueryHandler(hypertensionyears)
	);

	return [hypertensionimpact[0].impact, hypertensionyearsimpact[0].impact];
};
