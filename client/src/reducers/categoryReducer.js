import { GET_CATEGORIES, CATEGORY_ERROR } from '../actions/types';

const initialState = {
  categories: [], // Initialize as an empty array
  loading: true,
  error: null,
};

export default function categoryReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: Array.isArray(payload) ? payload : [], // Ensure categories is an array
        loading: false,
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}