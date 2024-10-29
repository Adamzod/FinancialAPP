import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgets } from '../../actions/budgetActions';
import { Link } from 'react-router-dom';

const BudgetOverview = () => {
  const dispatch = useDispatch();
  const { budgets, loading } = useSelector((state) => state.budgets);

  useEffect(() => {
    dispatch(getBudgets());
  }, [dispatch]);

  if (loading) {
    return <div>Loading budgets...</div>;
  }

  return (
    <div>
      <h2>Your Budgets</h2>
      <Link to="/budgets/add" className="btn btn-primary mb-3">
        Add Budget
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount ($)</th>
            <th>Spent ($)</th>
            <th>Remaining ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => (
            <tr key={budget.id}>
              <td>{budget.category}</td>
              <td>{budget.amount.toFixed(2)}</td>
              <td>{budget.spent.toFixed(2)}</td>
              <td>{(budget.amount - budget.spent).toFixed(2)}</td>
              <td>
                <Link to={`/budgets/edit/${budget.id}`} className="btn btn-sm btn-secondary mr-2">
                  Edit
                </Link>
                {/* Add delete button if needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetOverview;
