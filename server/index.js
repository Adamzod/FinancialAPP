const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Incoming request: Method - ${req.method}, URL - ${req.originalUrl}`);
  next();
});

//Routes
try {
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/reports', require('./routes/reports'));
  app.use('/api/transactions', require('./routes/transactions'));
  app.use('/api/budgets', require('./routes/budgets'));
  app.use('/api/goals', require('./routes/goals'));
  app.use('/api/categories', require('./routes/categories'));
} catch (error) {
  console.error('Error setting up routes:', error);
}

// Start server
const PORT = process.env.PORT || 5020;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});