
import nodemailer from "nodemailer";

const sendEmail = async (invoice) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: invoice.billedTo.email,
    subject: "Invoice",
    text: "Please find attached invoice",
    attachments: [
      {
        filename: "invoice.pdf",
        path: invoice.pdfPath,
      },
    ],
  });
};

export default sendEmail;
