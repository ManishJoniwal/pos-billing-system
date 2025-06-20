const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  salon: { type: mongoose.Schema.Types.ObjectId, ref: "Salon" },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "InvoiceItem" }],
  totalAmount: Number,
  gst: Number,
  discount: Number,
  finalAmount: Number,
  paymentMode: { type: String, enum: ["cash", "card", "upi", "wallet"] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Invoice", invoiceSchema);
