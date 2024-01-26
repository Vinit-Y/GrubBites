const mongoose = require("mongoose");
const { db } = require("./models/pizzaModel");

var mongoURL = "mongodb://localhost:27017/GrubBites";
//"mongodb+srv://shindeanuja:Anuja1786@cluster0.jglejwo.mongodb.net/test";

const uri = "mongodb://localhost:27017/GrubBites";
//"mongodb+srv://shindeanuja:Anuja1786@cluster0.jglejwo.mongodb.net/test";
mongoose.connect(uri, (err) => {
  if (err) throw err;
  console.log("connected...");
});

module.exports = db;
