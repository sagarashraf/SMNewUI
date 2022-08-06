const JsonConverter = require("../helperFuntions/JsonConverter");
const SqlQueryHandler = require("../helperFuntions/SqlQueryHandler");


module.exports = async function InsuranceTerm(age, sex) {
	query = `select insurance_term from insurance_term where gender = "${sex}" and age = ${age};`;
    console.log(query);
	let is_term = await JsonConverter(await SqlQueryHandler(query)); 
	console.log(is_term);
	return is_term;
};

