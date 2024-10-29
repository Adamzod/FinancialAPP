import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGoalById, updateGoal } from '../../actions/goalActions';
import { useParams, useNavigate } from 'react-router-dom';

const EditGoal = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const { goal, loading } = useSelector((state) => state.goals);

  const [formData, setFormData] = useState({
    goal_name: '',
    target_amount: '',
    current_amount: '',
  });

  useEffect(() => {
    dispatch(getGoalById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (goal) {
      setFormData({
        goal_name: goal.goal_name,
        target_amount: goal.target_amount,
        current_amount: goal.current_amount,
      });
    }
  }, [goal]);

  const { goal_name, target_amount, current_amount } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateGoal(id, formData));
    history.push('/goals');
  };

  if (loading || !goal) {
    return <div>Loading goal...</div>;
  }

  return (
    <div>
      <h2>Edit Financial Goal</h2>
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
        <button type="submit" className="btn btn-primary">
          Update Goal
        </button>
      </form>
    </div>
  );
};

export default EditGoal;
