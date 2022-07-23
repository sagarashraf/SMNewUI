const express = require("express");
const router = express.Router();
const Moment = require("moment");
const formulajs = require("@formulajs/formulajs");
var config = require('../db_connection/connection');




var connection= config.connection
connection.query ('select * from asthma', function(error, results){
   if (results){
     console.log(results);
   }
   else{
     console.log(error);
   }
});


router.post("/Calculate", async (req, res) => {
	//System Information

let paymentType = "";
let gender = "";
let age = 0;
let manualHeight = 0;
let manualWeight = 0;
let bmi = "";
let rating = "";
let startDate = "";
let endDate = "";
let calcEndHedge = "";
let calcEndUnhedge = "";
let at = 0;
let annualIncrease = 0;


//BHQ Starts Here

//Medical Profile
let hiv = "";
let cancer = "";
let cancer_y = 0;
let annualCheckup = "";
let majorMH = "";
let bp = "";
let bp_y = 0;
let highCh = "";
let highCh_y = 0;
let asthma = "";
let asthma_y = 0;
let diabetes = "";
let diabetes_y = "";
let liver = "";
let liver_y = 0;
let kidney = "";
let kidney_y = 0;
let sleep = "";
let sleep_y = 0;
let bipolar = "";
let bipolar_y = 0;
let nd = "";
let nd_y = 0;
let pd = "";
let pd_y = 0;
let anxiety = "";
let anxiety_y = 0;
let heart = "";
let heart_y = 0;
let ango = "";
let ango_y = 0;




// Lifestyle BHQ

let phyA = "";
let exer = "";
let veg = "";
let dis = "";
let smoke = "";
let alch = "";
let drug = "";


// Legal Risk BHQ

let drivingIn = "";
let crime = "";
let dui = "";
let dui_y = 0;


// Financial Risk History

let bankrupt = "";
let bankrupt_y = 0;
let creditRating = "";

//Insurance rating BHQ
let lic = "";
let dlic = "";
	

	
});

module.exports = router;