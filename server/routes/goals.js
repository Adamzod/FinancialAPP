const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// Implement CRUD operations for financial goals
// GET all goals
router.get('/', auth, async (req, res) => {
  try {
    const goals = await pool.query(
      'SELECT * FROM financial_goals WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.user_id]
    );
    res.json(goals.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Other CRUD operations (similar to transactions)

module.exports = router;
