const GpInsuranceRating = require("../helperFuntions/GpHandler/GpInsuranceRating");

module.exports = async function GpCalculations() {
	let ratingValue = await GpInsuranceRating();
	return ratingValue;
};
