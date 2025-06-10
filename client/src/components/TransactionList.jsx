import React from 'react';
import { useTransactions } from '../context/TransactionContext';

const TransactionList = () => {
  const { transactions } = useTransactions();

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No transactions yet. Add your first transaction to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
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
            <div className="ml-4">
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList; 