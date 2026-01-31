

import { useState } from "react";
import "../styles/InvoiceForm.css";
import { createInvoice } from "../services/invoiceApi.js";

const InvoiceForm = () => {
    const [formData, setFormData] = useState({
        invoiceDate: "",
        billedToName: "",
        billedToEmail: "",
        billedToAddress: "",
        billedFromName: "",
        billedFromAddress: "",
        description: "",
        amount: "",
        bankName: "",
        accountNumber: "",
        ifsc: "",
        panNumber: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await createInvoice(formData);
            alert("Invoice generated and sent successfully!");
            console.log(res);
        } catch (err) {
            alert("Failed to generate invoice");
        }
    };

    return (
        <form className="invoice-form" onSubmit={handleSubmit}>
            <h2>Invoice</h2>

            <label>Invoice Date</label>
            <input type="date" name="invoiceDate" onChange={handleChange} />

            <div className="form-section">
                <h3>Billed To</h3>
                <input name="billedToName" placeholder="Client Name" onChange={handleChange} />
                <input name="billedToEmail" placeholder="Client Email" onChange={handleChange} />
                <textarea name="billedToAddress" placeholder="Client Address" onChange={handleChange} />
            </div>

            <div className="form-section">
                <h3>Billed From</h3>
                <input name="billedFromName" placeholder="Your Company Name" onChange={handleChange} />
                <textarea name="billedFromAddress" placeholder="Your Address" onChange={handleChange} />
            </div>

            <div className="form-section">
                <h3>Description</h3>
                <textarea name="description" placeholder="Service description" onChange={handleChange} />
                <input name="amount" placeholder="Amount (INR)" onChange={handleChange} />
            </div>

            <div className="form-section">
                <h3>Bank Details</h3>
                <input name="bankName" placeholder="Bank Name" onChange={handleChange} />
                <input name="accountNumber" placeholder="Account Number" onChange={handleChange} />
                <input name="ifsc" placeholder="IFSC Code" onChange={handleChange} />
                <input name="panNumber" placeholder="PAN Number" onChange={handleChange} />
            </div>

            <button type="submit">Generate Invoice</button>
        </form>
    );
};

export default InvoiceForm;
