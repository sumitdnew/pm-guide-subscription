import React, { useState } from 'react';
import { Building2, Grid } from 'lucide-react';

const AarrrMetrics = ({ onViewCaseStudies, onViewAllSimulators }) => {
  const [inputs, setInputs] = useState({
    acquisition: '',
    activation: '',
    retention: '',
    revenue: '',
    referral: ''
  });

  const getOptimizationFocus = () => {
    const { acquisition, activation, retention, revenue, referral } = inputs;
    const hasData = acquisition || activation || retention || revenue || referral;
    
    if (!hasData) return "Enter your metrics to get optimization recommendations.";
    
    return "Start with Activation → Retention → Revenue → Referrals → Scale Acquisition";
  };

  return (
    <div className="bg-orange-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-orange-900 mb-6">AARRR Pirate Metrics Dashboard</h2>
      
      <div className="bg-orange-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-orange-900 mb-2">About AARRR Pirate Metrics Framework</h3>
        <p className="text-orange-800 text-sm mb-3">
          AARRR (Acquisition, Activation, Retention, Revenue, Referral) is a framework for tracking user lifecycle 
          and business metrics. It helps product teams understand where users drop off and optimize each stage of the 
          customer journey for growth and success.
        </p>
        <div className="flex items-center justify-between">
          <a 
            href="https://www.500hats.com/startup-metrics-pirates/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-600 hover:text-orange-800 text-sm font-medium underline"
          >
            Learn more about AARRR →
          </a>
          <div className="flex items-center space-x-2">
            {onViewCaseStudies && (
              <button
                onClick={() => onViewCaseStudies('aarrr')}
                className="flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors"
              >
                <Building2 className="h-4 w-4 mr-1" />
                View Case Studies
              </button>
            )}
            {onViewAllSimulators && (
              <button
                onClick={onViewAllSimulators}
                className="flex items-center space-x-2 px-4 py-2 text-orange-600 hover:text-orange-800 transition-colors"
              >
                <Grid className="h-4 w-4" />
                <span>View All Simulators</span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-orange-800 mb-2">
            🚢 Acquisition
          </label>
          <input
            type="text"
            value={inputs.acquisition}
            onChange={(e) => setInputs(prev => ({...prev, acquisition: e.target.value}))}
            placeholder="e.g., 10,000 users/month"
            className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          <p className="text-xs text-orange-600 mt-1">How do users find you?</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-orange-800 mb-2">
            ⚡ Activation
          </label>
          <input
            type="text"
            value={inputs.activation}
            onChange={(e) => setInputs(prev => ({...prev, activation: e.target.value}))}
            placeholder="e.g., 25% complete onboarding"
            className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          <p className="text-xs text-orange-600 mt-1">First positive experience?</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-orange-800 mb-2">
            🔄 Retention
          </label>
          <input
            type="text"
            value={inputs.retention}
            onChange={(e) => setInputs(prev => ({...prev, retention: e.target.value}))}
            placeholder="e.g., 60% return after 30 days"
            className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          <p className="text-xs text-orange-600 mt-1">Do users come back?</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-orange-800 mb-2">
            💰 Revenue
          </label>
          <input
            type="text"
            value={inputs.revenue}
            onChange={(e) => setInputs(prev => ({...prev, revenue: e.target.value}))}
            placeholder="e.g., $50,000 MRR"
            className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          <p className="text-xs text-orange-600 mt-1">How do you monetize?</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-orange-800 mb-2">
            📢 Referral
          </label>
          <input
            type="text"
            value={inputs.referral}
            onChange={(e) => setInputs(prev => ({...prev, referral: e.target.value}))}
            placeholder="e.g., 15% referral rate"
            className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          <p className="text-xs text-orange-600 mt-1">Do users refer others?</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-900 mb-4">Metrics Dashboard</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-orange-50 p-4 rounded-lg text-center border border-orange-200">
            <div className="text-2xl mb-2">🚢</div>
            <div className="text-sm font-semibold text-orange-800 mb-1">Acquisition</div>
            <div className="text-orange-600 text-sm">{inputs.acquisition || '—'}</div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg text-center border border-orange-200">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-sm font-semibold text-orange-800 mb-1">Activation</div>
            <div className="text-orange-600 text-sm">{inputs.activation || '—'}</div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg text-center border border-orange-200">
            <div className="text-2xl mb-2">🔄</div>
            <div className="text-sm font-semibold text-orange-800 mb-1">Retention</div>
            <div className="text-orange-600 text-sm">{inputs.retention || '—'}</div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg text-center border border-orange-200">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-sm font-semibold text-orange-800 mb-1">Revenue</div>
            <div className="text-orange-600 text-sm">{inputs.revenue || '—'}</div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg text-center border border-orange-200">
            <div className="text-2xl mb-2">📢</div>
            <div className="text-sm font-semibold text-orange-800 mb-1">Referral</div>
            <div className="text-orange-600 text-sm">{inputs.referral || '—'}</div>
          </div>
        </div>

        <div className="bg-orange-100 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-900 mb-2">Optimization Strategy</h4>
          <p className="text-orange-800">{getOptimizationFocus()}</p>
        </div>

        <div className="mt-4 bg-orange-50 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-900 mb-2">Focus Areas by Stage</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-orange-800">Early Stage:</strong>
              <ul className="text-orange-700 mt-1 space-y-1">
                <li>• Focus on Activation & Retention</li>
                <li>• Optimize onboarding</li>
                <li>• Build core value</li>
              </ul>
            </div>
            <div>
              <strong className="text-orange-800">Growth Stage:</strong>
              <ul className="text-orange-700 mt-1 space-y-1">
                <li>• Scale Acquisition</li>
                <li>• Optimize Revenue</li>
                <li>• Leverage Referrals</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AarrrMetrics;
