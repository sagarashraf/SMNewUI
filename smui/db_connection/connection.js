var mysql = require('mysql');

var con = mysql.createConnection({
  host: "db-smarterpayouts-1-crm.cf53hayykhdp.us-east-2.rds.amazonaws.com",
  port: 3306,
  user: "crm_admin",
  password: "Oscarfrancis12#$",
  database: "smarterpayouts_crm"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});