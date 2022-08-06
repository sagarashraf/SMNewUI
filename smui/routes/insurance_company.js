const express = require("express");
const router = express.Router();
const InsuranceRating = require("../controllers/InsuranceCompany");

router.get("/ins_company_names", async (req, res) => {
    let ir = await InsuranceRating('Others');
    console.log(ir);
    res.status(200).send({ "insurance_company_name": ir });

});
module.exports = router;