const mongoose = require("mongoose");

const invoiceItemSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["service", "product"] },
  price: Number,
  quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model("InvoiceItem", invoiceItemSchema);
