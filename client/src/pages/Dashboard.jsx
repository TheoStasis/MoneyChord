import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import TransactionList from '../components/TransactionList';

const Dashboard = () => {
  const { transactions } = useTransactions();

  const calculateSummary = () => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'credit') {
          acc.totalCredit += transaction.amount;
        } else {
          acc.totalDebit += transaction.amount;
        }
        return acc;
      },
      { totalCredit: 0, totalDebit: 0 }
    );
  };

  const { totalCredit, totalDebit } = calculateSummary();
  const netBalance = totalCredit - totalDebit;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Credit Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Credit
          </h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            +${totalCredit.toFixed(2)}
          </p>
        </div>

        {/* Total Debit Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Debit
          </h3>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">
            -${totalDebit.toFixed(2)}
          </p>
        </div>

        {/* Net Balance Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Net Balance
          </h3>
          <p
            className={`text-3xl font-bold ${
              netBalance >= 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {netBalance >= 0 ? '+' : ''}${netBalance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <TransactionList />
      </div>
    </div>
  );
};

export default Dashboard; 