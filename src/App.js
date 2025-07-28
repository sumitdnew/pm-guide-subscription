import React, { useState, useEffect } from 'react';
import PMAssistant from './PMAssistant';
import Auth from './components/Auth';
import Payment from './components/Payment';
import { auth } from './utils/auth';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check authentication status on app load
    const user = auth.getCurrentUser();
    const authenticated = auth.isAuthenticated();
    const subscribed = auth.hasActiveSubscription();

    setIsAuthenticated(authenticated);
    setHasSubscription(subscribed);
    setCurrentUser(user);
  }, []);

  const handleLogin = (email, password) => {
    try {
      const user = auth.login(email, password);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setShowAuth(false);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSignup = (email, password, name) => {
    try {
      const user = auth.signup(email, password, name);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setShowAuth(false);
      // Show payment screen for new users
      setShowPayment(true);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handlePaymentSuccess = () => {
    auth.activateSubscription();
    setHasSubscription(true);
    setShowPayment(false);
  };

  const handleLogout = () => {
    auth.logout();
    setIsAuthenticated(false);
    setHasSubscription(false);
    setCurrentUser(null);
  };

  // Show auth screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="App">
        <Auth onLogin={handleLogin} onSignup={handleSignup} />
      </div>
    );
  }

  // Show payment screen if authenticated but no subscription
  if (isAuthenticated && !hasSubscription && showPayment) {
    return (
      <div className="App">
        <Payment 
          onPaymentSuccess={handlePaymentSuccess}
          onCancel={() => setShowPayment(false)}
        />
      </div>
    );
  }

  // Show main app if authenticated and subscribed
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with user info and logout */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">PM Framework Guide</h1>
            </div>
            <div className="flex items-center space-x-4">
              {currentUser && (
                <span className="text-sm text-gray-600">
                  Welcome, {currentUser.name}!
                </span>
              )}
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <PMAssistant />
    </div>
  );
}

export default App;