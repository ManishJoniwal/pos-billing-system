const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"]},
    phone: { type: String, required: [true, "phone is required"] },
    isRepeat: { type: Boolean, default: false },
    salon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salon",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
