const express = require('express');
const { listPurchaseOrders, addPurchaseOrders } = require('../controllers/purchaseOrdersController');
const router = express.Router();

router.route("/").get(listPurchaseOrders);
router.route("/add").post(addPurchaseOrders);

module.exports = router;