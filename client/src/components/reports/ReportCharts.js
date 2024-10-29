import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getIncomeExpenseSummary, 
  getExpensesByCategory, 
  getSpendingOverTime, 
  getBudgetAdherence 
} from '../../actions/reportActions';
import { Bar, Pie, Line } from 'react-chartjs-2';

const ReportCharts = () => {
  const dispatch = useDispatch();

  // Fetch each type of report data from the store
  const {
    incomeExpenseSummary,
    expensesByCategory,
    spendingOverTime,
    budgetAdherence,
    loading,
  } = useSelector((state) => state.reports);

  // Dispatch each action to load the data
  useEffect(() => {
    dispatch(getIncomeExpenseSummary());
    dispatch(getExpensesByCategory());
    dispatch(getSpendingOverTime());
    dispatch(getBudgetAdherence());
  }, [dispatch]);

  if (loading) {
    return <div>Loading reports...</div>;
  }

  // Prepare data for Income vs Expenses chart
  const incomeExpensesData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount ($)',
        data: [
          incomeExpenseSummary.total_income || 0,
          incomeExpenseSummary.total_expenses || 0,
        ],
        backgroundColor: ['#28a745', '#dc3545'],
      },
    ],
  };

  // Prepare data for Expenses by Category chart
  const expenseCategories = expensesByCategory.map((item) => item.category);
  const expenseAmounts = expensesByCategory.map((item) => item.total_amount);

  const expensesByCategoryData = {
    labels: expenseCategories,
    datasets: [
      {
        data: expenseAmounts,
        backgroundColor: [
          '#007bff',
          '#6610f2',
          '#6f42c1',
          '#e83e8c',
          '#dc3545',
          '#fd7e14',
          '#ffc107',
          '#28a745',
          '#20c997',
          '#17a2b8',
        ],
      },
    ],
  };

  // Prepare data for Spending Over Time chart
  const spendingMonths = spendingOverTime.map((item) => item.month);
  const spendingAmounts = spendingOverTime.map((item) => item.total_expenses);

  const spendingOverTimeData = {
    labels: spendingMonths,
    datasets: [
      {
        label: 'Monthly Expenses ($)',
        data: spendingAmounts,
        fill: false,
        borderColor: '#007bff',
        tension: 0.1,
      },
    ],
  };

  // Prepare data for Budget Adherence chart
  const budgetCategories = budgetAdherence.map((item) => item.category);
  const budgetAmounts = budgetAdherence.map((item) => item.budget_amount);
  const spentAmounts = budgetAdherence.map((item) => item.total_spent);

  const budgetAdherenceData = {
    labels: budgetCategories,
    datasets: [
      {
        label: 'Budget Amount ($)',
        data: budgetAmounts,
        backgroundColor: '#ffc107',
      },
      {
        label: 'Spent Amount ($)',
        data: spentAmounts,
        backgroundColor: '#dc3545',
      },
    ],
  };

  return (
    <div>
      <h2>Financial Reports</h2>

      <div className="chart-container mb-5">
        <h3>Income vs Expenses</h3>
        <Bar data={incomeExpensesData} />
      </div>

      <div className="chart-container mb-5">
        <h3>Expenses by Category</h3>
        <Pie data={expensesByCategoryData} />
      </div>

      <div className="chart-container mb-5">
        <h3>Spending Over Time</h3>
        <Line data={spendingOverTimeData} />
      </div>

      <div className="chart-container mb-5">
        <h3>Budget Adherence</h3>
        <Bar data={budgetAdherenceData} />
      </div>
    </div>
  );
};

export default ReportCharts;