const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const noteModel = require("./models/note.model");

const app = express();
app.use(express.json());
app.use(cors());
const notes = [];

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await noteModel.create({ title, description });
  res.status(201).json({
    message: "Note Created Successfully",
    note,
  });
});

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes Fetched Succesfully",
    notes,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  let id = req.params.id;
  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Notes Deleted Succesfully",
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description, title } = req.body;
  await noteModel.findByIdAndUpdate(id, {
    description,
    title,
  });

  res.status(200).json({
    message: "Notes Updated Succesfully",
  });
});

module.exports = app;
