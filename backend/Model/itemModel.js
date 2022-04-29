const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
    {
        id:String,
    itemName: String,
    image: String,
    unit: Number,
    weight: Number,
    height: Number,
    width: Number,
    manufacturer: String,
    group: String,
    brand: String,
    sellingPrice: Number,
    costPrice: Number,
    openingStock: Number,
    reorderPoint: Number,
    vendor: String,
    description: String
    }
);

const Item = mongoose.model("Item" , itemSchema);
module.exports = Item