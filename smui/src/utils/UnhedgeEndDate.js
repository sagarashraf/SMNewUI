export const UnhedgeEndDate = (userAge) => {
	var cutoff = 80;
	var three_months = 90;
	var curr_date = new Date();
	var age = +userAge;
	var old_date = new Date("01/01/1900");
	var no_of_days = (cutoff - age) * 365;
	const diffTime = Math.abs(curr_date - old_date);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	var total = diffDays + cutoff + no_of_days;
	let pmntEndDate = new Date(
		old_date.getTime() + parseInt(total) * 24 * 60 * 60 * 1000 + three_months
	).toDateString();

	return pmntEndDate;
};
