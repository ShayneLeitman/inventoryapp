const express = require("express");
const router = express.Router();
const itemModel = require("../models/inventoryitem");
const { body, validationResult } = require("express-validator");
const { Parser } = require("json2csv");

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

    //Check to see if an item was found.
    if (!item) {
      return res
        .status(404)
        .json({ errors: "Could not find item with id" + req.params.id });
    } else {
      return res.send(item);
    }
  } catch (error) {
    return res.status(500).send(error);
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
      return res.send(inventoryItem);
    } catch (error) {
      return res.status(500).send(error);
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
      return res.send(updatedItem);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
);

router.delete("/inventoryitem/delete/:id", async (req, res) => {
  try {
    const item = await itemModel.findByIdAndDelete(req.params.id);
    //Check to see if an item was found..
    if (!item) {
      return res
        .status(404)
        .json({ errors: "Could not find item with id" + req.params.id });
    } else {
      return res.send(item);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/delete", async (req, res) => {
  const itemIdsToDelete = req.body.deleteids;

  try {
    const deleteCount = await itemModel.deleteMany({ _id: itemIdsToDelete });
    return res.send(deleteCount);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/exportcsv", async (req, res) => {
  const itemIdsToExport = req.body.exportids;

  try {
    const exportItems = await itemModel.find({ _id: itemIdsToExport });
    if (exportItems && exportItems.length) {
      const headerFields = [
        "name",
        "description",
        "inventorycount",
        "category",
      ];

      const json2csvParser = new Parser({ fields: headerFields });
      const csv = json2csvParser.parse(exportItems);
      res.attachment("data.csv");
      res.status(200).send(csv);
    } else {
      return res
        .status(404)
        .json("No inventory items could be found with those ids.");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
