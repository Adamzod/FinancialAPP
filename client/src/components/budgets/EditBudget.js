import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgetById, updateBudget } from '../../actions/budgetActions';
import { useParams, useNavigate } from 'react-router-dom';

const EditBudget = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const { budget, loading } = useSelector((state) => state.budgets);

  const [formData, setFormData] = useState({
    category: '',
    amount: '',
  });

  useEffect(() => {
    dispatch(getBudgetById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (budget) {
      setFormData({
        category: budget.category,
        amount: budget.amount,
      });
    }
  }, [budget]);

  const { category, amount } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBudget(id, formData));
    history.push('/budgets');
  };

  if (loading || !budget) {
    return <div>Loading budget...</div>;
  }

  return (
    <div>
      <h2>Edit Budget</h2>
      <form onSubmit={onSubmit}>
      <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={onChange}
            className="form-control"
            placeholder="e.g., Food, Rent"
            required
          />
        </div>
        <div className="form-group">
          <label>Amount ($):</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={onChange}
            className="form-control"
            placeholder="0.00"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Budget
        </button>
      </form>
    </div>
  );
};

export default EditBudget;
