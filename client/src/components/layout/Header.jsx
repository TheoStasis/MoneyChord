import React, { useState } from 'react';
import { useTransactions } from '../../context/TransactionContext';
import TransactionModal from '../TransactionModal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addTransaction } = useTransactions();

  const handleAddTransaction = (transactionData) => {
    addTransaction(transactionData);
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">FinTrackr</h1>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              onClick={() => setIsModalOpen(true)}
            >
              Add Transaction
            </button>
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