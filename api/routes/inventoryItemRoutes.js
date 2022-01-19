const express = require("express");
const router = express.Router();
const itemModel = require("../models/inventoryitem");
const { body, validationResult } = require("express-validator");

router.get("/inventoryitems", async (req, res) => {
  const allItems = await itemModel.find({});

  try {
    res.send(allItems);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/inventoryitem/:id", async (req, res) => {
  try {
    const item = await itemModel.findById(req.params.id);
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post(
  "/inventoryitem",
  body("name").isString().exists({ checkNull: true }).notEmpty(),
  body("description").isString().isLength({ max: 300 }),
  body("inventorycount")
    .exists({ checkNull: true })
    .notEmpty()
    .isInt({ min: 0 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const itemObj = {
      name: req.body.name,
      description: req.body.description,
      inventorycount: req.body.inventorycount,
    };

    if (req.body.hasOwnProperty("category")) {
      itemObj.category = req.body.category;
    } else {
      itemObj.category = "";
    }

    const inventoryItem = new itemModel(req.body);

    try {
      await inventoryItem.save();
      console.log(inventoryItem);
      res.send(inventoryItem);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

router.put(
  "/update/inventoryitem/:id",
  body("name").isString().exists({ checkNull: true }).notEmpty(),
  body("description").isString().isLength({ max: 300 }),
  body("inventorycount")
    .exists({ checkNull: true })
    .notEmpty()
    .isInt({ min: 0 }),

  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const itemObj = {
        name: req.body.name,
        description: req.body.description,
        inventorycount: req.body.inventorycount,
      };
  
      if (req.body.hasOwnProperty("category")) {
        itemObj.category = req.body.category;
      } else {
        itemObj.category = "";
      }

    try {
      const updatedItem = await itemModel.findByIdAndUpdate(
        req.params.id,
        itemObj,
        { new: true }
      );
      console.log(updatedItem);
      res.send(updatedItem);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

router.delete("/inventoryitem/delete/:id", async (req, res) => {
    try {
      const item = await itemModel.findByIdAndDelete(req.params.id);
      res.send(item);
    } catch (error) {
      res.status(500).send(error);
    }
});

router.delete("/delete", async (req, res) => {

  const itemIdsToDelete = req.body.deleteids;

  try {
    await itemModel.deleteMany({_id: itemIdsToDelete});
    res.send("success");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
