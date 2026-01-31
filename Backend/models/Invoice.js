
import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceDate: Date,

    billedTo: {
      name: String,
      email: String,
      address: String,
    },

    billedFrom: {
      name: String,
      address: String,
    },

    description: String,
    amount: Number,
    total: Number,

    bankDetails: {
      name: String,
      accountNumber: String,
      ifsc: String,
      bankName: String,
      panNumber: String,
    },

    pdfPath: String,
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);
