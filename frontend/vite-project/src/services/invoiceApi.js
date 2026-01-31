
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL,
  withCredentials: true,// backend base URL
  headers: {
    "Content-Type": "application/json",
  },
  
});

/**
 * Create a new invoice
//  * @param {Object} invoiceData
 */
export const createInvoice = async (invoiceData) => {
  try {
    const response = await API.post("/invoices", invoiceData);
    return response.data;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }
};
