const express = require('express');
const cors = require('cors');
require('dotenv').config();
const orders = require('./routes/orders');

const app = express();

app.use(cors());
app.use(express.json()); //Used to parse JSON bodies

app.use('/api/orders', orders);

const PORT = process.env.PORT || 5105;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
