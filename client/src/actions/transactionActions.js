import api from '../utils/api';
import {
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  TRANSACTION_ERROR,
} from './types';

// Get all transactions
export const getTransactions = () => async (dispatch) => {
  try {
    const res = await api.get('/transactions');
    const transactions = res.data.map(txn => ({
      ...txn,
      amount: Number(txn.amount), // Ensure amount is a number
    }));
    dispatch({
      type: GET_TRANSACTIONS,
      payload: transactions,
    });
  } catch (err) {
    console.error('Error fetching transactions:', err);
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get transaction by ID
export const getTransactionById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/transactions/${id}`);
    dispatch({
      type: GET_TRANSACTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add transaction
export const addTransaction = (transactionData) => async (dispatch) => {
  try {
    const res = await api.post('/transactions', transactionData); 
    dispatch({
      type: ADD_TRANSACTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Update transaction
export const updateTransaction = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/transactions/${id}`, formData);
    dispatch({
      type: UPDATE_TRANSACTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete transaction
export const deleteTransaction = (id) => async (dispatch) => {
  try {
    await api.delete(`/transactions/${id}`);
    dispatch({
      type: DELETE_TRANSACTION,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
