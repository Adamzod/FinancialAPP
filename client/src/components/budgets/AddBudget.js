import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBudget } from '../../actions/budgetActions';
import { useNavigate } from 'react-router-dom';

const AddBudget = () => {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
  });

  const dispatch = useDispatch();
  const history = useNavigate();

  const { category, amount } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addBudget(formData));
    history.push('/budgets');
  };

  return (
    <div>
      <h2>Add Budget</h2>
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
          Add Budget
        </button>
      </form>
    </div>
  );
};

export default AddBudget;
