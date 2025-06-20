const customerModel = require("../models/customerModel");

// Add customer
exports.addCustomer = async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).send({ message: "Name and phone are required" });
    }

    // Check if customer already exists for this salon
    const existing = await customerModel.findOne({
      phone,
      salon: req.user.salon,
    });
    if (existing) {
      return res.status(400).send({
        message: "Customer with this phone number already exists",
        customer: existing,
      });
    }
    const customer = await customerModel.create({
      name,
      phone,
      isRepeat: !!existing,
      salon: req.user.salon,
    });
    res.status(201).send({
      message: "Customer added successfully",
      customer,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error adding customer", error: err.message });
  }
};

// Get all customers for current user's salon
exports.getCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find({ salon: req.user.salon }).sort({
      createdAt: -1,
    });
    res.status(200).send({
      message: "Customers fetched successfully",
      customers,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error fetching customers", error: err.message });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).send({ message: "Name and phone are required" });
    }
    const updated = await customerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updated)
      return res.status(404).send({ message: "Customer not found" });
    res.status(200).send({
      message: "Customer updated successfully",
      customer: updated,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error updating customer", error: err.message });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const deleted = await customerModel.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).send({ message: "Customer not found" });
    res.status(200).send({ message: "Customer deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error deleting customer", error: err.message });
  }
};
