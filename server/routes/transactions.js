const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// Get all transactions
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await pool.query(
      `SELECT t.transaction_id, t.amount, t.transaction_date, t.description, 
              c.name AS category_name, c.type AS category_type
       FROM transactions t
       LEFT JOIN categories c ON t.category_id = c.category_id
       WHERE t.user_id = $1
       ORDER BY t.transaction_date DESC`,
      [req.user.user_id]
    );
    res.json(transactions.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a new transaction
router.post('/', auth, async (req, res) => {
  try {
    const { category_id, amount, transaction_date, description } = req.body;

    if (!category_id) {
      return res.status(400).json({ msg: 'Category ID is required' });
    }

    const newTransaction = await pool.query(
      `INSERT INTO transactions (user_id, category_id, amount, transaction_date, description)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [req.user.user_id, category_id, amount, transaction_date, description]
    );

    res.json(newTransaction.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a single transaction
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await pool.query(
      'SELECT * FROM transactions WHERE transaction_id = $1 AND user_id = $2',
      [id, req.user.user_id]
    );

    if (transaction.rows.length === 0) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    res.json(transaction.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a new transaction
router.post('/', auth, async (req, res) => {
  try {
    const { category_id, amount, transaction_date, description } = req.body;
    const newTransaction = await pool.query(
      'INSERT INTO transactions (user_id, category_id, amount, transaction_date, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.user_id, category_id, amount, transaction_date, description]
    );
    res.json(newTransaction.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a transaction
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, amount, transaction_date, description } = req.body;

    // Ensure transaction belongs to the user
    const transaction = await pool.query(
      'SELECT * FROM transactions WHERE transaction_id = $1 AND user_id = $2',
      [id, req.user.user_id]
    );

    if (transaction.rows.length === 0) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    // Update transaction
    const updatedTransaction = await pool.query(
      'UPDATE transactions SET category_id = $1, amount = $2, transaction_date = $3, description = $4 WHERE transaction_id = $5 RETURNING *',
      [category_id, amount, transaction_date, description, id]
    );

    res.json(updatedTransaction.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a transaction
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure transaction belongs to the user
    const transaction = await pool.query(
      'SELECT * FROM transactions WHERE transaction_id = $1 AND user_id = $2',
      [id, req.user.user_id]
    );

    if (transaction.rows.length === 0) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    await pool.query('DELETE FROM transactions WHERE transaction_id = $1', [id]);

    res.json({ msg: 'Transaction deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
