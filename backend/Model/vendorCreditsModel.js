const mongoose = require("mongoose");

const vendorCreditsSchema = mongoose.Schema({
  vendorName: String,
  refNumber: String,
  itemName:String,
  unit:Number,
  price:Number
});

const VendorCredits = mongoose.model("VendorCredits", vendorCreditsSchema);
module.exports = VendorCredits;
