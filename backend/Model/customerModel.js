const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  customerName: String,
  customerAddress: String,
  itemsPurchased: String,
  customerType: String,
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
