const express = require("express");
const router = express.Router();
const InsuranceTerm = require("../controllers/InsuranceTermC");

router.get("/ins_rating", async (req, res) => {
    let ir = await InsuranceTerm(65,'male');
    console.log(ir);
    res.status(200).send({ "insurance_rating": ir });

});
module.exports = router;