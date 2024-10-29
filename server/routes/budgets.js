const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// Implement CRUD operations for budgets
// GET all budgets
router.get('/', auth, async (req, res) => {
  try {
    const budgets = await pool.query(
      'SELECT * FROM budgets WHERE user_id = $1 ORDER BY start_date DESC',
      [req.user.user_id]
    );
    res.json(budgets.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Other CRUD operations (similar to transactions)

module.exports = router;

