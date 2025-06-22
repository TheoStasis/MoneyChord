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
    <div className="p-3 sm:p-4 lg:p-6">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
        Recent Transactions
      </h2>
      <div className="space-y-2 sm:space-y-3 lg:space-y-4">
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p className="text-sm sm:text-base">No transactions yet. Add your first transaction to get started!</p>
          </div>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0 transition-shadow duration-200 hover:shadow-md"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                  {transaction.description || 'No Description'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{transaction.category}</p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {new Date(transaction.timestamp).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                <span
                  className={`font-bold text-sm sm:text-base ${
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
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs sm:text-sm px-2 py-1 rounded transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-xs sm:text-sm px-2 py-1 rounded transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
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