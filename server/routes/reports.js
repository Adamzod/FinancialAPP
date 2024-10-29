// routes/reports.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// Get income vs. expenses summary
router.get('/income-expense-summary', auth, async (req, res) => {
  try {
    const { user_id } = req.user;

    const incomeResult = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) AS total_income
       FROM transactions
       INNER JOIN categories ON transactions.category_id = categories.category_id
       WHERE transactions.user_id = $1 AND categories.type = 'income'`,
      [user_id]
    );

    const expenseResult = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) AS total_expenses
       FROM transactions
       INNER JOIN categories ON transactions.category_id = categories.category_id
       WHERE transactions.user_id = $1 AND categories.type = 'expense'`,
      [user_id]
    );

    res.json({
      total_income: parseFloat(incomeResult.rows[0].total_income),
      total_expenses: parseFloat(expenseResult.rows[0].total_expenses),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get expenses by category
router.get('/expenses-by-category', auth, async (req, res) => {
  try {
    const { user_id } = req.user;

    const result = await pool.query(
      `SELECT categories.name AS category, COALESCE(SUM(amount), 0) AS total_amount
       FROM transactions
       INNER JOIN categories ON transactions.category_id = categories.category_id
       WHERE transactions.user_id = $1 AND categories.type = 'expense'
       GROUP BY categories.name
       ORDER BY total_amount DESC`,
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get spending over time (e.g., last 6 months)
router.get('/spending-over-time', auth, async (req, res) => {
  try {
    const { user_id } = req.user;

    const result = await pool.query(
      `SELECT
         to_char(transaction_date, 'YYYY-MM') AS month,
         COALESCE(SUM(amount), 0) AS total_expenses
       FROM transactions
       INNER JOIN categories ON transactions.category_id = categories.category_id
       WHERE transactions.user_id = $1 AND categories.type = 'expense'
       GROUP BY month
       ORDER BY month`,
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get budget adherence
router.get('/budget-adherence', auth, async (req, res) => {
  try {
    const { user_id } = req.user;

    const result = await pool.query(
      `SELECT
         budgets.budget_id,
         categories.name AS category,
         budgets.amount AS budget_amount,
         COALESCE(SUM(transactions.amount), 0) AS total_spent,
         (budgets.amount - COALESCE(SUM(transactions.amount), 0)) AS remaining
       FROM budgets
       INNER JOIN categories ON budgets.category_id = categories.category_id
       LEFT JOIN transactions ON
         budgets.category_id = transactions.category_id AND
         transactions.user_id = budgets.user_id AND
         transactions.transaction_date BETWEEN budgets.start_date AND budgets.end_date
       WHERE budgets.user_id = $1
       GROUP BY budgets.budget_id, categories.name, budgets.amount`,
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
