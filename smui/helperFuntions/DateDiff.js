module.exports = async function DateDiff(dateI, dateJ) {
	let date1 = new Date(dateI);
	let date2 = new Date(dateJ);
	date1.setHours(0);
	date1.setMinutes(0, 0, 0);
	date2.setHours(0);
	date2.setMinutes(0, 0, 0);
	var datediff = Math.abs(date1.getTime() - date2.getTime());
	return parseInt(datediff / (24 * 60 * 60 * 1000), 10);
};

// call this way DateDiff("04/01/2052", "01/01/2039");
