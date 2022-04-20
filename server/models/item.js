const mongoose = require("mongoose");
const moment = require("moment");
const { ObjectId } = mongoose.Schema.Types;

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
  ownerId: {
    type: ObjectId,
    required: true,
  },
});

itemSchema.index({ companyName: 1 });

//other options other than save and what else we can do with pre and post hooks
itemSchema.pre("save", function (next) {
  if (this.isNew) {
    this.dateCreated = moment.now();
  }
  next();
});

module.exports = mongoose.model("item", itemSchema);
