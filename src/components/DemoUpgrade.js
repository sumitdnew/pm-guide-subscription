import React from 'react';
import { Crown, Star, Users, BookOpen, Zap, Shield } from 'lucide-react';

const DemoUpgrade = ({ onClose }) => {
  const features = [
    {
      icon: <Zap className="h-5 w-5 text-blue-600" />,
      title: 'All 20+ Simulators',
      description: 'Access to every framework and methodology'
    },
    {
      icon: <BookOpen className="h-5 w-5 text-purple-600" />,
      title: 'Complete Case Studies',
      description: 'Real-world examples from top companies'
    },
    {
      icon: <Users className="h-5 w-5 text-green-600" />,
      title: 'Team Collaboration',
      description: 'Share insights and work together'
    },
    {
      icon: <Shield className="h-5 w-5 text-orange-600" />,
      title: 'Priority Support',
      description: 'Get help when you need it most'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Upgrade to Full Version</h2>
                <p className="text-green-100">Unlock all features and simulators</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-green-100 hover:text-white transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className="h-6 w-6 text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-900">What You Get</h3>
              <Star className="h-6 w-6 text-yellow-500" />
            </div>
            <p className="text-gray-600">
              Upgrade from the demo version to access all 20+ simulators
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Demo vs Full Comparison */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <h4 className="font-semibold text-gray-900 mb-4 text-center">Demo vs Full Version</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600 mb-2">Demo</div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ All Frameworks Visible</li>
                  <li>✓ 2 Simulators Available</li>
                  <li>✓ All Phases</li>
                  <li>✗ Limited Simulator Access</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">Full Version</div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ All Frameworks Visible</li>
                  <li>✓ 20+ Simulators Available</li>
                  <li>✓ All Phases</li>
                  <li>✓ Complete Simulator Access</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="mb-4">
              <stripe-buy-button
                buy-button-id="buy_btn_1RsXLvQ0mQabLsGQLm7bNusI7mWaajuBxjDqOfKWE3QDaxrEuzCauHNW3esZJyYzybKqpc4BOTfj3olg4mKiJj1w00XSwh0doL"
                publishable-key="pk_live_51RpviMQ0mQabLsGQLm7bNusI7mWaajuBxjDqOfKWE3QDaxrEuzCauHNW3esZJyYzybKqpc4BOTfj3olg4mKiJj1w00XSwh0doL"
              >
              </stripe-buy-button>
            </div>
            <p className="text-sm text-gray-500">
              Secure payment powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoUpgrade; 