const express = require("express");
const { listVendorCredits, addVendorCredits } = require("../controllers/vendorCreditControllers");
const router = express.Router();

router.route("/").get(listVendorCredits);
router.route("/add").post(addVendorCredits);

module.exports = router;
