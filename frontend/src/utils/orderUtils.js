import axios from "axios";
import { API_URL, CONTAINER_URL } from "../environment";

export const transformOrderData = (
  cartItems,
  formData,
  shippingData,
  paymentMethod
) => {
  const lineItems = cartItems.map((item) => ({
    name: item.name,
    unit_price: item.price * 100, // Convert to cents
    quantity: item.quantity,
  }));

  const customerInfo = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
  };

  const shippingContact = {
    address: shippingData,
  };

  let charges;

  if (paymentMethod === "Efectivo") {
    charges = [
      {
        payment_method: {
          type: "cash",
          expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
        },
      },
    ];
  } else {
    const productType =
      paymentMethod === "Pago en plazos con Creditea"
        ? "creditea_bnpl"
        : "aplazo_bnpl";
    charges = [
      {
        payment_method: {
          type: "bnpl",
          success_url: `${CONTAINER_URL}/success`,
          failure_url: `${CONTAINER_URL}/failure`,
          product_type: productType,
        },
      },
    ];
  }

  return {
    line_items: lineItems,
    currency: "MXN",
    customer_info: customerInfo,
    shipping_contact: shippingContact,
    charges: charges,
    shipping_lines: [
      {
        amount: 1500,
        carrier: "FEDEX",
        quantity: 1,
      },
    ],
  };
};

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, orderData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating order:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
