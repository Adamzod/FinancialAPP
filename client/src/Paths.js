// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';

// Import new components
import TransactionList from './components/transactions/TransactionList';
import AddTransaction from './components/transactions/AddTransaction';
import EditTransaction from './components/transactions/EditTransaction';
import BudgetOverview from './components/budgets/BudgetOverview';
import AddBudget from './components/budgets/AddBudget';
import EditBudget from './components/budgets/EditBudget';
import GoalList from './components/goals/GoalList';
import AddGoal from './components/goals/AddGoal';
import EditGoal from './components/goals/EditGoal';
import ReportCharts from './components/reports/ReportCharts';

const RoutesComponent = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      {/* Transactions */}
      <Route path="/transactions" element={<PrivateRoute><TransactionList /></PrivateRoute>} />
      <Route path="/transactions/add" element={<PrivateRoute><AddTransaction /></PrivateRoute>} />
      <Route path="/transactions/edit/:id" element={<PrivateRoute><EditTransaction /></PrivateRoute>} />
      {/* Budgets */}
      <Route path="/budgets" element={<PrivateRoute><BudgetOverview /></PrivateRoute>} />
      <Route path="/budgets/add" element={<PrivateRoute><AddBudget /></PrivateRoute>} />
      <Route path="/budgets/edit/:id" element={<PrivateRoute><EditBudget /></PrivateRoute>} />
      {/* Goals */}
      <Route path="/goals" element={<PrivateRoute><GoalList /></PrivateRoute>} />
      <Route path="/goals/add" element={<PrivateRoute><AddGoal /></PrivateRoute>} />
      <Route path="/goals/edit/:id" element={<PrivateRoute><EditGoal /></PrivateRoute>} />
      {/* Reports */}
      <Route path="/reports" element={<PrivateRoute><ReportCharts /></PrivateRoute>} />
      {/* Add other routes as needed */}
    </Routes>
  </Router>
);

export default RoutesComponent;
