import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { transactionReducer } from './transactionReducer';
import {
  getAllTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction
} from '../services/api';

// Create Context
const TransactionContext = createContext();

const initialState = {
  transactions: [],
  loading: false,
  error: null
};

// Provider Component
export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  // Fetch transactions on initial load
  useEffect(() => {
    const fetchTransactions = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const transactions = await getAllTransactions();
        dispatch({ type: 'SET_TRANSACTIONS', payload: transactions });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchTransactions();
  }, []);

  const addNewTransaction = async (transaction) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const newTransaction = await addTransaction(transaction);
      dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const editTransaction = async (id, transaction) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const updatedTransaction = await updateTransaction(id, transaction);
      dispatch({ type: 'UPDATE_TRANSACTION', payload: updatedTransaction });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeTransaction = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await deleteTransaction(id);
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const value = {
    transactions: state.transactions,
    loading: state.loading,
    error: state.error,
    addTransaction: addNewTransaction,
    updateTransaction: editTransaction,
    deleteTransaction: removeTransaction
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