const asyncHandler = require("express-async-handler");
const Item = require("../Model/itemModel");

const addItem = asyncHandler(async (req, res) => {
  const {
    id,
    itemName,
    unit,
    weight,
    height,
    width,
    manufacturer,
    group,
    brand,
    sellingPrice,
    costPrice,
    openingStock,
    reorderPoint,
    vendor,
    description,
    image,
  } = req.body;

  //   find particular item id exists
  const idExists = await Item.findOne({ id: id });
  if (idExists) {
   return res.status(402).json("Id is not unique");
  }

  const itemExists = await Item.findOne({
    itemName: itemName,
  });
  //  validate if item already exists
  if (itemExists) {
   return res.status(401).json("Item Already exists");
  }

  const item = await Item.create({
    id,
    itemName,
    unit,
    weight,
    height,
    width,
    manufacturer,
    group,
    brand,
    sellingPrice,
    costPrice,
    openingStock,
    reorderPoint,
    vendor,
    description,
    image,
  });

  // on successful creation of new item document send it
  if (item) {
    res.status(201).json({
      _id: item._id,
      id: item.id,
      itemName: item.itemName,
      unit: item.unit,
      weight: item.weight,
      height: item.height,
      width: item.width,
      manufacturer: item.manufacturer,
      group: item.group,
      brand: item.brand,
      sellingPrice: item.sellingPrice,
      costPrice: item.costPrice,
      openingStock: item.openingStock,
      reorderPoint: item.reorderPoint,
      vendor: item.vendor,
      description: item.description,
      image: item.image,
    });
  } else {
    res.status(404);
    throw new Error("Failed to create the Item");
  }
});

const listItems = asyncHandler(async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

const fetchItemDetails = asyncHandler(async (req, res) => {
  const { itemName } = req.body;
  const item = await Item.find({ itemName: itemName });
  if (item) {
    res.send(item);
  }
});

module.exports = { addItem, listItems,fetchItemDetails };
