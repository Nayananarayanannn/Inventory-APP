const mongoose = require("mongoose");

const purchaseOrdersSchema = mongoose.Schema({
  purchaseNumber: Number,
  itemName: String,
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  unit: Number,
  mode: String,
  price: Number,
  purchaseDate: String
});

const PurchaseOrders = mongoose.model("PurchaseOrders", purchaseOrdersSchema);
module.exports = PurchaseOrders;
