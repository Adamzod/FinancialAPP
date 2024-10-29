import { GET_DASHBOARD_DATA, DASHBOARD_ERROR } from '../actions/types';

const initialState = {
  balance: 0,
  recentTransactions: [],
  budgetStatus: {},
  loading: true,
  error: null,
};

export default function dashboardReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DASHBOARD_DATA:
      return { 
        ...state, 
        balance: payload.balance ?? state.balance,
        recentTransactions: payload.recentTransactions ?? state.recentTransactions,
        budgetStatus: payload.budgetStatus ?? state.budgetStatus,
        loading: false 
      };
    case DASHBOARD_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}