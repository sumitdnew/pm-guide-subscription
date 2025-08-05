import React from 'react';
import { Crown, BookOpen, Zap, Shield, ArrowLeft, CheckCircle } from 'lucide-react';

const UpgradePage = ({ onClose, isDemo = true }) => {
  console.log('UpgradePage rendered - onClose:', onClose, 'isDemo:', isDemo);
  const benefits = [
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: 'All 20+ Simulators',
      description: 'Access to every framework and methodology including RICE, ICE, JTBD, Forces Analysis, and more',
      features: ['RICE Calculator', 'ICE Scoring', 'JTBD Generator', 'Forces Analysis', 'Kano Analysis', 'PMF Measurement']
    },
    {
      icon: <BookOpen className="h-6 w-6 text-purple-600" />,
      title: 'Complete Case Studies',
      description: 'Real-world examples from top companies showing how frameworks are applied in practice',
      features: ['Netflix Case Studies', 'Spotify Examples', 'Airbnb Success Stories', 'Uber Growth Tactics', 'Slack PMF Journey']
    }
  ];

  const frameworks = [
    { name: 'RICE Calculator', category: 'Prioritization', status: 'Available' },
    { name: 'ICE Scoring', category: 'Prioritization', status: 'Available' },
    { name: 'JTBD Generator', category: 'Discovery', status: 'Upgrade Required' },
    { name: 'Forces Analysis', category: 'Strategy', status: 'Upgrade Required' },
    { name: 'Kano Analysis', category: 'Strategy', status: 'Upgrade Required' },
    { name: 'PMF Measurement', category: 'Validation', status: 'Upgrade Required' },
    { name: 'SWOT Analysis', category: 'Strategy', status: 'Upgrade Required' },
    { name: 'AARRR Metrics', category: 'Growth', status: 'Upgrade Required' },
    { name: 'OKR Generator', category: 'Planning', status: 'Upgrade Required' },
    { name: 'North Star Framework', category: 'Strategy', status: 'Upgrade Required' },
    { name: 'MoSCoW Method', category: 'Prioritization', status: 'Upgrade Required' },
    { name: 'User Persona Generator', category: 'Discovery', status: 'Upgrade Required' },
    { name: 'Cohort Analysis', category: 'Analytics', status: 'Upgrade Required' },
    { name: 'A/B Test Calculator', category: 'Validation', status: 'Upgrade Required' },
    { name: 'Customer Lifetime Value', category: 'Analytics', status: 'Upgrade Required' },
    { name: 'Competitive Analysis', category: 'Strategy', status: 'Upgrade Required' },
    { name: 'Pricing Strategy', category: 'Strategy', status: 'Upgrade Required' },
    { name: 'Market Size Calculator', category: 'Strategy', status: 'Upgrade Required' },
    { name: 'Customer Development', category: 'Discovery', status: 'Upgrade Required' },
    { name: 'Design Thinking', category: 'Discovery', status: 'Upgrade Required' },
    { name: 'Value Proposition Canvas', category: 'Strategy', status: 'Upgrade Required' },
    { name: 'Go-to-Market Strategy', category: 'Launch', status: 'Upgrade Required' },
    { name: 'Growth Hacking', category: 'Growth', status: 'Upgrade Required' }
  ];

  const handlePurchase = () => {
    // Test mode Stripe checkout link
    window.open('https://buy.stripe.com/test_eVq5kF2zI7nbfVDcsfdjO00', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 fixed inset-0 z-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Demo</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                <Crown className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Upgrade to Full Version</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Unlock Your Full Potential</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get access to all 20+ frameworks and simulators, complete case studies, and comprehensive tools.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 mb-4">{benefit.description}</p>
                  <div className="grid grid-cols-1 gap-2">
                    {benefit.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Frameworks Comparison */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Framework Library</h2>
            <p className="text-gray-600">Access to all 20+ frameworks and simulators</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {frameworks.map((framework, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                framework.status === 'Available' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{framework.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    framework.status === 'Available'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {framework.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{framework.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600">One-time payment for lifetime access</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Demo Version */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Demo Version</h3>
                <p className="text-gray-600">Free trial</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2 text-sm text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>2 Simulators Available</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>All Frameworks Visible</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Basic Features</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-800">
                  <span className="h-4 w-4 border border-gray-500 rounded-full"></span>
                  <span>Limited Access</span>
                </li>
              </ul>
            </div>

            {/* Full Version */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-xs font-medium">
                  RECOMMENDED
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Full Version</h3>
                <p className="text-green-100">Lifetime access</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-200" />
                  <span>All 20+ Simulators</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-200" />
                  <span>Complete Case Studies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-2xl mx-auto">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Upgrade?</h3>
              <p className="text-gray-600 mb-6">
                Join thousands of product managers who have transformed their approach with our comprehensive framework library.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">What happens after purchase?</span>
                </div>
                <p className="text-blue-700 text-sm">
                  After completing your purchase, you'll receive your login credentials within 24 hours via email. 
                  You'll have instant access to all 20+ simulators and complete case studies.
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              {/* Primary Purchase Button */}
              <button
                onClick={handlePurchase}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Crown className="h-5 w-5 mr-2" />
                Upgrade to Full Version - $29.99
              </button>
              <p className="text-sm text-gray-600 mt-3">
                Secure payment powered by Stripe
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>30-Day Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage; 