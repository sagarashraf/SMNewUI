export const HedgeEndDate = (insuranc) => {
	let is = insuranc;
	let cuttoff = 90;
	let curr_date = new Date();
	let old_date = new Date("01/01/1900");
	let no_of_days = 365 * is;
	const diffTime = Math.abs(curr_date - old_date);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	let total = diffDays + cuttoff + no_of_days;
	let pmntEndDate = new Date(
		old_date.getTime() + parseInt(total) * 24 * 60 * 60 * 1000
	);
	return pmntEndDate;
};
