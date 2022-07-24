const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function Cholesterol(object, sex) {
	let state = object.state;
	cholesterolQuery = `select impact from high_chols where gender= "${sex}" and option_ = "${state}"`;
	let cholesterolimpact = await JsonConverter(
		await SqlQueryHandler(cholesterolQuery)
	);
	cholesterolyears = `select impact from high_chols_years where gender= "${sex}" and option_ =${object.level}`;
	let cholesterolyearsimpact = await JsonConverter(
		await SqlQueryHandler(cholesterolyears)
	);

	return {
		cholesterol: cholesterolimpact[0].impact,
		choYearsImpact: cholesterolyearsimpact[0].impact,
	};
};
