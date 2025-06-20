const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  invoice: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice", required: true },
  amount: { type: Number, required: true },
  method: {
    type: String,
    enum: ["cash", "card", "upi", "wallet"],
    required: true
  },
  referenceId: { type: String }, // UPI/CARD txn ID if any
},
{timestamps: true} // Automatically manage createdAt and updatedAt fields
);

module.exports = mongoose.model("Payment", paymentSchema);
