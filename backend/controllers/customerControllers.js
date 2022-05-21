const asyncHandler = require("express-async-handler");
const Customer = require('../Model/customerModel')

const listCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);;
});

const addCustomer = asyncHandler(async (req, res) => {
  const { customerName, customerAddress, itemsPurchased, customerType } = req.body;

  const customerExists = await Customer.findOne({ customerName: customerName });
  if (customerExists) {
    res.status(402).json("Customer already added");
  }

  const customer = await Customer.create({
   customerName,
   customerAddress,
   itemsPurchased,
   customerType
  });

  // on successful creation of new customer
  if (customer) {
    res.status(200).json({
      customerName:customer.customerName,
      customerAddress:customer.customerAddress,
      itemsPurchased:customer.itemsPurchased,
      customerType:customer.customerType,
    });
  } else {
    res.status(404).json("Failed to add customer");
  }
});

module.exports = { listCustomers, addCustomer };
