import api from '../utils/api';
import { GET_CATEGORIES, CATEGORY_ERROR, ADD_CATEGORY } from './types';

// Add a new category
export const addCategory = (categoryData) => async (dispatch) => {
    try {
      const res = await api.post('/categories', categoryData); // Ensure this URL is correct
      dispatch({
        type: ADD_CATEGORY,
        payload: res.data,
      });
      return res.data; // Return the new category data
    } catch (err) {
      console.error('Error in addCategory action:', err); // Log the full error for debugging
      dispatch({
        type: CATEGORY_ERROR,
        payload: { msg: err.response?.data?.msg || 'Error adding category', status: err.response?.status },
      });
      return null;
    }
  };

// Get all categories for the current user
export const getCategories = () => async (dispatch) => {
  try {
    const res = await api.get('/categories');
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};