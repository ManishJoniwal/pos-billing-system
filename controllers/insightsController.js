const invoiceModel = require("../models/invoiceModel");
const customerModel = require("../models/customerModel");
const mongoose = require("mongoose");

exports.getMonthlyActiveBuyers = async (req, res) => {
  try {
    const { month, year } = req.query;

    const start = new Date(`${year}-${month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const buyers = await invoiceModel.distinct("customer", {
      salon: req.user.salon,
      createdAt: { $gte: start, $lt: end }
    });

    res.send({ activeBuyersCount: buyers.length });
  } catch (err) {
    res.status(500).send({ message: "Error fetching monthly active buyers", error: err.message });
  }
};

exports.getRepeatVsNew = async (req, res) => {
  try {
    const customers = await customerModel.find({ salon: req.user.salon });

    const repeat = customers.filter(c => c.isRepeat).length;
    const total = customers.length;
    const fresh = total - repeat;

    res.send({ total, repeat, new: fresh });
  } catch (err) {
    res.status(500).send({ message: "Error fetching customer loyalty data", error: err.message });
  }
};

exports.getAverageBillValue = async (req, res) => {
  try {
    const invoices = await invoiceModel.find({ salon: req.user.salon });

    const totalAmount = invoices.reduce((sum, inv) => sum + inv.finalAmount, 0);
    const average = invoices.length ? (totalAmount / invoices.length) : 0;

    res.json({ averageBillValue: average.toFixed(2) });
  } catch (err) {
    res.status(500).send({ message: "Error fetching average bill value", error: err.message });
  }
};

// ✅ Top 10 Loyal Customers
exports.getTopLoyalCustomers = async (req, res) => {
  try {
    const result = await invoiceModel.aggregate([
      { $match: { salon: new mongoose.Types.ObjectId(req.user.salon) } },
      {
        $group: {
          _id: "$customer",
          visits: { $sum: 1 },
          totalSpent: { $sum: "$finalAmount" }
        }
      },
      { $sort: { visits: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "_id",
          as: "customer"
        }
      },
      { $unwind: "$customer" },
      {
        $project: {
          name: "$customer.name",
          phone: "$customer.phone",
          visits: 1,
          totalSpent: 1
        }
      }
    ]);

    res.send(result);
  } catch (err) {
    res.status(500).send({ message: "Error fetching loyal customers", error: err.message });
  }
};
