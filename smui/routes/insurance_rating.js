const express = require("express");
const router = express.Router();
const InsuranceTerm = require("../controllers/InsuranceTermC");

router.post("/ins_rating", async (req, res) => {
	let ir = await InsuranceTerm(65, "male");

	res.status(200).send(ir);
});
module.exports = router;
