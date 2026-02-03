const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
});

// Kuch bhi opoeration perform karna hai database mei tho model create karna hoga
const noteModel = mongoose.model("notes", noteSchema);
module.exports = noteModel;
