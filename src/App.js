import React, { useState, useEffect } from 'react';
import PMAssistant from './PMAssistant';
import EmailSubscription from './components/EmailSubscription';
import AdminPanel from './components/AdminPanel';
import analytics from './utils/analytics';
import { User, Briefcase, Crown } from 'lucide-react';

function App() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);

  // Check if user has already subscribed (stored in localStorage)
  useEffect(() => {
    const subscribed = localStorage.getItem('pm_guide_subscribed');
    const email = localStorage.getItem('pm_guide_subscriber_email');
    if (subscribed === 'true' && email) {
      setIsSubscribed(true);
      setSubscriberEmail(email);
    }
  }, []);

  // Track page view when component mounts
  useEffect(() => {
    if (isSubscribed) {
      analytics.trackPageView(window.location.pathname);
    }
  }, [isSubscribed]);

  // Admin access via keyboard shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        setShowAdmin(true);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleSubscribe = (email) => {
    // Store subscription in localStorage
    localStorage.setItem('pm_guide_subscribed', 'true');
    localStorage.setItem('pm_guide_subscriber_email', email);
    
    setIsSubscribed(true);
    setSubscriberEmail(email);
    
    // Track subscription event
    analytics.trackEvent('email_subscription', {
      email: email,
      timestamp: new Date().toISOString()
    });
  };

  // Show subscription page if not subscribed
  if (!isSubscribed) {
    return <EmailSubscription onSubscribe={handleSubscribe} />;
  }

  // Show admin panel if admin mode is active
  if (showAdmin) {
    return <AdminPanel onClose={() => setShowAdmin(false)} />;
  }

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

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-medium rounded-full">
                <Crown className="h-3 w-3" />
                <span>FREE</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{subscriberEmail}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PMAssistant isDemo={false} />
      </main>

      {/* Hidden Admin Access */}
      <footer className="mt-auto py-4 text-center">
        <button
          onClick={() => setShowAdmin(true)}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors opacity-30 hover:opacity-100"
          title="Admin Access (Ctrl+Shift+A)"
        >
          Admin
        </button>
      </footer>
    </div>
  );
}

export default App;