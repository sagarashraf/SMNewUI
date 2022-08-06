const express = require("express");
const cors = require("cors");
const app = express();
var config = require("../smui/db_connection/connection.js");
const port = 3000;
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
app.use("/a", CalculationRoutes);

const InsuranceTermRoute = require("./routes/insurance_rating");
app.use("/bc",InsuranceTermRoute);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});
