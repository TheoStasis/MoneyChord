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
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">FinTrackr</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                <span className="text-sm sm:text-base">{isDarkMode ? '🌞' : '🌙'}</span>
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="hidden sm:inline">Add Transaction</span>
                <span className="sm:hidden">Add</span>
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