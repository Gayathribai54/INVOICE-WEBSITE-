


import nodemailer from "nodemailer";

const sendEmail = async (invoice) => {
  console.log(process.env.EMAIL);
  console.log(process.env.EMAIL_PASS);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // MUST be false for 587
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
  console.log("sent email successfully")
};

export default sendEmail;
