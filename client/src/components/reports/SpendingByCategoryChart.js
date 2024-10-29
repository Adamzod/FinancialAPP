import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const SpendingByCategoryChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchSpendingByCategory = async () => {
      try {
        const res = await axios.get('/api/reports/expenses-by-category');
        const categories = res.data.map((item) => item.category);
        const amounts = res.data.map((item) => parseFloat(item.total_amount));

        setChartData({
          labels: categories,
          datasets: [
            {
              data: amounts,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#C9CBCF',
              ],
            },
          ],
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchSpendingByCategory();
  }, []);

  return (
    <div>
      <h3>Spending by Category</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default SpendingByCategoryChart;
