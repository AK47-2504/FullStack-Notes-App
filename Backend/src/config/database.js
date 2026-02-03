const mongoose = require("mongoose");
require("dotenv").config();

function connectToDb() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database Connected");
  });
}

module.exports = connectToDb;
