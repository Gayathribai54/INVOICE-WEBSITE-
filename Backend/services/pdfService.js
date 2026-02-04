


import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const generatePDF = (invoice) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      // const dirPath = "uploads/invoices";
      //const __dirname = new URL('.', import.meta.url).pathname;

      //const dirPath = path.join(__dirname, "..", "..", "uploads", "invoices");

      const dirPath = path.join(
        process.cwd(),
        "uploads",
        "invoices"
      );

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // const filePath = path.join(
      //   dirPath,
      //   `invoice_${invoice._id}.pdf`
      // );

      const filePath = path.join(dirPath, `invoice_${invoice._id}.pdf`);
      doc.pipe(fs.createWriteStream(filePath));



      /* ======================
         HEADER
      ====================== */
      doc
        .fontSize(18)
        .text("INVOICE", { align: "center" })
        .moveDown(1);

      /* ======================
         INVOICE DATE
      ====================== */
      doc
        .fontSize(10)
        .text(`Invoice Date: ${invoice.invoiceDate}`)
        .moveDown(1);

      /* ======================
         BILLED TO / FROM TABLE
      ====================== */
      const startY = doc.y;
      const boxHeight = 60;

      doc.rect(50, startY, 250, boxHeight).stroke();
      doc.rect(300, startY, 250, boxHeight).stroke();

      doc
        .fontSize(10)
        .text("Billed To", 55, startY + 5)
        .text(invoice.billedTo.name, 55, startY + 25);

      doc
        .text("Billed From", 305, startY + 5)
        .text(invoice.billedFrom.name, 305, startY + 25);

      doc.moveDown(4);

      /* ======================
         DESCRIPTION TABLE
      ====================== */
      const tableTop = doc.y;

      doc.rect(50, tableTop, 350, 30).stroke();
      doc.rect(400, tableTop, 150, 30).stroke();

      doc
        .fontSize(10)
        .text("Description", 55, tableTop + 10)
        .text("Amount (INR)", 405, tableTop + 10);

      const rowY = tableTop + 30;

      doc.rect(50, rowY, 350, 40).stroke();
      doc.rect(400, rowY, 150, 40).stroke();

      doc
        .text(invoice.description, 55, rowY + 10, { width: 340 })
        .text(`₹ ${invoice.amount}`, 405, rowY + 10);

      /* ======================
         TOTAL
      ====================== */
      const totalY = rowY + 40;

      doc.rect(50, totalY, 350, 30).stroke();
      doc.rect(400, totalY, 150, 30).stroke();

      doc
        .text("Total", 55, totalY + 10)
        .text(`₹ ${invoice.amount}`, 405, totalY + 10);

      doc.moveDown(4);

      /* ======================
         BANK DETAILS
      ====================== */
      doc
        .fontSize(10)
        .text("All payments to be made on the below details:")
        .moveDown(0.5);

      const bankDetails = [
        ["Name", invoice.bankDetails.name],
        ["Account Number", invoice.bankDetails.accountNumber],
        ["IFSC", invoice.bankDetails.ifsc],
        ["Bank Name", invoice.bankDetails.bankName],
        ["PAN Number", invoice.bankDetails.panNumber],
      ];

      let bankY = doc.y;

      bankDetails.forEach(([label, value]) => {
        doc.rect(50, bankY, 250, 25).stroke();
        doc.rect(300, bankY, 250, 25).stroke();

        doc.text(label, 55, bankY + 8);
        doc.text(value, 305, bankY + 8);

        bankY += 25;
      });

      doc.end();
      resolve(filePath);
    } catch (err) {
      reject(err);
    }
  });
};

export default generatePDF;
