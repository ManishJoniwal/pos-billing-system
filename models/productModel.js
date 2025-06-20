const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"] },
    price: Number,
    stock: Number,
    salon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salon"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
