const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function Cancerstate(cancerobject, sex) {
	switch (cancerobject.state) {
		case "yes":
			canceryes = `select impact from cancer where gender= "${sex}" and option_ = "yes"`;
			let yesstateimpact = await JsonConverter(
				await SqlQueryHandler(canceryes)
			);
			console.log("cancer query", yesstateimpact);
			canceryears = `select impact from cancer_years where gender= "${sex}" and option_ =${cancerobject.level}`;
			let cancerimpact = await JsonConverter(
				await SqlQueryHandler(canceryears)
			);
			return {
				cancerImpact: yesstateimpact[0].impact,
				cancerlevel: cancerimpact[0].impact,
			};
		case "no":
			cancerno = `select impact from cancer where gender= "${sex}" and option_ = "no"`;
			let nostateimpact = await JsonConverter(await SqlQueryHandler(cancerno));
			console.log("cancer query for noooo", nostateimpact);
			return {
				cancerImpact: nostateimpact[0].impact,
				cancerlevel: 0,
			};
		default:
			break;
	}
};
