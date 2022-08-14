const express = require("express");
const router = express.Router();
const InsuranceRating = require("../controllers/InsuranceCompany");

router.get("/ins_company_names", async (req, res) => {
	let ir = await InsuranceRating();
	res.status(200).send(ir);
});
module.exports = router;
