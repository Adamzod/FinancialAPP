import api from '../utils/api';
import {
  GET_INCOME_EXPENSE_SUMMARY,
  GET_EXPENSES_BY_CATEGORY,
  GET_SPENDING_OVER_TIME,
  GET_BUDGET_ADHERENCE,
  REPORT_ERROR
} from './types';

export const getIncomeExpenseSummary = () => async (dispatch) => {
  try {
    const res = await api.get('/reports/income-expense-summary');
    dispatch({
      type: GET_INCOME_EXPENSE_SUMMARY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REPORT_ERROR,
      payload: err.response?.data?.msg || 'Error fetching income vs expense summary',
    });
  }
};

export const getExpensesByCategory = () => async (dispatch) => {
  try {
    const res = await api.get('/reports/expenses-by-category');
    dispatch({
      type: GET_EXPENSES_BY_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REPORT_ERROR,
      payload: err.response?.data?.msg || 'Error fetching expenses by category',
    });
  }
};
 
export const getSpendingOverTime = () => async (dispatch) => {
  try {
    const res = await api.get('/reports/spending-over-time');
    dispatch({
      type: GET_SPENDING_OVER_TIME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REPORT_ERROR,
      payload: err.response?.data?.msg || 'Error fetching spending over time',
    });
  }
};

export const getBudgetAdherence = () => async (dispatch) => {
  try {
    const res = await api.get('/reports/budget-adherence');
    dispatch({
      type: GET_BUDGET_ADHERENCE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REPORT_ERROR,
      payload: err.response?.data?.msg || 'Error fetching budget adherence',
    });
  }
};