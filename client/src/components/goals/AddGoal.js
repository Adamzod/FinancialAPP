import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGoal } from '../../actions/goalActions';
import { useNavigate } from 'react-router-dom';

const AddGoal = () => {
  const [formData, setFormData] = useState({
    goal_name: '',
    target_amount: '',
    current_amount: '',
  });

  const dispatch = useDispatch();
  const history = useNavigate();

  const { goal_name, target_amount, current_amount } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addGoal(formData));
    history.push('/goals');
  };

  return (
    <div>
      <h2>Add Financial Goal</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Goal Name:</label>
          <input
            type="text"
            name="goal_name"
            value={goal_name}
            onChange={onChange}
            className="form-control"
            placeholder="e.g., Save for a car"
            required
          />
        </div>
        <div className="form-group">
          <label>Target Amount ($):</label>
          <input
            type="number"
            name="target_amount"
            value={target_amount}
            onChange={onChange}
            className="form-control"
            placeholder="0.00"
            required
          />
        </div>
        <div className="form-group">
          <label>Current Amount ($):</label>
          <input
            type="number"
            name="current_amount"
            value={current_amount}
            onChange={onChange}
            className="form-control"
            placeholder="0.00"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Goal
        </button>
      </form>
    </div>
  );
};

export default AddGoal;
