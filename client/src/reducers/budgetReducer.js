import {
    GET_BUDGETS,
    GET_BUDGET,
    ADD_BUDGET,
    UPDATE_BUDGET,
    DELETE_BUDGET,
    BUDGET_ERROR,
  } from '../actions/types';
  
  const initialState = {
    budgets: [],
    budget: null,
    loading: true,
    error: {},
  };
  
  export default function budgetReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_BUDGETS:
        return {
          ...state,
          budgets: payload,
          loading: false,
        };
      case GET_BUDGET:
        return {
          ...state,
          budget: payload,
          loading: false,
        };
      case ADD_BUDGET:
        return {
          ...state,
          budgets: [payload, ...state.budgets],
          loading: false,
        };
      case UPDATE_BUDGET:
        return {
          ...state,
          budgets: state.budgets.map((budget) =>
            budget.id === payload.id ? payload : budget
          ),
          loading: false,
        };
      case DELETE_BUDGET:
        return {
          ...state,
          budgets: state.budgets.filter((budget) => budget.id !== payload),
          loading: false,
        };
      case BUDGET_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      default:
        return state;
    }
  }