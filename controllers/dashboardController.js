const invoiceModel = require("../models/invoiceModel");

exports.getDashboardStats = async (req, res) => {
  try {
    const role = req.user.role;
    const filter = {};

    // Admin sees all invoices
    if (role === "manager" || role === "cashier") {
      filter.salon = req.user.salon;
    }

    // Limit cashier to today’s sales only
    if (role === "cashier") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      filter.createdAt = { $gte: today, $lt: tomorrow };
    }

    const invoices = await invoiceModel.find(filter);

    const totalSales = invoices.reduce((sum, inv) => sum + inv.finalAmount, 0);
    const totalBills = invoices.length;

    res.json({
      role,
      totalBills,
      totalSales,
      message: `Dashboard stats for ${role}`
    });
  } catch (err) {
    res.status(500).send({ message: "Dashboard error", error: err.message });
  }
};
