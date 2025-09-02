require('dotenv').config();

const express = require('express');
const router = express.Router();
const axios = require('axios');

// Function to create an order in Conekta
async function createConektaOrder(orderData) {
  try {
    const response = await axios.post('https://api.conekta.io/orders', orderData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.conekta-v2.2.0+json',
        'Authorization': 'Basic ' + Buffer.from(process.env.CONEKTA_PRIVATE_KEY + ':').toString('base64')
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error.response ? error.response.data : error.message);
    throw error;
  }
}

router.post('/', async (req, res) => {
  try {
    const orderData = req.body; // Assume the order data is sent in the request body
    const order = await createConektaOrder(orderData);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

module.exports = router;
