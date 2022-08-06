const express = require("express");
const cors = require("cors");
const app = express();
var config = require("../smui/db_connection/connection.js");
const port = 5000;
app.use(express.json());
app.use(cors());

var connection = config.connection;

connection.on("error", () => {
	console.log("faild to connect");
});
connection.on("connected", () => {
	console.log("pass");
});

const CalculationRoutes = require("./routes/Calculations");
app.use("/main", CalculationRoutes);

const InsuranceTermRoute = require("./routes/insurance_rating");
app.use("/bc", InsuranceTermRoute);

const InsuranceCompanyRoute = require("./routes/insurance_company");
app.use("/bd", InsuranceCompanyRoute);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});
