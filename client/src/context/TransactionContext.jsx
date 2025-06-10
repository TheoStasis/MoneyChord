import { createContext, useContext, useReducer } from 'react';
import { transactionReducer, initialState } from './transactionReducer';

// Create Context
const TransactionContext = createContext();

// Provider Component
export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  // Action Creators
  const addTransaction = (transaction) => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  };

  const editTransaction = (transaction) => {
    dispatch({
      type: 'EDIT_TRANSACTION',
      payload: transaction
    });
  };

  const deleteTransaction = (id) => {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  };

  const loadTransactions = (transactions) => {
    dispatch({
      type: 'LOAD_TRANSACTIONS',
      payload: transactions
    });
  };

  const value = {
    transactions: state.transactions,
    loading: state.loading,
    error: state.error,
    addTransaction,
    editTransaction,
    deleteTransaction,
    loadTransactions
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

// Custom Hook
export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}; 