const asyncHandler = require('express-async-handler');
const Item = require('../Model/itemModel');
const Orders = require('../Model/purchaseOrder')

const listPurchaseOrders = asyncHandler( async(req,res) => {
    const orders = await Orders.find().populate("items");
    res.send(orders);
});

const addPurchaseOrders = asyncHandler( async(req,res) => {
    const { purchaseNumber, mode, itemName, unitItem, price, purchaseDate } = req.body;

     if (!purchaseNumber || !mode || !itemName || !unitItem || !price || !purchaseDate) {
       return res.status(404).json("Fields Cannot be empty");
     }
     
     const items = await Item.find({itemName:itemName}).populate();
     const update = await Item.findOneAndUpdate({itemName:itemName},{$inc:{unit:-unitItem}})
    try{
        const purchaseOrder = await Orders.create({
          purchaseNumber,
          itemName,
          unit:unitItem,
          mode,
          price,
          items,
          purchaseDate
        });
        res.status(200).json(purchaseOrder);
    }
    catch (err){
        res.status(404).json(err);
    }
})

module.exports = { listPurchaseOrders, addPurchaseOrders }