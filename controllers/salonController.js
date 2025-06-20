const salonModel = require("../models/salonModel");

// Create a new salon
exports.createSalon = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    // validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "please provide name",
      });
    }
    const newSalon = new salonModel({
      name,
      address,
      phone,
    });

    await newSalon.save();
    res.status(201).send({
      success: true,
      message: "New Salon Created successfully",
      newSalon,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Salon api",
      error: error.message,
    });
  }
};

// Get all salons
exports.getAllSalons = async (req, res) => {
  try {
    const salons = await salonModel.find({});
    if (!salons) {
      return res.status(404).send({
        success: false,
        message: "No salons found",
      });
    }
    res.status(200).send({
      success: true,
      totalCat: salons.length,
      salons,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in get all salons api",
      error,
    });
  }
};

// Get a single salon
exports.getSalonById = async (req, res) => {
  try {
    const salon = await salonModel.findById(req.params.id);
    if (!salon) return res.status(404).send({ message: "Salon not found" });
    res.send(salon);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error fetching salon", error: err.message });
  }
};

// Update a salon
exports.updateSalon = async (req, res) => {
  try {
    const updateSalon = await salonModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateSalon) {
      return res.status(404).send({
        success: false,
        message: "No salon Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "salon Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update salon api",
      error,
    });
  }
};

// Delete a salon
exports.deleteSalon = async (req, res) => {
  try {
    const salon = await salonModel.findById(req.params.id);
    if (!salon)
      return res
        .status(404)
        .send({ success: false, message: "Salon not found" });

    await salonModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send({ success: true, message: "Salon deleted successfully" });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "error in Delete Cat APi",
      error,
    });
  }
};
