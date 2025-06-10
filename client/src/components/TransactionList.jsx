import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import TransactionModal from './TransactionModal';

const TransactionList = () => {
  const { transactions, editTransaction, deleteTransaction } = useTransactions();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredTransactions = transactions.filter(transaction =>
    selectedCategory === 'All' ? true : transaction.category === selectedCategory
  );

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleModalSubmit = (transactionData) => {
    if (editingTransaction) {
      editTransaction(transactionData);
    }
    setEditingTransaction(null);
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No transactions yet. Add your first transaction to get started!
      </div>
    );
  }

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Billing">Billing</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  {transaction.description || 'No Description'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {transaction.category} • {formatDate(transaction.timestamp)}
                </p>
              </div>
              <div className="ml-4 flex items-start space-x-2">
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                      transaction.type === 'credit'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                  </span>
                  <p
                    className={`text-lg font-semibold mt-1 ${
                      transaction.type === 'credit'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'credit' ? '+' : '-'}₹
                    {transaction.amount.toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleEdit(transaction)}
                    className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        onSubmit={handleModalSubmit}
        transaction={editingTransaction}
      />
    </div>
  );
};

export default TransactionList; 