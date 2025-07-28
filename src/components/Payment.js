import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, CheckCircle, Star, Users, BookOpen, Zap } from 'lucide-react';

const Payment = ({ onPaymentSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async () => {
    setLoading(true);
    setError('');

    try {
      // In a real app, you'd call your backend to create a Stripe checkout session
      // For now, we'll simulate the payment flow
      const stripe = await loadStripe('pk_test_your_publishable_key'); // Replace with your Stripe key
      
      // Simulate payment success
      setTimeout(() => {
        onPaymentSuccess();
        setLoading(false);
      }, 2000);

    } catch (err) {
      setError('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Subscription
          </h1>
          <p className="text-gray-600">
            Get unlimited access to all PM frameworks and case studies
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Plan Details */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl p-6">
            <div className="text-center mb-6">
              <Star className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Pro Plan</h2>
              <div className="text-4xl font-bold mb-2">$10</div>
              <div className="text-blue-100">per month</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-3" />
                <span>20+ Interactive Framework Simulators</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-3" />
                <span>15+ Real-World Case Studies</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-3" />
                <span>Phase-based Framework Filtering</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-3" />
                <span>Professional UI & Responsive Design</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-3" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Information
              </h3>
              <p className="text-sm text-gray-600">
                Secure payment powered by Stripe. Your payment information is encrypted and secure.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Subscribe for $10/month'}
              </button>

              <button
                onClick={onCancel}
                className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
                You can cancel your subscription at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Zap className="h-6 w-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Instant Access</span>
              <span className="text-xs text-gray-500">Get started immediately</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-6 w-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Trusted by PMs</span>
              <span className="text-xs text-gray-500">Used by product teams worldwide</span>
            </div>
            <div className="flex flex-col items-center">
              <BookOpen className="h-6 w-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Always Updated</span>
              <span className="text-xs text-gray-500">New frameworks added regularly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 