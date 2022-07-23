var mysql = require('mysql');

config = {
  host: "db-smarterpayouts-1-crm.cf53hayykhdp.us-east-2.rds.amazonaws.com",
  port: 3306,
  user: "crm_admin",
  password: "Oscarfrancis12#$",
  database: "smarterpayouts_crm"
}

var connection =mysql.createConnection(config); //added the line
connection.connect(function(err){
  if (err){
    console.log('error connecting:' + err.stack);
  }
  console.log('connected successfully to DB.');
});

module.exports ={
     connection : mysql.createConnection(config) 
} 

