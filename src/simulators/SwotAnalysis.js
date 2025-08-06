import React, { useState } from 'react';
import { Building2, Grid } from 'lucide-react';

const SwotAnalysis = ({ onViewCaseStudies, onViewAllSimulators }) => {
  const [inputs, setInputs] = useState({
    strengths: '',
    weaknesses: '',
    opportunities: '',
    threats: ''
  });

  const getStrategicInsights = () => {
    const { strengths, weaknesses, opportunities, threats } = inputs;
    const hasStrengths = strengths.trim() !== '';
    const hasWeaknesses = weaknesses.trim() !== '';
    const hasOpportunities = opportunities.trim() !== '';
    const hasThreats = threats.trim() !== '';

    if (hasStrengths && hasOpportunities) {
      return "Leverage your strengths to capitalize on opportunities (SO Strategy)";
    } else if (hasWeaknesses && hasThreats) {
      return "Address weaknesses to mitigate threats (WT Strategy)";
    } else if (hasStrengths && hasThreats) {
      return "Use strengths to counter threats (ST Strategy)";
    } else if (hasWeaknesses && hasOpportunities) {
      return "Overcome weaknesses to pursue opportunities (WO Strategy)";
    }
    return "Complete the SWOT analysis to get strategic insights.";
  };

  return (
    <div className="bg-indigo-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-indigo-900 mb-6">SWOT Analysis</h2>
      
      {/* Navigation */}
      {onViewAllSimulators && (
        <div className="flex justify-center mb-6">
          <button
            onClick={onViewAllSimulators}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200 shadow-sm"
          >
            <Grid className="h-4 w-4" />
            <span>View All Simulators</span>
          </button>
        </div>
      )}
      
      <div className="bg-indigo-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-indigo-900 mb-2">About SWOT Analysis Framework</h3>
        <p className="text-indigo-800 text-sm mb-3">
          SWOT Analysis evaluates Strengths, Weaknesses, Opportunities, and Threats to understand your competitive 
          position and strategic options. It helps identify internal capabilities and external factors that can 
          impact your product strategy and market success.
        </p>
        <div className="flex items-center justify-between">
          <a 
            href="https://www.mindtools.com/pages/article/newTMC_05.htm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium underline"
          >
            Learn more about SWOT →
          </a>
          {onViewCaseStudies && (
            <button
              onClick={() => onViewCaseStudies('swot')}
              className="flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-colors"
            >
              <Building2 className="h-4 w-4 mr-1" />
              View Case Studies
            </button>
          )}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-indigo-800 mb-2">
            Strengths (Internal Positive)
          </label>
          <textarea
            value={inputs.strengths}
            onChange={(e) => setInputs(prev => ({...prev, strengths: e.target.value}))}
            placeholder="e.g., Strong team, unique technology, brand recognition, financial resources"
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-green-100 min-h-[100px]"
          />
          <p className="text-xs text-indigo-600 mt-1">What are your internal advantages?</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-indigo-800 mb-2">
            Weaknesses (Internal Negative)
          </label>
          <textarea
            value={inputs.weaknesses}
            onChange={(e) => setInputs(prev => ({...prev, weaknesses: e.target.value}))}
            placeholder="e.g., Limited resources, lack of expertise, poor processes, weak brand"
            className="w-full p-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-red-100 min-h-[100px]"
          />
          <p className="text-xs text-indigo-600 mt-1">What are your internal disadvantages?</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-indigo-800 mb-2">
            Opportunities (External Positive)
          </label>
          <textarea
            value={inputs.opportunities}
            onChange={(e) => setInputs(prev => ({...prev, opportunities: e.target.value}))}
            placeholder="e.g., Market growth, new technology, regulatory changes, partnerships"
            className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-blue-100 min-h-[100px]"
          />
          <p className="text-xs text-indigo-600 mt-1">What external factors can you leverage?</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-indigo-800 mb-2">
            Threats (External Negative)
          </label>
          <textarea
            value={inputs.threats}
            onChange={(e) => setInputs(prev => ({...prev, threats: e.target.value}))}
            placeholder="e.g., Competition, market changes, economic downturn, regulations"
            className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-orange-100 min-h-[100px]"
          />
          <p className="text-xs text-indigo-600 mt-1">What external factors pose risks?</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4">SWOT Analysis Results</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Internal Factors</h4>
            <div className="space-y-2">
              <div className="text-sm text-green-700">
                <strong>Strengths:</strong> {inputs.strengths || 'Not specified'}
              </div>
              <div className="text-sm text-red-700">
                <strong>Weaknesses:</strong> {inputs.weaknesses || 'Not specified'}
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">External Factors</h4>
            <div className="space-y-2">
              <div className="text-sm text-blue-700">
                <strong>Opportunities:</strong> {inputs.opportunities || 'Not specified'}
              </div>
              <div className="text-sm text-orange-700">
                <strong>Threats:</strong> {inputs.threats || 'Not specified'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-100 p-4 rounded-lg">
          <h4 className="font-semibold text-indigo-900 mb-2">Strategic Insights</h4>
          <p className="text-indigo-800">{getStrategicInsights()}</p>
        </div>

        <div className="mt-4 bg-indigo-50 p-4 rounded-lg">
          <h4 className="font-semibold text-indigo-900 mb-2">SWOT Strategy Matrix</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-green-100 p-3 rounded">
              <strong className="text-green-800">SO Strategy:</strong>
              <p className="text-green-700 mt-1">Use strengths to capitalize on opportunities</p>
            </div>
            <div className="bg-blue-100 p-3 rounded">
              <strong className="text-blue-800">WO Strategy:</strong>
              <p className="text-blue-700 mt-1">Overcome weaknesses to pursue opportunities</p>
            </div>
            <div className="bg-red-100 p-3 rounded">
              <strong className="text-red-800">ST Strategy:</strong>
              <p className="text-red-700 mt-1">Use strengths to counter threats</p>
            </div>
            <div className="bg-orange-100 p-3 rounded">
              <strong className="text-orange-800">WT Strategy:</strong>
              <p className="text-orange-700 mt-1">Address weaknesses to mitigate threats</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwotAnalysis;