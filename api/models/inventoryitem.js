const mongoose = require("mongoose");

const InventoryItemSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  description: {
      type: String,
      maxLength: 300
  },
  inventorycount: {
      type: Number,
      required: true,
  },
  category: {
      type: String
  }
});

const inventoryItem = mongoose.model("InventoryItem", InventoryItemSchema);

module.exports = inventoryItem;