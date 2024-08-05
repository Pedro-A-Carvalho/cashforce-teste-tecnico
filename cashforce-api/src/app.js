const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3000;

// Get all buyers
app.get('/buyers', async (req, res) => {
  const buyers = await db.Buyer.findAll();
  res.json(buyers);
});

// Get buyer by ID
app.get('/buyers/:id', async (req, res) => {
  const buyer = await db.Buyer.findByPk(req.params.id);
  if (buyer) {
    res.json(buyer);
  } else {
    res.status(404).send('Buyer not found');
  }
});

// Get all providers
app.get('/providers', async (req, res) => {
  const providers = await db.Provider.findAll();
  res.json(providers);
});

// Get provider by ID
app.get('/providers/:id', async (req, res) => {
  const provider = await db.Provider.findByPk(req.params.id);
  if (provider) {
    res.json(provider);
  } else {
    res.status(404).send('Provider not found');
  }
});

// Get all orders
app.get('/orders', async (req, res) => {
  const orders = await db.Order.findAll();
  res.json(orders);
});

// Get order by ID
app.get('/orders/:id', async (req, res) => {
  const order = await db.Order.findByPk(req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).send('Order not found');
  }
});

// Get all cnpjs
app.get('/cnpjs', async (req, res) => {
  const cnpjs = await db.Cnpj.findAll();
  res.json(cnpjs);
});

// Get cnpj by ID
app.get('/cnpjs/:id', async (req, res) => {
  const cnpj = await db.Cnpj.findByPk(req.params.id);
  if (cnpj) {
    res.json(cnpj);
  } else {
    res.status(404).send('CNPJ not found');
  }
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await db.User.findAll();
  res.json(users);
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});