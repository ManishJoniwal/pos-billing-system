const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "manager", "cashier"],
      default: "cashier",
    },
    salon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salon",
      default: null,
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("User", userSchema);
