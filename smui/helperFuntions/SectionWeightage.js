const express = require("express");
const sqlQueries = require("../appConstant/sqlQueries");
var config = require("../db_connection/connection");
const JsonConverter = require("./JsonConverter");
const SqlQueryHandler = require("./SqlQueryHandler");
var connection = config.connection;

module.exports = async function Section(age, sex) {
	let parametervalue = await SqlQueryHandler(sqlQueries.PARAMETERS);
	var parametersJson = await JsonConverter(parametervalue);
	ageQuery = `select impact from age_base where gender = "${sex}" and age = ${age}`;
	let ageBase = await SqlQueryHandler(ageQuery);
	var ageBaseJson = await JsonConverter(ageBase);
	let initialBaseValue = parametersJson.map(function (element) {
		return element.paramater_impact * ageBaseJson[0].impact;
	});
	return initialBaseValue;
};
