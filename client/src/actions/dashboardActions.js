import axios from 'axios';
import { GET_DASHBOARD_DATA, DASHBOARD_ERROR } from './types';

export const fetchDashboardData = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/dashboard');
    dispatch({
      type: GET_DASHBOARD_DATA,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DASHBOARD_ERROR,
    });
  }
};
