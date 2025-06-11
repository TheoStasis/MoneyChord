import React, { useState } from 'react';
import { useTransactions } from '../../context/TransactionContext';
import TransactionModal from '../TransactionModal';

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addTransaction } = useTransactions();

  const handleAddTransaction = (transactionData) => {
    addTransaction(transactionData);
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">FinTrackr</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {isDarkMode ? '🌞' : '🌙'}
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                onClick={() => setIsModalOpen(true)}
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      </header>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTransaction}
      />
    </>
  );
};

export default Header; 