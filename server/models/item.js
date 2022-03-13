const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  dateCreated: {
    type: Number,
  },
  companyName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("item", itemSchema);
