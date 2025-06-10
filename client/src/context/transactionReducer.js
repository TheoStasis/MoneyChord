// Action Types
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const EDIT_TRANSACTION = 'EDIT_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const LOAD_TRANSACTIONS = 'LOAD_TRANSACTIONS';

// Initial State
export const initialState = {
  transactions: [],
  loading: false,
  error: null
};

// Transaction Reducer
export const transactionReducer = (state, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, {
          ...action.payload,
          id: crypto.randomUUID(),
          timestamp: new Date()
        }]
      };

    case EDIT_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.id
            ? { ...transaction, ...action.payload }
            : transaction
        )
      };

    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.payload
        )
      };

    case LOAD_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        loading: false
      };

    default:
      return state;
  }
}; 