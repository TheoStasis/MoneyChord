import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import TransactionModal from './TransactionModal';

const TransactionList = () => {
  const { transactions, loading, error, updateTransaction, deleteTransaction } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(id);
      } catch (error) {
        console.error('Failed to delete transaction:', error);
      }
    }
  };

  const handleModalSubmit = async (transactionData) => {
    try {
      if (selectedTransaction) {
        await updateTransaction(selectedTransaction._id, transactionData);
      }
      setIsModalOpen(false);
      setSelectedTransaction(null);
    } catch (error) {
      console.error('Failed to update transaction:', error);
    }
  };

  if (loading) return <div className="text-center py-4 text-gray-700 dark:text-gray-300">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500 dark:text-red-400">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center border border-gray-200 dark:border-gray-700"
          >
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {transaction.description || 'No Description'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{transaction.category}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(transaction.timestamp).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`font-bold ${
                  transaction.type === 'credit' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(transaction)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(transaction._id)}
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTransaction(null);
        }}
        onSubmit={handleModalSubmit}
        initialData={selectedTransaction}
      />
    </div>
  );
};

export default TransactionList; 