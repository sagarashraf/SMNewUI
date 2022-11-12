const ValidatorLevelOne = require("./ValidatorMedicalForm");

let PaymentMode = [
	"Annually",
	"Semiannually",
	"Quarterly",
	"Monthly",
	"Weekly",
];
module.exports = async function BasicValidators(object) {
	console.log(object, "testing validation");
	let MedicalDataValidation = await ValidatorLevelOne(object.medicalData);
	if (object.age < 18 || object.age > 86) {
		return "Age is not Valid";
	} else if (object.gender != 0 && object.gender != 1) {
		return "Gender is not Valid";
	} else if (object.paymentInfo.startDate.length === 0) {
		return "Start Date is required";
	} else if (object.paymentInfo.endDate.length === 0) {
		return "End Date is required";
	} else if (object.paymentInfo.calEndDateHedge.length === 0) {
		return "Hedge End Date is required";
	} else if (object.paymentInfo.calEndDateUnhedge.length === 0) {
		return "Unhedge End Date is required";
	} else if (object.paymentInfo.paymentAmount <= 0) {
		return "Payment is required";
	} else if (!PaymentMode.includes(object.paymentInfo.paymentMode)) {
		return "Payment Mode is required";
	} else if (
		object.paymentInfo.annualIncrese < 0 ||
		object.paymentInfo.annualIncrese > 10
	) {
		return " Annual Increase out of range";
	}
	if (object.personalInformation.paymentType == 1) {
		if (MedicalDataValidation != true) {
			return MedicalDataValidation;
		} else {
			return true;
		}
	} else {
		return true;
	}
};
