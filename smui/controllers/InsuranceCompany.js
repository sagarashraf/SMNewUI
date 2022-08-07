const JsonConverter = require("../helperFuntions/JsonConverter");
const SqlQueryHandler = require("../helperFuntions/SqlQueryHandler");

module.exports = async function InsuranceRating() {
	query = `select * from insurance_rating;`;
	console.log(query);
	let company_names = await JsonConverter(await SqlQueryHandler(query));
	console.log(company_names);
	return company_names;
};
