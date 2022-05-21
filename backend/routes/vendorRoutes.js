const express = require("express");
const { listVendors, addVendors } = require("../controllers/vendorControllers");
const router = express.Router();

router.route("/").get(listVendors);
router.route("/add").post(addVendors);

module.exports = router;
