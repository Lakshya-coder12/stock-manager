const express = require("express");
const router = express.Router();
const Item = require("../models/item");
const ObjectId = require("mongodb").ObjectId;
const { body, validationResult, param, query } = require("express-validator");
const requireLogin = require("../middleware/requireLogin");

//Get all items

router.get("/fetchAllItems", requireLogin, async (req, res) => {
  try {
    const { _id } = req.userInfo;
    const items = await Item.find({ ownerId: _id }).sort({ _id: -1 });
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
    res.status(400).send("Error: " + err);
  }
});

//Fetch single item

router.get(
  "/fetchOneItem/:id",
  requireLogin,
  param("id").custom((value) => {
    if (!ObjectId.isValid(value)) {
      throw new String("It is not a valid MongoDB id");
    }
    return true;
  }),
  async (req, res) => {
    try {
      // if (!ObjectId.isValid(req.params.id)) {
      //   console.log("It is not a valid MongoDB id");
      //   throw new String("It is not a valid MongoDB id");
      // }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const item = await Item.findOne({ _id: req.params.id });
      if (!item) {
        console.log("Item not present");
        throw new String("Item not present");
      } else {
        res.json(item);
      }
    } catch (err) {
      // console.log(err);
      res.status(400).send("Error: " + err);
    }
  }
);

//Check stock of a particular item

router.get(
  "/checkStockOfItem/:id",
  requireLogin,
  param("id").custom((value) => {
    if (!ObjectId.isValid(value)) {
      throw new String("It is not a valid MongoDB id");
    }
    return true;
  }),
  async (req, res) => {
    try {
      // if (!ObjectId.isValid(req.params.id)) {
      //   console.log("It is not a valid MongoDB id");
      //   throw new String("It is not a valid MongoDB id");
      // }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
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
      res.status(400).send("Error: " + err);
    }
  }
);

//Add a new item

router.post(
  "/postOneItem",
  requireLogin,
  body("name")
    .not()
    .isEmpty()
    .withMessage("name cannot be undefined")
    .isString()
    .withMessage("name should be of type String")
    .trim(),
  body("companyName")
    .not()
    .isEmpty()
    .withMessage("companyName cannot be undefined")
    .isString()
    .withMessage("companyName should be of type String")
    .trim(),
  body("stock")
    .not()
    .isEmpty()
    .withMessage("stock cannot be undefined")
    .isInt({ gt: 0 })
    .withMessage("stock should be of type number and should be more than zero")
    .trim(),
  async (req, res) => {
    try {
      const { _id } = req.userInfo;
      // const currentTime = moment.now();
      // if (
      //   !req.body.name ||
      //   typeof req.body.name !== "string" ||
      //   req.body.name.length == 0
      // ) {
      //   throw new String(
      //     "Name cannot be undefined and should be of type String"
      //   );
      // }
      // if (
      //   !req.body.companyName ||
      //   typeof req.body.companyName !== "string" ||
      //   req.body.companyName.length == 0
      // ) {
      //   throw new String(
      //     "Company Name cannot be undefined and should be of type String"
      //   );
      // }
      // if (
      //   !req.body.stock ||
      //   parseInt(req.body.stock) <= 0 ||
      //   typeof parseInt(req.body.stock) !== "number"
      // ) {
      //   throw new String(
      //     "Stock cannot be undefined and should be of type number and should be more than zero"
      //   );
      // }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const dataToBeSaved = {
        name: req.body.name,
        companyName: req.body.companyName,
        stock: req.body.stock,
        ownerId: _id,
      };
      const createdItem = await Item.create(dataToBeSaved);
      if (createdItem && Object.keys(createdItem).length > 0) {
        res.json(createdItem);
      } else {
        throw new String("Item is undefined or field is empty");
      }
    } catch (err) {
      res.status(400).send("Error: " + err);
    }
  }
);

//Delete a particular item

router.delete(
  "/deleteItem/:id",
  requireLogin,
  param("id").custom((value) => {
    if (!ObjectId.isValid(value)) {
      throw new String("It is not a valid MongoDB id");
    }
    return true;
  }),
  async (req, res) => {
    try {
      // if (!ObjectId.isValid(req.params.id)) {
      //   console.log("It is not a valid MongoDB id");
      //   throw new String("It is not a valid MongoDB id");
      // }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const deletedItem = await Item.deleteOne({ _id: req.params.id });
      if (deletedItem.acknowledged !== true || deletedItem.deletedCount !== 1) {
        console.log("Item was not deleted");
        throw new String("Item was not deleted");
      } else {
        res.json(deletedItem);
      }
    } catch (err) {
      res.status(400).send("Error: " + err);
    }
  }
);

//Edit a particular item

router.patch(
  "/editItem/:id",
  requireLogin,
  param("id").custom((value) => {
    if (!ObjectId.isValid(value)) {
      throw new String("It is not a valid MongoDB id");
    }
    return true;
  }),
  query("stock")
    .not()
    .isEmpty()
    .withMessage("stock cannot be undefined")
    .isInt({ gt: 0 })
    .withMessage("stock should be of type number and should be more than zero")
    .trim(),
  query("name")
    .not()
    .isEmpty()
    .withMessage("name cannot be undefined")
    .isString()
    .withMessage("name should be of type String")
    .trim(),
  query("companyName")
    .not()
    .isEmpty()
    .withMessage("companyName cannot be undefined")
    .isString()
    .withMessage("companyName should be of type String")
    .trim(),
  async (req, res) => {
    try {
      // if (!ObjectId.isValid(req.params.id)) {
      //   console.log("It is not a valid MongoDB id");
      //   throw new String("It is not a valid MongoDB id");
      // }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const updatedStockValue = req.query.stock;
      const updatedName = req.query.name;
      const updatedCompanyName = req.query.companyName;
      let update = {};
      update.stock = updatedStockValue;
      update.name = updatedName;
      update.companyName = updatedCompanyName;
      // check for updatedStockValue
      // if (updatedStockValue) {
      //   if (
      //     typeof updatedStockValue === "string" &&
      //     !isNaN(updatedStockValue) &&
      //     parseInt(updatedStockValue) > 0
      //   ) {
      //     update.stock = updatedStockValue;
      //   } else {
      //     throw new String(
      //       "Stock value is not valid, should be of finite length and of type Number and greater than zero"
      //     );
      //   }
      // }
      // // check for updatedName
      // if (updatedName) {
      //   if (typeof updatedName === "string" && updatedName.length > 0) {
      //     update.name = updatedName;
      //   } else {
      //     throw new String(
      //       "Name is not valid, should be of finite length and of type string"
      //     );
      //   }
      // }
      // // check for updatedCompanyName
      // if (updatedCompanyName) {
      //   if (
      //     typeof updatedCompanyName === "string" &&
      //     updatedCompanyName.length > 0
      //   ) {
      //     update.companyName = updatedCompanyName;
      //   } else {
      //     throw new String(
      //       "CompanyName is not valid, should be of finite length and of type string"
      //     );
      //   }
      // }
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
        console.log(
          editedItem.acknowledged +
            " " +
            editedItem.matchedCount +
            " " +
            editedItem.modifiedCount
        );
        console.log("Item was not updated");
        throw new String("Item was not updated");
      } else {
        res.send(editedItem);
      }
    } catch (err) {
      res.status(400).send("Error: " + err);
    }
  }
);

// Increment/Decrement stock value;

router.patch(
  "/incrementOrDecrementStock/:id",
  requireLogin,
  param("id").custom((value) => {
    if (!ObjectId.isValid(value)) {
      throw new String("It is not a valid MongoDB id");
    }
    return true;
  }),
  query("stock")
    .not()
    .isEmpty()
    .withMessage("stock cannot be undefined")
    .isInt({ gt: 0 })
    .withMessage("stock should be of type number and should be more than zero")
    .trim()
    .custom(async (value, { req }) => {
      const item = await Item.findOne(
        { _id: req.params.id },
        {
          stock: 1,
          _id: 0,
        }
      );
      if (!item) {
        throw new String("Item doesn't exist");
      }
      if (item.stock + value < 0) {
        throw new String("Stock value cannot go below zero.");
      }
    }),
  async (req, res) => {
    try {
      // if (!ObjectId.isValid(req.params.id)) {
      //   console.log("It is not a valid MongoDB id");
      //   throw new String("It is not a valid MongoDB id");
      // }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // const item = await Item.findOne(
      //   { _id: req.params.id },
      //   {
      //     stock: 1,
      //     _id: 0,
      //   }
      // );
      // if (!item) {
      //   console.log("Item doesn't exist");
      //   throw new String("Item doesn't exist");
      // }
      const incrementOrDecrementFactor = req.query.stock;
      // if (
      //   !incrementOrDecrementFactor ||
      //   typeof incrementOrDecrementFactor !== "string" ||
      //   isNaN(incrementOrDecrementFactor)
      // ) {
      //   throw new String(
      //     "Invalid increment/decrement value passed, only type Number is expected."
      //   );
      // } else if (item.stock + parseInt(incrementOrDecrementFactor) < 0) {
      //   throw new String("Stock value cannot go below zero.");
      // } else {
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
        return res.status(200).json({
          success: true,
        });
      }
      // }
    } catch (err) {
      res.status(400).send("Error: " + err);
    }
  }
);

module.exports = router;
