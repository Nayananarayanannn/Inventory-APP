const asyncHandler = require("express-async-handler");
const ItemAdjustments = require("../Model/itemAdjustmentModel")

const listItemAdjustments = asyncHandler( async (req,res) => {
    const adjustments = await ItemAdjustments.find();
    res.send(adjustments);
});

const addItemAdjustments = asyncHandler( async (req,res) => {
    const {
      id,
      mode,
      refNumber,
      date,
      reason,
      description,
      details,
    } = req.body;

    const idExists = await ItemAdjustments.findOne({ id: id });
    if(idExists) {
        res.status(402).json("Id is not Unique");
    }

    const adjustment = await ItemAdjustments.create({
      id,
      mode,
      refNumber,
      date,
      reason,
      description,
      details,
    });

    // on successful creation of new adjustment
    if(adjustment) {
        res.status(200).json({
          id: adjustment.id,
          mode: adjustment.mode,
          refNumber: adjustment.refNumber,
          date: adjustment.date,
          reason: adjustment.reason,
          description: adjustment.description,
          details: adjustment.details,
        });
    }
    else {
        res.status(404).json("Failed to create the adjustment");
    }
})

module.exports = { listItemAdjustments, addItemAdjustments };