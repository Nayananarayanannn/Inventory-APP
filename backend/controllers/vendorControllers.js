const asyncHandler = require("express-async-handler");
const Item = require("../Model/itemModel");
const Vendor = require("../Model/vendorModel");

const listVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find().populate("items");
  await vendors.map(async (vendor) => {
    const items = await Item.find({ vendor: vendor.vendorName });

    await Vendor.findOneAndUpdate(
      { vendorName: vendor.vendorName },
      { $set: { items: items } },
      { new: true }
    ).populate("items");
  });
  await res.send(vendors);
});

const addVendors = asyncHandler(async (req, res) => {
  const { vendorName, vendorImage } = req.body;

  if (!vendorImage || !vendorName) {
    return res.status(404).json("Fields Cannot be empty");
  }

  const vendorExists = await Vendor.findOne({ vendorName: vendorName });

  if (vendorExists) {
    return res.status(404).json("Vendor with same name already added");
  }

  const items = await Item.find({ vendor: vendorName });
  try {
    const vendor = await Vendor.create({
      vendorName,
      vendorImage,
      items: items,
    });
    res.status(200).json(vendor);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = { listVendors, addVendors };
