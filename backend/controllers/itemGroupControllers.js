const asyncHandler = require("express-async-handler");
const Group = require("../Model/groupModel");
const Item = require("../Model/itemModel");

const addItemGroups = asyncHandler(async (req, res) => {
  const { groupName, groupImage } = req.body;

  if (!groupName || !groupImage) {
    return res.status(404).json("Mandatory Fields Cannot be Empty");
  }

  //    already group exists
  const groupExists = await Group.findOne({ groupName: groupName });

  if (groupExists) {
    return res.status(404).json(groupExists);
  }

  const items = await Item.find({ group: groupName });
  try {
    const group = await Group.create({
      groupName,
      groupImage,
      items: items,
    });
    res.status(200).json(group);
  } catch (err) {
    res.status(400).json(err);
  }
});

const listItemGroups = asyncHandler(async (req, res) => {
  const groups = await Group.find().populate("items");
  await groups.map(async (group) => {
    const items = await Item.find({ group: group.groupName });
     await Group.findOneAndUpdate(
      { groupName: group.groupName },
      { $set: { items: items } },
      { new: true }
    ).populate("items");
  });
  await res.send(groups);
});

module.exports = { addItemGroups, listItemGroups };
