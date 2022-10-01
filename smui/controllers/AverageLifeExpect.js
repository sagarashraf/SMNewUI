const JsonConverter = require("../helperFuntions/JsonConverter");
const SqlQueryHandler = require("../helperFuntions/SqlQueryHandler");
module.exports = async function AverageLifeExpect(age, sex) {
	if (+age <= 18 || +age >= 85) {
		return "Age Brackt does not match";
	} else {
		Query = `select avg_lifexp from average_lifexp where age = ${age} and gender = "${sex}"`;
		let ageBracket = await JsonConverter(await SqlQueryHandler(Query));
		return ageBracket[0]?.avg_lifexp;
	}
};
