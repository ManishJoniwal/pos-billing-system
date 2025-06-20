const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"] },
    price: Number,
    duration: String, // e.g., "30 min", "1 hr"
    salon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salon",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", serviceSchema);
