module.exports = async function JsonConverter(result) {
	let value = Object.values(JSON.parse(JSON.stringify(result)));
	return value;
};
