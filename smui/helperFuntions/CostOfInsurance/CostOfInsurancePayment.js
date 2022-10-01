module.exports = async function COI_PAYMENT(
	smoke, //bhq
	weight, //bhq
	const_factor, //db
	factor_male, //db
	factor_female, //db
	death_benefit, //code
	standard_tob, //db
	standard_plus, // All
	pref_tab,
	underweight,
	overweight,
	Obese
) {
	console.log(
		"++++++",
		smoke, //bhq
		weight, //bhq
		const_factor, //db
		factor_male, //db
		factor_female, //db
		death_benefit, //code
		standard_tob, //db
		standard_plus, // All
		pref_tab,
		underweight,
		overweight,
		Obese
	);
	let st_non_tab = const_factor * death_benefit * factor_male * factor_female;
	let st_tab = standard_tob * st_non_tab;
	let st_plus = standard_plus * st_non_tab;
	let preff_tab = standard_plus * st_non_tab * pref_tab;
	let uw_st_tob = standard_tob * underweight * st_non_tab;
	let ow_st_tob = standard_tob * overweight * st_non_tab;
	let ob_st_tob = standard_tob * Obese * st_non_tab;
	let uw_st_non_tob = underweight * st_non_tab;
	let ow_st_non_tob = overweight * st_non_tab;
	let ob_st_non_tob = Obese * st_non_tab;

	if (smoke == 1 && weight == "over weight") {
		return ow_st_tob;
	}
	if (smoke == 1 && weight == "average weight") {
		return st_tab;
	}
	if (smoke == 1 && weight == "Obese") {
		return ob_st_tob;
	}
	if (smoke == 1 && weight == "under weight") {
		return uw_st_tob;
	}
	if (smoke == 1 && weight == "ideal weight") {
		return preff_tab;
	}

	if (smoke == 0 && weight == "over weight") {
		return ow_st_non_tob;
	}
	if (smoke == 0 && weight == "average weight") {
		return st_non_tab;
	}
	if (smoke == 0 && weight == "Obese") {
		return ob_st_non_tob;
	}
	if (smoke == 0 && weight == "under weight") {
		return uw_st_non_tob;
	}
	if (smoke == 0 && weight == "ideal weight") {
		return st_plus;
	}
};
