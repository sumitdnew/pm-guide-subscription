import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import PMAssistant from './PMAssistant';
import auth from './utils/auth';
import { LogOut, User, Briefcase, Crown } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = auth.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        const user = auth.getCurrentUser();
        setCurrentUser(user);
        // Set demo state based on stored user data
        setIsDemo(user?.isDemo || false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (user) => {
    auth.login(user);
    setIsAuthenticated(true);
    setCurrentUser(user);
    setIsDemo(user.isDemo || false);
  };



  const handleLogout = () => {
    auth.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setIsDemo(false);
  };

  // Show auth screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="App">
        <Auth onLogin={handleLogin} />
      </div>
    );
  }

  // Show main app if authenticated
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Professional Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PM Guide</h1>
                <p className="text-xs text-gray-500">Product Management Framework</p>
              </div>
            </div>

            {/* User Info and Actions */}
            <div className="flex items-center space-x-4">
              {isDemo && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-medium rounded-full">
                  <Crown className="h-3 w-3" />
                  <span>DEMO</span>
                </div>
              )}
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{currentUser?.name || currentUser?.email}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PMAssistant isDemo={isDemo} />
      </main>
    </div>
  );
}

export default App;