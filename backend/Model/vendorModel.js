const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema({
  vendorName: String,
  vendorImage: String,
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});
const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
