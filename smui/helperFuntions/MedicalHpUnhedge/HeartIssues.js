const JsonConverter = require("../JsonConverter");
const SqlQueryHandler = require("../SqlQueryHandler");

module.exports = async function HeartIssues(object, sex) {
	switch (object.state) {
		case 1:
			yesQuery = `select impact from heart_issues where gender= "${sex}" and option_ = "1"`;
			let yesStateImpact = await JsonConverter(await SqlQueryHandler(yesQuery));
			console.log(yesQuery, yesStateImpact);
			yearsLevelQuery = `select impact from heart_issues_years where gender= "${sex}" and option_ =${object.level}`;
			let yearLevelImpact = await JsonConverter(
				await SqlQueryHandler(yearsLevelQuery)
			);
			console.log(yearsLevelQuery, yearLevelImpact);
			let type = `select impact from heart_issues_options where gender= "${sex}" and option_ = "${object.type}" `;
			let typeImpact = await JsonConverter(await SqlQueryHandler(type));
			console.log(type, typeImpact);
			return [
				yesStateImpact[0]?.impact +
					yearLevelImpact[0]?.impact +
					typeImpact[0]?.impact,
			];
		case 0:
			noQuery = `select impact from heart_issues where gender= "${sex}" and option_ = "0"`;
			let noStateimpact = await JsonConverter(await SqlQueryHandler(noQuery));

			return [noStateimpact[0]?.impact + 0];
		default:
			break;
	}
};
