module.exports = async function CommissionStructureLevelhedgeWithoutPS(
	base_rate_quote,
	max_quote,
	min_quote
) {
	console.log("nam tikki 1", base_rate_quote);
	console.log("nam tikki 2", max_quote);
	console.log("nam tikki 3", min_quote);
	let object = {};
	let cost_of_deal = 7500;
	//Commission Level 1 for Revenue at 5%
	let min_rev_5_h = ((base_rate_quote - cost_of_deal - min_quote) / 2) * 0.05;
	object.levelFiveMinSimple = min_rev_5_h;
	let min_com_rev_5_h = min_rev_5_h / 0.05 - min_rev_5_h;
	object.levelFiveMinCompany = min_com_rev_5_h;
	let max_rev_5_h = ((base_rate_quote - cost_of_deal - max_quote) / 2) * 0.05;
	object.levelFiveMaxSimple = max_rev_5_h;
	let max_com_rev_5_h = min_rev_5_h / 0.05 - max_rev_5_h;
	object.levelFiveMaxCompany = max_com_rev_5_h;
	//Commission Level 2 for Revenue at 10%
	let min_rev_10_h = ((base_rate_quote - cost_of_deal - min_quote) / 2) * 0.1;
	object.levelTenMinSimple = min_rev_10_h;
	let min_com_rev_10_h = min_rev_10_h / 0.1 - min_rev_10_h;
	object.levelTenMinCompany = min_com_rev_10_h;
	let max_rev_10_h = ((base_rate_quote - cost_of_deal - max_quote) / 2) * 0.1;
	object.levelTenMaxSimple = max_rev_10_h;
	let max_com_rev_10_h = min_rev_10_h / 0.1 - max_rev_10_h;
	object.levelTenMaxCompany = max_com_rev_10_h;
	//Commission Level 3 for Revenue at 20%
	let min_rev_20_h = ((base_rate_quote - cost_of_deal - min_quote) / 2) * 0.2;
	object.levelTewMinSimple = min_rev_20_h;
	let min_com_rev_20_h = min_rev_20_h / 0.2 - min_rev_20_h;
	object.levelTewMinCompany = min_com_rev_20_h;
	let max_rev_20_h = ((base_rate_quote - cost_of_deal - max_quote) / 2) * 0.2;
	object.levelTewMaxSimple = max_rev_20_h;
	let max_com_rev_20_h = min_rev_20_h / 0.2 - max_rev_20_h;
	object.levelTewMaxCompany = max_com_rev_20_h;
	return object;
};
