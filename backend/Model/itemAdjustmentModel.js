const mongoose = require("mongoose");

const itemAdjustmentSchema = mongoose.Schema({
  id: String,
  mode: String,
  refNumber: String,
  date: String,
  reason: String,
  description: String,
  details: String,
});

const Adjustment = mongoose.model("Adjustment", itemAdjustmentSchema);
module.exports = Adjustment;
