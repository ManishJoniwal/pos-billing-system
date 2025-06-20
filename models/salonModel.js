const mongoose = require("mongoose");

const salonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "salon name is required"],
    },
    address: String,
    phone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Salon", salonSchema);
