import React, { useState } from 'react';
import { TransactionProvider } from './context/TransactionContext';
import Dashboard from './pages/Dashboard';
import Header from './components/layout/Header';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <TransactionProvider>
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        {/* Main Content */}
        <main className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <Dashboard />
        </main>
      </div>
    </TransactionProvider>
  );
};

export default App;
