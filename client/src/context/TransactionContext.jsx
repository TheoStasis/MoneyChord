import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { transactionReducer, initialState } from './transactionReducer';

// Create Context
const TransactionContext = createContext();

const STORAGE_KEY = 'fintrackr_transactions';

// Helper function to parse dates when loading from localStorage
const parseTransactions = (savedTransactions) => {
  return savedTransactions.map(transaction => ({
    ...transaction,
    timestamp: new Date(transaction.timestamp)
  }));
};

// Helper function to prepare transactions for localStorage
const prepareTransactionsForStorage = (transactions) => {
  return transactions.map(transaction => ({
    ...transaction,
    timestamp: transaction.timestamp.toISOString()
  }));
};

// Get initial state from localStorage
const getInitialState = () => {
  try {
    const savedTransactions = localStorage.getItem(STORAGE_KEY);
    if (savedTransactions) {
      const parsedTransactions = parseTransactions(JSON.parse(savedTransactions));
      return {
        ...initialState,
        transactions: parsedTransactions
      };
    }
  } catch (error) {
    console.error('Error loading initial state from localStorage:', error);
  }
  return initialState;
};

// Provider Component
export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, getInitialState());

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    try {
      const transactionsToStore = prepareTransactionsForStorage(state.transactions);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactionsToStore));
    } catch (error) {
      console.error('Error saving transactions to localStorage:', error);
    }
  }, [state.transactions]);

  // Action Creators
  const addTransaction = (transaction) => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        ...transaction,
        timestamp: new Date()
      }
    });
  };

  const editTransaction = (transaction) => {
    dispatch({
      type: 'EDIT_TRANSACTION',
      payload: {
        ...transaction,
        timestamp: new Date()
      }
    });
  };

  const deleteTransaction = (id) => {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  };

  const value = {
    transactions: state.transactions,
    loading: state.loading,
    error: state.error,
    addTransaction,
    editTransaction,
    deleteTransaction
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