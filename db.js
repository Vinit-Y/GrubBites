const mongoose = require("mongoose");
const { db } = require("./models/pizzaModel");

var mongoURL = "mongodb://localhost:27017/GrubBites";
//"mongodb+srv://shindeanuja:Anuja1786@cluster0.jglejwo.mongodb.net/test";

const uri = "mongodb://localhost:27017/GrubBites";
//"mongodb+srv://shindeanuja:Anuja1786@cluster0.jglejwo.mongodb.net/test";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},
  (err) => {
    if (err) {
      console.error("Failed to connect to MongoDB:", err);
    } else {
      console.log("Connected to MongoDB...");
    }
});

// Check connection status
const dbConnection = mongoose.connection;
dbConnection.on("error", console.error.bind(console, "MongoDB connection error:"));
dbConnection.once("open", () => {
  console.log("MongoDB connected successfully!");
});

module.exports = db;
