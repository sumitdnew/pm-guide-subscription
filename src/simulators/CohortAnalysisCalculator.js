import React, { useState } from 'react';

const CohortAnalysisCalculator = () => {
  const [inputs, setInputs] = useState({
    cohortSize: '',
    retentionRates: ['', '', '', '', '', '', '', '', '', '', '', ''],
    cohortName: '',
    timePeriod: 'month'
  });

  const updateRetentionRate = (index, value) => {
    const newRates = [...inputs.retentionRates];
    newRates[index] = value;
    setInputs(prev => ({...prev, retentionRates: newRates}));
  };

  const calculateCohortMetrics = () => {
    const { cohortSize, retentionRates } = inputs;
    if (!cohortSize || retentionRates.every(rate => !rate)) return null;

    const rates = retentionRates.map(rate => parseFloat(rate) || 0).filter(rate => rate > 0);
    const totalRetention = rates.reduce((sum, rate) => sum + rate, 0);
    const averageRetention = rates.length > 0 ? totalRetention / rates.length : 0;
    const lifetimeValue = (parseFloat(cohortSize) * averageRetention / 100) || 0;

    return {
      rates,
      averageRetention,
      lifetimeValue,
      totalRetention
    };
  };

  const getRetentionInsights = (metrics) => {
    if (!metrics) return null;

    const { averageRetention } = metrics;
    
    if (averageRetention >= 80) {
      return {
        status: 'Excellent',
        color: 'text-green-600',
        bg: 'bg-green-100',
        insight: 'Strong retention indicates high product-market fit and user satisfaction.'
      };
    } else if (averageRetention >= 60) {
      return {
        status: 'Good',
        color: 'text-blue-600',
        bg: 'bg-blue-100',
        insight: 'Good retention with room for improvement. Focus on user engagement.'
      };
    } else if (averageRetention >= 40) {
      return {
        status: 'Fair',
        color: 'text-yellow-600',
        bg: 'bg-yellow-100',
        insight: 'Moderate retention. Investigate user experience and onboarding.'
      };
    } else {
      return {
        status: 'Poor',
        color: 'text-red-600',
        bg: 'bg-red-100',
        insight: 'Low retention indicates serious product-market fit issues.'
      };
    }
  };

  const metrics = calculateCohortMetrics();
  const insights = getRetentionInsights(metrics);

  return (
    <div className="bg-rose-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-rose-900 mb-6">Cohort Analysis Calculator</h2>
      
      <div className="bg-rose-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-rose-900 mb-2">About Cohort Analysis Framework</h3>
        <p className="text-rose-800 text-sm mb-3">
          Cohort analysis tracks groups of users over time to understand retention patterns and user behavior. 
          It helps identify when users drop off, which features drive retention, and how to improve user engagement 
          and reduce churn.
        </p>
        <a 
          href="https://amplitude.com/blog/cohort-analysis" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-rose-600 hover:text-rose-800 text-sm font-medium underline"
        >
          Learn more about Cohort Analysis →
        </a>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-rose-800 mb-2">
            Cohort Name
          </label>
          <input
            type="text"
            value={inputs.cohortName}
            onChange={(e) => setInputs(prev => ({...prev, cohortName: e.target.value}))}
            placeholder="e.g., January 2024 Signups"
            className="w-full p-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-rose-800 mb-2">
            Cohort Size
          </label>
          <input
            type="number"
            value={inputs.cohortSize}
            onChange={(e) => setInputs(prev => ({...prev, cohortSize: e.target.value}))}
            placeholder="e.g., 1000"
            className="w-full p-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-rose-800 mb-2">
            Time Period
          </label>
          <select
            value={inputs.timePeriod}
            onChange={(e) => setInputs(prev => ({...prev, timePeriod: e.target.value}))}
            className="w-full p-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500"
          >
            <option value="day">Daily</option>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
            <option value="quarter">Quarterly</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-rose-200 mb-6">
        <h3 className="text-lg font-semibold text-rose-900 mb-4">Retention Rates by Period</h3>
        
        <div className="grid grid-cols-6 md:grid-cols-12 gap-3">
          {inputs.retentionRates.map((rate, index) => (
            <div key={index}>
              <label className="block text-xs font-medium text-rose-800 mb-1">
                {index === 0 ? 'Day 1' : 
                 index === 1 ? 'Day 7' : 
                 index === 2 ? 'Day 30' : 
                 `Period ${index + 1}`}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={rate}
                onChange={(e) => updateRetentionRate(index, e.target.value)}
                placeholder="%"
                className="w-full p-2 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 text-sm"
              />
            </div>
          ))}
        </div>
        
        <p className="text-xs text-rose-600 mt-2">
          Enter retention percentages for each time period (0-100%)
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 border border-rose-200">
        <h3 className="text-lg font-semibold text-rose-900 mb-4">Cohort Analysis Results</h3>
        
        {metrics ? (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-rose-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-rose-600 mb-1">
                  {metrics.averageRetention.toFixed(1)}%
                </div>
                <div className="text-sm text-rose-700">Average Retention</div>
              </div>
              
              <div className="bg-rose-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-rose-600 mb-1">
                  {metrics.churnRate.toFixed(1)}%
                </div>
                <div className="text-sm text-rose-700">Churn Rate</div>
              </div>
              
              <div className="bg-rose-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-rose-600 mb-1">
                  {metrics.rates.length}
                </div>
                <div className="text-sm text-rose-700">Periods Tracked</div>
              </div>
              
              <div className="bg-rose-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-rose-600 mb-1">
                  {metrics.lifetimeValue.toFixed(0)}
                </div>
                <div className="text-sm text-rose-700">Retained Users</div>
              </div>
            </div>

            {insights && (
              <div className={`p-4 rounded-lg ${insights.bg}`}>
                <div className="flex items-center mb-2">
                  <div className={`text-lg font-semibold ${insights.color}`}>
                    {insights.status} Retention
                  </div>
                </div>
                <p className={`text-sm ${insights.color.replace('text-', 'text-').replace('-600', '-700')}`}>
                  {insights.insight}
                </p>
              </div>
            )}

            <div className="bg-rose-100 p-4 rounded-lg">
              <h4 className="font-semibold text-rose-900 mb-3">Retention Trends</h4>
              <div className="space-y-2">
                {metrics.rates.map((rate, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-rose-700">
                      {index === 0 ? 'Day 1' : 
                       index === 1 ? 'Day 7' : 
                       index === 2 ? 'Day 30' : 
                       `Period ${index + 1}`}
                    </span>
                    <div className="flex items-center">
                      <div className="w-24 bg-rose-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-rose-600 h-2 rounded-full" 
                          style={{ width: `${rate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-rose-700 w-12 text-right">
                        {rate}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-rose-50 p-4 rounded-lg">
              <h4 className="font-semibold text-rose-900 mb-3">Recommendations</h4>
              <ul className="space-y-2 text-sm text-rose-800">
                <li className="flex items-start">
                  <span className="text-rose-600 mr-2">•</span>
                  <span><strong>Early Drop-off:</strong> Focus on onboarding and first-time user experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-600 mr-2">•</span>
                  <span><strong>Mid-term Retention:</strong> Identify and promote high-value features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-600 mr-2">•</span>
                  <span><strong>Long-term Engagement:</strong> Build habit-forming features and community</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-600 mr-2">•</span>
                  <span><strong>Data Collection:</strong> Track user behavior to identify retention drivers</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center text-rose-600 py-8">
            Enter cohort size and retention rates to analyze your cohort data
          </div>
        )}
      </div>
    </div>
  );
};

export default CohortAnalysisCalculator; 