import {
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  TRANSACTION_ERROR,
} from '../actions/types';

const initialState = {
  transactions: [],
  transaction: null,
  loading: true,
  error: {},
};

export default function transactionReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: payload,
        loading: false,
      };
    case GET_TRANSACTION:
      return {
        ...state,
        transaction: payload,
        loading: false,
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [payload, ...state.transactions],
        loading: false,
      };
    case UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map((txn) =>
          txn.id === payload.id ? payload : txn
        ),
        loading: false,
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter((txn) => txn.id !== payload),
        loading: false,
      };
    case TRANSACTION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
