const express = require("express");
const { addItem, listItems, fetchItemDetails } = require("../controllers/itemControllers");
const router = express.Router();

router.route('/').get(listItems)
router.route("/add").post(addItem);
router.route("/itemDetails").get(fetchItemDetails)
module.exports = router;
