import React, { useState } from 'react';
import { Building2, Grid } from 'lucide-react';

const KanoAnalyzer = ({ onViewCaseStudies, onViewAllSimulators }) => {
  const [inputs, setInputs] = useState({
    featureName: '',
    category: ''
  });

  const categories = [
    { 
      value: 'basic', 
      label: 'Basic (Must-Have)', 
      description: 'Must-haves that prevent dissatisfaction',
      examples: 'Security, reliability, core functionality'
    },
    { 
      value: 'performance', 
      label: 'Performance (Linear)', 
      description: 'More is better, linear satisfaction',
      examples: 'Speed, storage, efficiency'
    },
    { 
      value: 'delight', 
      label: 'Delight (Excitement)', 
      description: 'Unexpected features creating advocates',
      examples: 'AI assistance, easter eggs, premium features'
    }
  ];

  const getPrioritizationGuidance = (category) => {
    switch (category) {
      case 'basic':
        return {
          priority: 'High Priority',
          guidance: 'Must be implemented first. These are table stakes and customers expect them.',
          color: 'text-red-600',
          bg: 'bg-red-100'
        };
      case 'performance':
        return {
          priority: 'Medium Priority',
          guidance: 'Implement based on resources and competitive analysis. More is generally better.',
          color: 'text-blue-600',
          bg: 'bg-blue-100'
        };
      case 'delight':
        return {
          priority: 'Strategic Priority',
          guidance: 'Differentiators that can create competitive advantage. Implement selectively.',
          color: 'text-green-600',
          bg: 'bg-green-100'
        };
      default:
        return {
          priority: 'Select Category',
          guidance: 'Choose a category to get prioritization guidance.',
          color: 'text-gray-600',
          bg: 'bg-gray-100'
        };
    }
  };

  const guidance = getPrioritizationGuidance(inputs.category);

  return (
    <div className="bg-yellow-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-yellow-900 mb-6">Kano Model Feature Analyzer</h2>
      
      <div className="bg-yellow-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-yellow-900 mb-2">About Kano Model Framework</h3>
        <p className="text-yellow-800 text-sm mb-3">
          The Kano Model categorizes product features based on their impact on customer satisfaction. It helps teams 
          understand which features are must-haves, performance drivers, or delighters, enabling better prioritization 
          and resource allocation decisions.
        </p>
        <div className="flex items-center justify-between">
          <a 
            href="https://www.mindtools.com/pages/article/newTMC_85.htm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-yellow-600 hover:text-yellow-800 text-sm font-medium underline"
          >
            Learn more about Kano Model →
          </a>
          <div className="flex items-center space-x-2">
            {onViewCaseStudies && (
              <button
                onClick={() => onViewCaseStudies('kano')}
                className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors"
              >
                <Building2 className="h-4 w-4 mr-1" />
                View Case Studies
              </button>
            )}
            {onViewAllSimulators && (
              <button
                onClick={onViewAllSimulators}
                className="flex items-center space-x-2 px-4 py-2 text-yellow-600 hover:text-yellow-800 transition-colors"
              >
                <Grid className="h-4 w-4" />
                <span>View All Simulators</span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-yellow-800 mb-2">
            Feature Name
          </label>
          <input
            type="text"
            value={inputs.featureName}
            onChange={(e) => setInputs(prev => ({...prev, featureName: e.target.value}))}
            placeholder="e.g., Dark mode, Push notifications, Analytics dashboard"
            className="w-full p-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-yellow-800 mb-2">
            Feature Category
          </label>
          <select
            value={inputs.category}
            onChange={(e) => setInputs(prev => ({...prev, category: e.target.value}))}
            className="w-full p-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Select a category...</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4">Feature Categories</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {categories.map(cat => (
            <div 
              key={cat.value}
              className={`p-4 rounded-lg border-2 ${
                inputs.category === cat.value 
                  ? 'border-yellow-400 bg-yellow-100' 
                  : 'border-yellow-200 bg-yellow-50'
              }`}
            >
              <h4 className="font-semibold text-yellow-800 mb-2">{cat.label}</h4>
              <p className="text-sm text-yellow-700 mb-2">{cat.description}</p>
              <p className="text-xs text-yellow-600"><strong>Examples:</strong> {cat.examples}</p>
            </div>
          ))}
        </div>

        {inputs.featureName && inputs.category && (
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Analysis Results</h4>
            <div className="space-y-2">
              <div className="text-yellow-800">
                <strong>Feature:</strong> {inputs.featureName}
              </div>
              <div className="text-yellow-800">
                <strong>Category:</strong> {categories.find(c => c.value === inputs.category)?.label}
              </div>
            </div>
          </div>
        )}

        <div className={`mt-4 p-4 rounded-lg ${guidance.bg}`}>
          <h4 className="font-semibold text-yellow-900 mb-2">Prioritization Guidance</h4>
          <div className={`text-lg font-semibold ${guidance.color} mb-2`}>
            {guidance.priority}
          </div>
          <p className="text-yellow-800">{guidance.guidance}</p>
        </div>
      </div>
    </div>
  );
};

export default KanoAnalyzer;
