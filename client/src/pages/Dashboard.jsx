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
    <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {/* Total Credit Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 lg:p-6 transition-shadow duration-200 hover:shadow-md">
          <h3 className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 dark:text-white mb-1 sm:mb-2">
            Total Credit
          </h3>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400">
            +${totalCredit.toFixed(2)}
          </p>
        </div>

        {/* Total Debit Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 lg:p-6 transition-shadow duration-200 hover:shadow-md">
          <h3 className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 dark:text-white mb-1 sm:mb-2">
            Total Debit
          </h3>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600 dark:text-red-400">
            -${totalDebit.toFixed(2)}
          </p>
        </div>

        {/* Net Balance Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 lg:p-6 transition-shadow duration-200 hover:shadow-md sm:col-span-2 lg:col-span-1">
          <h3 className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 dark:text-white mb-1 sm:mb-2">
            Net Balance
          </h3>
          <p
            className={`text-xl sm:text-2xl lg:text-3xl font-bold ${
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-shadow duration-200 hover:shadow-md">
        <TransactionList />
      </div>
    </div>
  );
};

export default Dashboard; 