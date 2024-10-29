import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dashboardReducer from './dashboardReducer';
import transactionReducer from './transactionReducer';
import budgetReducer from './budgetReducer';
import goalReducer from './goalReducer';
import reportReducer from './reportReducer';
import categoryReducer from './categoryReducer';


export default combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  transactions: transactionReducer,
  budgets: budgetReducer,
  goals: goalReducer,
  reports: reportReducer,
  categories: categoryReducer,
});
