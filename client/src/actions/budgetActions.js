import api from '../utils/api';
import {
  GET_BUDGETS,
  GET_BUDGET,
  ADD_BUDGET,
  UPDATE_BUDGET,
  DELETE_BUDGET,
  BUDGET_ERROR,
} from './types';

// Get all budgets
export const getBudgets = () => async (dispatch) => {
  try {
    const res = await api.get('api/budgets');
    dispatch({
      type: GET_BUDGETS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BUDGET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get budget by ID
export const getBudgetById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`api/budgets/${id}`);
    dispatch({
      type: GET_BUDGET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BUDGET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add budget
export const addBudget = (formData) => async (dispatch) => {
  try {
    const res = await api.post('api/budgets', formData);
    dispatch({
      type: ADD_BUDGET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BUDGET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update budget
export const updateBudget = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`api/budgets/${id}`, formData);
    dispatch({
      type: UPDATE_BUDGET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BUDGET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete budget
export const deleteBudget = (id) => async (dispatch) => {
  try {
    await api.delete(`api/budgets/${id}`);
    dispatch({
      type: DELETE_BUDGET,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: BUDGET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};