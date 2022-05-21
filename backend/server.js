const express = require("express");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const itemGroupRoutes = require("./routes/itemGroupRoutes");
const itemAdjustmentsRoutes = require("./routes/itemAdjustmentsRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const vendorCreditsRoutes = require("./routes/vendorCreditsRoutes");
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes");
const customersRoutes = require("./routes/customersRoute");

connectDB();
const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/item", itemRoutes);
app.use('/api/itemGroup', itemGroupRoutes);
app.use('/api/itemAdjustment', itemAdjustmentsRoutes);
app.use('/api/vendor',vendorRoutes);
app.use('/api/vendorCredits',vendorCreditsRoutes);
app.use('/api/purchaseOrders',purchaseOrderRoutes);
app.use('/api/customers',customersRoutes)


app.get(
  "/",
  asyncHandler(async (req, res) => {
    res.send("server running...");
  })
);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
