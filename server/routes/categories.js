const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// Add a new category
router.post('/', auth, async (req, res) => {
  try {
    const { name, type } = req.body;
    const { user_id } = req.user;

    // Check if the category already exists for the user
    const existingCategory = await pool.query(
      `SELECT * FROM categories WHERE name = $1 AND type = $2 AND user_id = $3`,
      [name, type, user_id]
    );

    if (existingCategory.rows.length > 0) {
      return res.status(400).json({ msg: 'Category already exists' });
    }

    // Insert new category
    const newCategory = await pool.query(
      `INSERT INTO categories (name, type, user_id) VALUES ($1, $2, $3) RETURNING *`,
      [name, type, user_id]
    );

    res.json(newCategory.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all categories for a user
router.get('/', auth, async (req, res) => {
  try {
    const { user_id } = req.user;

    // Retrieve all categories for the authenticated user
    const categories = await pool.query(
      `SELECT * FROM categories WHERE user_id = $1 ORDER BY name ASC`,
      [user_id]
    );

    res.json(categories.rows);
  } catch (err) {
    console.error('Error fetching categories:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;


