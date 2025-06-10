import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import TransactionList from '../components/TransactionList';

const SummaryCard = ({ title, amount, type }) => {
  const getAmountColor = () => {
    switch (type) {
      case 'credit':
        return 'text-green-600';
      case 'debit':
        return 'text-red-600';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className={`mt-2 text-3xl font-semibold ${getAmountColor()}`}>
        ₹{amount.toLocaleString()}
      </p>
    </div>
  );
};

const Dashboard = () => {
  const { transactions } = useTransactions();

  const calculateTotals = () => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'credit') {
          acc.credit += transaction.amount;
        } else {
          acc.debit += transaction.amount;
        }
        return acc;
      },
      { credit: 0, debit: 0 }
    );
  };

  const { credit, debit } = calculateTotals();
  const balance = credit - debit;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard title="Total Credit" amount={credit} type="credit" />
        <SummaryCard title="Total Debit" amount={debit} type="debit" />
        <SummaryCard 
          title="Net Balance" 
          amount={balance} 
          type={balance >= 0 ? 'credit' : 'debit'} 
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h2>
        <TransactionList />
      </div>
    </div>
  );
};

export default Dashboard; 