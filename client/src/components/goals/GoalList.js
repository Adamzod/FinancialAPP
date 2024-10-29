import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGoals } from '../../actions/goalActions';
import { Link } from 'react-router-dom';

const GoalList = () => {
  const dispatch = useDispatch();
  const { goals, loading } = useSelector((state) => state.goals);

  useEffect(() => {
    dispatch(getGoals());
  }, [dispatch]);

  if (loading) {
    return <div>Loading goals...</div>;
  }

  return (
    <div>
      <h2>Your Financial Goals</h2>
      <Link to="/goals/add" className="btn btn-primary mb-3">
        Add Goal
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Goal Name</th>
            <th>Target Amount ($)</th>
            <th>Current Amount ($)</th>
            <th>Progress (%)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((goal) => {
            const progress = ((goal.current_amount / goal.target_amount) * 100).toFixed(2);
            return (
              <tr key={goal.id}>
                <td>{goal.goal_name}</td>
                <td>{goal.target_amount.toFixed(2)}</td>
                <td>{goal.current_amount.toFixed(2)}</td>
                <td>{progress}%</td>
                <td>
                  <Link to={`/goals/edit/${goal.id}`} className="btn btn-sm btn-secondary mr-2">
                    Edit
                  </Link>
                  {/* Add delete button if needed */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GoalList;
