
import Invoice from "../models/Invoice.js";
import generatePDF from "../services/pdfService.js";
import sendEmail from "../services/emailService.js";

export const createInvoice = async (req, res) => {
  try {
    const data = req.body;
         console.log("after invoice request arrived")
    const invoice = new Invoice({
      invoiceDate: data.invoiceDate,
      billedTo: {
        name: data.billedToName,
        email: data.billedToEmail,
        address: data.billedToAddress,
      },
      billedFrom: {
        name: data.billedFromName,
        address: data.billedFromAddress,
      },
      description: data.description,
      amount: data.amount,
      total: data.amount,
      bankDetails: {
        name: data.bankName,
        accountNumber: data.accountNumber,
        ifsc: data.ifsc,
        bankName: data.bankName,
        panNumber: data.panNumber,
      },
    });
    console.log("after invoice variable assigned")
    await invoice.save();
        console.log("after invoice saved")

    const pdfPath = await generatePDF(invoice);
    invoice.pdfPath = pdfPath;
    await invoice.save();
         console.log("after invoice pdf saved")

    await sendEmail(invoice);
        console.log("sent email success")

    res.status(201).json({ message: "Invoice created and emailed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
