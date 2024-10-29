import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../actions/dashboardActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard);
  const { balance, recentTransactions, budgetStatus } = dashboard;

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (dashboard.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard Overview</h1>
      <div>
        <h2>Account Balance: ${balance}</h2>
        {/* Display recent transactions and budget status */}
      </div>
    </div>
  );
};

export default Dashboard;
