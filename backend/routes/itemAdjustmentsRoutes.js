const express = require("express");
const { listItemAdjustments, addItemAdjustments } = require("../controllers/itemAdjustmentsControllers");
const router = express.Router();

router.route("/").get(listItemAdjustments);
router.route('/add').post(addItemAdjustments);

module.exports = router;
