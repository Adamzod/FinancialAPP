import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const IncomeExpensesChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchIncomeExpensesData = async () => {
      try {
        const res = await axios.get('/api/reports/income-expense-summary');
        const { total_income, total_expenses } = res.data;

        setChartData({
          labels: ['Income', 'Expenses'],
          datasets: [
            {
              label: 'Amount ($)',
              data: [total_income, total_expenses],
              backgroundColor: ['#36a2eb', '#ff6384'],
            },
          ],
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchIncomeExpensesData();
  }, []);

  return (
    <div>
      <h3>Income vs. Expenses</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default IncomeExpensesChart;
