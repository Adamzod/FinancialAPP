import {
  GET_INCOME_EXPENSE_SUMMARY,
  GET_EXPENSES_BY_CATEGORY,
  GET_SPENDING_OVER_TIME,
  GET_BUDGET_ADHERENCE,
  REPORT_ERROR
} from '../actions/types';

const initialState = {
  incomeExpenseSummary: {},
  expensesByCategory: [],
  spendingOverTime: [],
  budgetAdherence: [],
  loading: true,
  error: null,
};

export default function reportReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_INCOME_EXPENSE_SUMMARY:
      return {
        ...state,
        incomeExpenseSummary: payload,
        loading: false,
      };
    case GET_EXPENSES_BY_CATEGORY:
      return {
        ...state,
        expensesByCategory: payload,
        loading: false,
      };
    case GET_SPENDING_OVER_TIME:
      return {
        ...state,
        spendingOverTime: payload,
        loading: false,
      };
    case GET_BUDGET_ADHERENCE:
      return {
        ...state,
        budgetAdherence: payload,
        loading: false,
      };
    case REPORT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}