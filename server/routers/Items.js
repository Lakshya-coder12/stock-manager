const moment = require("moment");
const express = require("express");
const router = express.Router();
const Item = require("../models/item");
const ObjectId = require("mongodb").ObjectId;

//Get all items

router.get("/fetchAllItems", async (req, res) => {
  try {
    const items = await Item.find({});
    if (!items) {
      console.log("Items not present");
      throw new String("No items present.");
    } else if (items.length == 0) {
      console.log("Items object is empty");
      throw new String("Items object is empty");
    } else {
      res.json(items);
    }
  } catch (err) {
    // throw new String(err);
    res.send("Error: " + err);
  }
});

//Fetch single item

router.get("/fetchOneItem/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      console.log("It is not a valid MongoDB id");
      throw new String("It is not a valid MongoDB id");
    }
    const item = await Item.findOne({ _id: req.params.id });
    if (!item) {
      console.log("Item not present");
      throw new String("Item not present");
    } else {
      res.json(item);
    }
  } catch (err) {
    // throw new String(err);
    res.send("Error: " + err);
  }
});

//Check stock of a particular item
// TODO Convert Error to String

router.get("/checkStockOfItem/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      console.log("It is not a valid MongoDB id");
      throw new String("It is not a valid MongoDB id");
    }
    const item = await Item.findOne(
      { _id: req.params.id },
      {
        stock: 1,
        _id: 0,
      }
    );
    if (!item) {
      console.log("Item doesn't exist");
      throw new String("Item doesn't exist");
    } else {
      res.json(item);
    }
  } catch (err) {
    res.send("Error: " + err);
  }
});

//Add a new item

router.post("/postOneItem", async (req, res) => {
  try {
    const currentTime = moment.now();
    if (
      !req.body.name ||
      typeof req.body.name !== "string" ||
      req.body.name.length == 0
    ) {
      throw new String("Name cannot be undefined and should be of type String");
    }
    if (
      !req.body.companyName ||
      typeof req.body.companyName !== "string" ||
      req.body.companyName.length == 0
    ) {
      throw new String(
        "Company Name cannot be undefined and should be of type String"
      );
    }
    if (!req.body.stock || typeof req.body.stock !== "number") {
      throw new String(
        "Stock cannot be undefined and should be of type number"
      );
    }
    const dataToBeSaved = {
      name: req.body.name,
      companyName: req.body.companyName,
      stock: req.body.stock,
      dateCreated: currentTime,
    };
    const createdItem = await Item.create(dataToBeSaved);
    if (createdItem && Object.keys(createdItem).length > 0) {
      res.json(createdItem);
    } else {
      throw new String("Item is undefined or field is empty");
    }
  } catch (err) {
    res.send("Error: " + err);
  }
});

//Delete a particular item

router.delete("/deleteItem/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      console.log("It is not a valid MongoDB id");
      throw new String("It is not a valid MongoDB id");
    }
    const deletedItem = await Item.deleteOne({ _id: req.params.id });
    if (deletedItem.acknowledged !== true || deletedItem.deletedCount !== 1) {
      console.log("Item was not deleted");
      throw new String("Item was not deleted");
    } else {
      res.json(deletedItem);
    }
  } catch (err) {
    res.send("Error: " + err);
  }
});

//Edit a particular item

router.patch("/editItem/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      console.log("It is not a valid MongoDB id");
      throw new String("It is not a valid MongoDB id");
    }
    const updatedStockValue = req.query.stock;
    const updatedName = req.query.name;
    const updatedCompanyName = req.query.companyName;
    let update = {};
    // check for updatedStockValue
    if (updatedStockValue) {
      if (typeof updatedStockValue === "string" && !isNaN(updatedStockValue)) {
        update.stock = updatedStockValue;
      } else {
        throw new String(
          "Stock value is not valid, should be of finite length and of type Number"
        );
      }
    }
    // check for updatedName
    if (updatedName) {
      if (typeof updatedName === "string" && updatedName.length > 0) {
        update.name = updatedName;
      } else {
        throw new String(
          "Name is not valid, should be of finite length and of type string"
        );
      }
    }
    // check for updatedCompanyName
    if (updatedCompanyName) {
      if (
        typeof updatedCompanyName === "string" &&
        updatedCompanyName.length > 0
      ) {
        update.name = updatedCompanyName;
      } else {
        throw new String(
          "CompanyName is not valid, should be of finite length and of type string"
        );
      }
    }
    const editedItem = await Item.updateOne(
      { _id: req.params.id },
      {
        $set: update,
      }
    );
    if (
      editedItem.acknowledged !== true ||
      editedItem.matchedCount !== 1 ||
      editedItem.modifiedCount !== 1
    ) {
      console.log("Item was not updated");
      throw new String("Item was not updated");
    } else {
      res.send(editedItem);
    }
  } catch (err) {
    res.send("Error: " + err);
  }
});

// Increment/Decrement stock value;

router.patch("/incrementOrDecrementStock/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      console.log("It is not a valid MongoDB id");
      throw new String("It is not a valid MongoDB id");
    }
    //TODO check for zero
    const item = await Item.findOne(
      { _id: req.params.id },
      {
        stock: 1,
        _id: 0,
      }
    );
    if (!item) {
      console.log("Item doesn't exist");
      throw new String("Item doesn't exist");
    }
    const incrementOrDecrementFactor = req.query.stock;
    if (
      !incrementOrDecrementFactor ||
      typeof incrementOrDecrementFactor !== "string" ||
      isNaN(incrementOrDecrementFactor)
    ) {
      throw new String(
        "Invalid increment/decrement value passed, only type Number is expected."
      );
    } else if (item.stock + parseInt(incrementOrDecrementFactor) < 0) {
      throw new String("Stock value cannot go below zero.");
    } else {
      const editedItem = await Item.updateOne(
        { _id: req.params.id },
        {
          $inc: {
            stock: parseInt(incrementOrDecrementFactor),
          },
        }
      );
      if (
        editedItem.acknowledged !== true ||
        editedItem.matchedCount !== 1 ||
        editedItem.modifiedCount !== 1
      ) {
        console.log("Item was not updated");
        throw new String("Item was not updated");
      } else {
        res.send(editedItem);
      }
    }
  } catch (err) {
    res.send("Error: " + err);
  }
});

module.exports = router;
