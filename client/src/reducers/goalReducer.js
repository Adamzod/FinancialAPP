// src/reducers/goalReducer.js
import {
    GET_GOALS,
    GET_GOAL,
    ADD_GOAL,
    UPDATE_GOAL,
    DELETE_GOAL,
    GOAL_ERROR,
  } from '../actions/types';
  
  const initialState = {
    goals: [],
    goal: null,
    loading: true,
    error: {},
  };
  
  export default function goalReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_GOALS:
        return {
          ...state,
          goals: payload,
          loading: false,
        };
      case GET_GOAL:
        return {
          ...state,
          goal: payload,
          loading: false,
        };
      case ADD_GOAL:
        return {
          ...state,
          goals: [payload, ...state.goals],
          loading: false,
        };
      case UPDATE_GOAL:
        return {
          ...state,
          goals: state.goals.map((goal) =>
            goal.id === payload.id ? payload : goal
          ),
          loading: false,
        };
      case DELETE_GOAL:
        return {
          ...state,
          goals: state.goals.filter((goal) => goal.id !== payload),
          loading: false,
        };
      case GOAL_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      default:
        return state;
    }
  }
  