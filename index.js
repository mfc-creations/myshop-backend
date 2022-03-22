const express = require("express");
const db = require("./src/models");
const cors = require("cors");

const userRoutes = require("./src/routes/auth.route");
const productRoutes = require("./src/routes/product.route.js");
const checkoutRoutes = require("./src/routes/checkout.route.js");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/checkout", checkoutRoutes);

const port = process.env.PORT | 5000;
db.sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => console.log("Server running on port", port));
});
