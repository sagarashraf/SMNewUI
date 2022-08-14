const JsonConverter = require("../helperFuntions/JsonConverter");
const SqlQueryHandler = require("../helperFuntions/SqlQueryHandler");

module.exports = async function InsuranceRating() {
	query = `select * from insurance_rating;`;
	let company_names = await JsonConverter(await SqlQueryHandler(query));
	return company_names;
};
