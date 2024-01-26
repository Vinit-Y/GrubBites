// Import necessary packages
const express = require("express");
const cors = require("cors");
const Pizza = require("./models/pizzaModel");

// Create an instance of Express
const app = express();
// Connect to the database
const db = require("./db.js");
// Set up middleware
app.use(express.json());
app.use(cors());
// Import necessary routes
const path = require("path");
const pizzasRoute = require("./routes/pizzasRoute");
const userRoute = require("./routes/userRoute");
const ordersRoute = require("./routes/ordersRoute");

// Set up routes
app.use("/api/pizzas", pizzasRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", ordersRoute);
console.log("Here", process.env.NODE_ENV);

// Serve static files in production environment

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  // Serve index.html for all other routes in production environment
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

// Set up and start server

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
