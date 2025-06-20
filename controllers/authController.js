const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { name, email, password, role, salon } = req.body;
    //validation
    if (!name || !email || !password || !role) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    // chekc user
    const exisiting = await userModel.findOne({ email });
    if (exisiting) {
      return res.status(400).send({
        success: false,
        message: "Email Already Registerd please Login",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create new user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      salon,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

// LOGINk
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validfatuion
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please PRovide EMail OR Password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //check user password  | compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // token
    const token = JWT.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
