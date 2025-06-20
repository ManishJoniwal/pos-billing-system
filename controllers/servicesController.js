const serviceModel = require("../models/serviceModel");

exports.addService = async (req, res) => {
  try {
    const { name, price, duration } = req.body;
    if (!name) {
      return res.status(400).send({ message: "service name is required" });
    }
    const existing = await serviceModel.findOne({
      name,
      salon: req.user.salon,
    });
    if (existing) {
      return res.status(400).send({
        message: "service with this name already exists",
        service: existing,
      });
    }
    const service = await serviceModel.create({
      name,
      price,
      duration,
      salon: req.user.salon,
    });
    res.status(201).send({ " message": "Service added successfully", service });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error adding service", error: err.message });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await serviceModel.find({ salon: req.user.salon });
    if (!services || services.length === 0) {
      return res.status(404).send({ message: "No services found" });
    }
    res.status(200).send({
      message: "Services fetched successfully",
      count: services.length,
      services,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error fetching services", error: err.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { name, price, duration } = req.body;
    if (!name) {
      return res.status(400).send({ message: "Service name is required" });
    }
    const updated = await serviceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true, new: true }
    );
    if (!updated) return res.status(404).send({ message: "Service not found" });
    res.status(200).send({
      message: "Service updated successfully",
      service: updated,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating service", error: err.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const deleted = await serviceModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send({ message: "Service not found" });
    res.status(200).send({ message: "Service deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error deleting service", error: err.message });
  }
};
