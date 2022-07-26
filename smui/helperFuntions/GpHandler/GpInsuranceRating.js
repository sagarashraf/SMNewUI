const Dummydata = require("../Dummydata");
const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function GpInsuranceRating(obejct) {
	let companyName = Dummydata.personalInformation.insuranceCompany;
	let sqlQuery = `select min_impact, max_impact from insurance_rating where company_name= "${companyName}"`;
	let companyratingImpact = await JsonConverter(
		await SqlQueryHandler(sqlQuery)
	);

	return companyratingImpact;
};
