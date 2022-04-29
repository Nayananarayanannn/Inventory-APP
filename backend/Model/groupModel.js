const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  groupName: String,
  groupImage: String,
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});
const Group = mongoose.model("Group", groupSchema);
module.exports = Group;