const asynchandler = require("express-async-handler");
const vendorCredits = require("../Model/vendorCreditsModel");

const listVendorCredits = asynchandler(async (req, res) => {
  const credits = await vendorCredits.find();
  console.log(credits);
  res.send(credits);
});

const addVendorCredits = asynchandler(async (req, res) => {
  const { vendorName, refNumber, unit, itemName, price } = req.body;

  if (!vendorName || !refNumber || !unit || !itemName || !price) {
    return res.status(404).json("Fields Cannot be empty");
  }

  try {
    const credits = await vendorCredits.create({
      vendorName,
      refNumber,
      unit,
      itemName,
      price,
    });
    res.status(200).json(credits);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports ={ listVendorCredits, addVendorCredits}