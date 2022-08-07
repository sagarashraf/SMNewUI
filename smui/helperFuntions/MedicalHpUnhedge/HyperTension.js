const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

SqlQueryHandler;
module.exports = async function HyperTension(object, sex) {
	let state = object.state;
	if (state == "normal" || state == "not sure") {
		hypertensionQuery = `select impact from high_bp where gender= "${sex}" and option_ = "${state}"`;
		console.log("==?", hypertensionQuery);
		let hypertensionimpact = await JsonConverter(
			await SqlQueryHandler(hypertensionQuery)
		);

		return [hypertensionimpact[0].impact, 0];
	} else {
		hypertensionQuery = `select impact from high_bp where gender= "${sex}" and option_ = "${state}"`;
		console.log("==?", hypertensionQuery);
		let hypertensionimpact = await JsonConverter(
			await SqlQueryHandler(hypertensionQuery)
		);

		hypertensionyears = `select impact from high_bp_years where gender= "${sex}" and option_ =${object.level}`;
		console.log("==?", hypertensionyears);
		let hypertensionyearsimpact = await JsonConverter(
			await SqlQueryHandler(hypertensionyears)
		);
		console.log("==?", hypertensionyearsimpact);

		return [hypertensionimpact[0].impact, hypertensionyearsimpact[0].impact];
	}
};
