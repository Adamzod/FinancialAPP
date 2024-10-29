// src/actions/goalActions.js
import api from '../utils/api';
import {
  GET_GOALS,
  GET_GOAL,
  ADD_GOAL,
  UPDATE_GOAL,
  DELETE_GOAL,
  GOAL_ERROR,
} from './types';

// Get all goals
export const getGoals = () => async (dispatch) => {
  try {
    const res = await api.get('/goals');
    dispatch({
      type: GET_GOALS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GOAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get goal by ID
export const getGoalById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/goals/${id}`);
    dispatch({
      type: GET_GOAL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GOAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add goal
export const addGoal = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/goals', formData);
    dispatch({
      type: ADD_GOAL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GOAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update goal
export const updateGoal = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/goals/${id}`, formData);
    dispatch({
      type: UPDATE_GOAL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GOAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete goal
export const deleteGoal = (id) => async (dispatch) => {
  try {
    await api.delete(`/goals/${id}`);
    dispatch({
      type: DELETE_GOAL,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: GOAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
