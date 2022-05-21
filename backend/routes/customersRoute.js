const express = require("express");
const {
  listCustomers,
  addCustomer,
} = require("../controllers/customerControllers");
const router = express.Router();

router.route("/").get(listCustomers);
router.route("/add").post(addCustomer);

module.exports = router;
