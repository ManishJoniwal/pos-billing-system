const employeeModel = require("../models/employeeModel");

// Add customer
exports.addEmployee = async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;
    if (!name || !phone || !email || !address) {
      return res.status(400).send({ message: "Please provide all fields" });
    }

    // Check if customer already exists for this salon
    const existing = await employeeModel.findOne({
      email,
      phone,
      salon: req.user.salon,
    });
    if (existing) {
      return res.status(400).send({
        message: "Employee with this phone number already exists",
        employee: existing,
      });
    }
    const employee = await employeeModel.create({
      name,
      phone,
      email,
      address,
      salon: req.user.salon,
      isRepeat: !!existing,
      salon: req.user.salon,
    });
    res.status(201).send({
      message: "Employee added successfully",
      employee,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error in adding Employee", error: err.message });
  }
};

// Get all customers for current user's salon
exports.getEmployee = async (req, res) => {
  try {
    const employees = await employeeModel.find({ salon: req.user.salon }).sort({
      createdAt: -1,
    });
    res.status(200).send({
      message: "Employee fetched successfully",
      employees,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error in get employee", error: err.message });
  }
};

// Update customer
exports.updateEmployee = async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;
    if (!name || !phone || !email || !address) {
      return res.status(400).send({ message: "Please provide all fields" });
    }
    const updated = await employeeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updated)
      return res.status(404).send({ message: "Employee not found" });
    res.status(200).send({
      message: "Employee updated successfully",
      customer: updated,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error  in updating employee", error: err.message });
  }
};

// Delete customer
exports.deleteEmployee = async (req, res) => {
  try {
    const deleted = await employeeModel.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).send({ message: "Employee not found" });
    res.status(200).send({ message: "Employee deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error in deleting Employee", error: err.message });
  }
};
