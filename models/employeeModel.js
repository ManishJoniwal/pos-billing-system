const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"]},
    phone: { type: String, required: [true, "phone is required"] },
    email: { type: String, required: [true, "email is required"], unique: true },   
    address: { type: String, required: [true, "address is required"] },
    salon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salon",
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
