const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
const warehouseRoutes = require("./routes/warehouse-routes");
const inventoryRoutes = require("./routes/inventory-routes");

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Routes
app.use("/warehouses", warehouseRoutes);
app.use("/inventories", inventoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something happened!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
