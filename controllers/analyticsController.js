const invoiceModel = require("../models/invoiceModel");
const invoiceItemModel = require("../models/invoiceItemModel");
const mongoose = require("mongoose");

exports.getSalesSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let match = {
      salon: req.user.salon
    };

    if (startDate && endDate) {
      match.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // DEBUG: Check what query is running
    // console.log("MATCH FILTER:", match);

    const invoices = await invoiceModel.find(match);

    if (invoices.length === 0) {
      return res.json({
        totalInvoices: 0,
        totalSales: 0,
        totalGST: 0,
        totalDiscount: 0
      });
    }

    // ✅ Now compute totals manually
    const totals = invoices.reduce(
      (acc, inv) => {
        acc.totalInvoices += 1;
        acc.totalSales += inv.finalAmount;
        acc.totalGST += inv.gst;
        acc.totalDiscount += inv.discount;
        return acc;
      },
      {
        totalInvoices: 0,
        totalSales: 0,
        totalGST: 0,
        totalDiscount: 0
      }
    );

    res.json(totals);
  } catch (err) {
    res.status(500).json({ message: "Summary error", error: err.message });
  }
};


// 📌 Sales by Cashier/Manager (user)
exports.getSalesByUser = async (req, res) => {
  try {
    const result = await invoiceModel.aggregate([
      { $match: { salon: new mongoose.Types.ObjectId(req.user.salon) } },
      {
        $group: {
          _id: "$user",
          totalBilled: { $sum: "$finalAmount" },
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          name: "$user.name",
          email: "$user.email",
          totalBilled: 1,
          count: 1,
        },
      },
    ]);

    res.send(result);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error fetching user-wise sales", error: err.message });
  }
};

// 📌 Top Services/Products
exports.getTopItems = async (req, res) => {
  try {
    const result = await invoiceItemModel.aggregate([
      {
        $group: {
          _id: { name: "$name", type: "$type" },
          totalSold: { $sum: "$quantity" },
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 10 },
    ]);

    res.send(result);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error fetching top items", error: err.message });
  }
};
