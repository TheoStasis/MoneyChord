import React from 'react';
import { TransactionProvider } from './context/TransactionContext';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <TransactionProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Dashboard />
        </main>
      </div>
    </TransactionProvider>
  );
}

export default App;
