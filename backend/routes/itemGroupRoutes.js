const express = require("express");
const { addItemGroups, listItemGroups } = require("../controllers/itemGroupControllers");
const router = express.Router();

router.route("/").get(listItemGroups);
router.route('/add').post(addItemGroups);

module.exports = router;
