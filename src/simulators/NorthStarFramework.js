import React, { useState } from 'react';
import { Building2, Grid } from 'lucide-react';

const NorthStarFramework = ({ onViewCaseStudies, onViewAllSimulators }) => {
  const [inputs, setInputs] = useState({
    northStarMetric: '',
    keyDrivers: ['', '', '']
  });

  const updateKeyDriver = (index, value) => {
    const newKeyDrivers = [...inputs.keyDrivers];
    newKeyDrivers[index] = value;
    setInputs(prev => ({...prev, keyDrivers: newKeyDrivers}));
  };

  return (
    <div className="bg-emerald-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-emerald-900 mb-6">North Star Metrics Framework</h2>
      
      <div className="bg-emerald-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-emerald-900 mb-2">About North Star Metrics Framework</h3>
        <p className="text-emerald-800 text-sm mb-3">
          The North Star Metric is the single most important metric that captures the core value your product delivers 
          to customers. It aligns teams around a common goal and helps focus product decisions on what truly matters 
          for long-term success and sustainable growth.
        </p>
        <div className="flex items-center justify-between">
          <a 
            href="https://amplitude.com/blog/north-star-metric" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-800 text-sm font-medium underline"
          >
            Learn more about North Star Metrics →
          </a>
          <div className="flex items-center space-x-2">
            {onViewCaseStudies && (
              <button
                onClick={() => onViewCaseStudies('northstar')}
                className="flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors"
              >
                <Building2 className="h-4 w-4 mr-1" />
                View Case Studies
              </button>
            )}
            {onViewAllSimulators && (
              <button
                onClick={onViewAllSimulators}
                className="flex items-center space-x-2 px-4 py-2 text-emerald-600 hover:text-emerald-800 transition-colors"
              >
                <Grid className="h-4 w-4" />
                <span>View All Simulators</span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-emerald-800 mb-2">
            ⭐ North Star Metric
          </label>
          <input
            type="text"
            value={inputs.northStarMetric}
            onChange={(e) => setInputs(prev => ({...prev, northStarMetric: e.target.value}))}
            placeholder="e.g., Daily Active Users, Customer Lifetime Value, Time in App"
            className="w-full p-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
          <p className="text-xs text-emerald-600 mt-1">What single metric best represents your product's success?</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-emerald-800 mb-2">
            🎯 Key Drivers (3 recommended)
          </label>
          <div className="space-y-3">
            {inputs.keyDrivers.map((driver, index) => (
              <div key={index} className="flex items-center">
                <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-800 font-semibold text-sm mr-3">
                  {index + 1}
                </div>
                <input
                  type="text"
                  value={driver}
                  onChange={(e) => updateKeyDriver(index, e.target.value)}
                  placeholder={`e.g., ${index === 0 ? 'User engagement rate' : index === 1 ? 'Feature adoption' : 'Retention rate'}`}
                  className="flex-1 p-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-emerald-600 mt-2">What factors directly influence your North Star Metric?</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-emerald-200">
        <h3 className="text-lg font-semibold text-emerald-900 mb-4">North Star Framework</h3>
        
        {inputs.northStarMetric && (
          <div className="bg-emerald-100 p-4 rounded-lg mb-4">
            <div className="flex items-center mb-2">
              <div className="text-3xl mr-3">⭐</div>
              <h4 className="font-semibold text-emerald-900">North Star Metric</h4>
            </div>
            <p className="text-emerald-800 text-lg">{inputs.northStarMetric}</p>
          </div>
        )}

        {inputs.keyDrivers.some(driver => driver.trim() !== '') && (
          <div className="bg-emerald-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-emerald-900 mb-3">Key Drivers</h4>
            <div className="space-y-2">
              {inputs.keyDrivers.map((driver, index) => (
                driver.trim() !== '' && (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-800 font-semibold text-xs mr-3 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-emerald-800">{driver}</p>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        <div className="bg-emerald-100 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-emerald-900 mb-3">Implementation Steps</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-emerald-800">
            <div>
              <strong className="text-emerald-900">1. Measure:</strong>
              <p className="mt-1">Set up tracking and establish baseline</p>
            </div>
            <div>
              <strong className="text-emerald-900">2. Monitor:</strong>
              <p className="mt-1">Track daily/weekly trends and patterns</p>
            </div>
            <div>
              <strong className="text-emerald-900">3. Align:</strong>
              <p className="mt-1">Ensure all teams understand and focus on it</p>
            </div>
            <div>
              <strong className="text-emerald-900">4. Optimize:</strong>
              <p className="mt-1">Make product decisions based on impact</p>
            </div>
            <div className="md:col-span-2">
              <strong className="text-emerald-900">5. Evolve:</strong>
              <p className="mt-1">Refine the metric as your product and market mature</p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 p-4 rounded-lg">
          <h4 className="font-semibold text-emerald-900 mb-3">Company Examples</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="text-emerald-800">
                <strong>Airbnb:</strong> Nights booked
              </div>
              <div className="text-emerald-800">
                <strong>Facebook:</strong> Daily Active Users
              </div>
              <div className="text-emerald-800">
                <strong>Spotify:</strong> Time spent listening
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-emerald-800">
                <strong>Slack:</strong> Messages sent per day
              </div>
              <div className="text-emerald-800">
                <strong>Uber:</strong> Rides completed
              </div>
              <div className="text-emerald-800">
                <strong>Netflix:</strong> Hours streamed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NorthStarFramework;
