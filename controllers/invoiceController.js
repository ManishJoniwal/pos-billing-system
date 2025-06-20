const invoiceModel = require("../models/invoiceModel");
const invoiceItemModel = require("../models/invoiceItemModel");
const paymentModel = require("../models/paymentModel");

exports.createInvoice = async (req, res) => {
  try {
    const { customerId, items, gst = 0, discount = 0, paymentMode, referenceId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).send({ message: "Invoice must include at least one item." });
    }

    // 1. Create invoice items
    const invoiceItems = await invoiceItemModel.insertMany(items); // each: {name, type, price, quantity}

    // 2. Calculate totals
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const finalAmount = total + gst - discount;

    // 3. Create invoice
    const invoice = await invoiceModel.create({
      customer: customerId,
      user: req.user._id,
      salon: req.user.salon,
      items: invoiceItems.map(item => item._id),
      totalAmount: total,
      gst,
      discount,
      finalAmount,
      paymentMode
    });

    // 4. Create payment record
    await paymentModel.create({
      invoice: invoice._id,
      amount: finalAmount,
      method: paymentMode,
      referenceId: referenceId || ""
    });

    res.status(201).send({
      message: "Invoice created successfully",
      invoice
    });
  } catch (err) {
    console.error("Error creating invoice:", err);
    res.status(500).send({
      message: "Failed to create invoice",
      error: err.message
    });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await invoiceModel.find({ salon: req.user.salon })
      .populate("customer user items")
      .sort({ createdAt: -1 });

    res.send(invoices);
  } catch (err) {
    res.status(500).send({ message: "Error fetching invoices", error: err.message });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await invoiceModel.findById(req.params.id)
      .populate("customer user items");

    if (!invoice) return res.status(404).send({ message: "Invoice not found" });

    res.send(invoice);
  } catch (err) {
    res.status(500).send({ message: "Error fetching invoice", error: err.message });
  }
};
