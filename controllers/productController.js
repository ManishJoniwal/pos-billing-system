const productModel = require("../models/productModel");

exports.addProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    if (!name || !price || stock === undefined) {
      return res
        .status(400)
        .send({ message: "Name, price, and stock are required" });
    }
    // Check if product already exists for this salon
    const existing = await productModel.findOne({
      name,
      salon: req.user.salon,
    });
    if (existing) {
      return res.status(400).send({
        message: "Product with this name already exists",
        product: existing,
      });
    }
    const product = await productModel.create({
      name,
      price,
      stock,
      salon: req.user.salon,
    });
    res.status(201).send({ message: "Product added successfully", product });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error adding product", error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await productModel.find({ salon: req.user.salon });
    res.status(200).send({
      message: "Products fetched successfully",
      count: products.length,
      products,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error fetching products", error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    if (!name || !price || stock === undefined) {
      return res
        .status(400)
        .send({ message: "Name, price, and stock are required" });
    }
    const updated = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).send({ message: "Product not found" });

    res.status(200).send({
      message: "Product updated successfully",
      product: updated,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error updating product", error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await productModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send({ message: "Product not found" });
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error deleting product", error: err.message });
  }
};
