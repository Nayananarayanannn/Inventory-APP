const express = require("express");
const { addItem, listItems } = require("../controllers/itemControllers");
const router = express.Router();

router.route('/').get(listItems)
router.route("/add").post(addItem);
module.exports = router;
