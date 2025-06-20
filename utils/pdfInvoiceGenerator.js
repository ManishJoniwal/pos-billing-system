const PDFDocument = require("pdfkit");

exports.generateInvoicePDF = (invoice, stream) => {
  const doc = new PDFDocument({ margin: 40 });

  doc.pipe(stream);

  doc.fontSize(20).text("Salon POS Invoice", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Invoice ID: ${invoice._id}`);
  doc.text(`Date: ${new Date(invoice.createdAt).toLocaleString()}`);
  doc.text(`Customer: ${invoice.customer.name}`);
  doc.text(`Cashier: ${invoice.user.name}`);
  doc.moveDown();

  doc.fontSize(16).text("Items:");
  doc.moveDown(0.5);

  invoice.items.forEach((item, index) => {
    doc.fontSize(12).text(`${index + 1}. ${item.name} (${item.type}) - ₹${item.price} x ${item.quantity}`);
  });

  doc.moveDown();
  doc.fontSize(14).text(`Subtotal: ₹${invoice.totalAmount}`);
  doc.text(`GST: ₹${invoice.gst}`);
  doc.text(`Discount: ₹${invoice.discount}`);
  doc.text(`Final Amount: ₹${invoice.finalAmount}`);
  doc.text(`Payment Mode: ${invoice.paymentMode}`);

  doc.end();
};
