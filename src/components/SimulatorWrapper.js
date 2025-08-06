import React from 'react';
import { Grid } from 'lucide-react';

const SimulatorWrapper = ({ 
  children, 
  onViewAllSimulators, 
  onViewCaseStudies,
  frameworkId
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer with buttons */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Learn more link can be added by individual simulators if needed */}
            </div>
            
            <div className="flex items-center space-x-2">
              {onViewCaseStudies && frameworkId && (
                <button
                  onClick={() => onViewCaseStudies(frameworkId)}
                  className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  View Case Studies
                </button>
              )}
              
              {onViewAllSimulators && (
                <button
                  onClick={onViewAllSimulators}
                  className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Grid className="h-4 w-4" />
                  <span>View All Simulators</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorWrapper; 