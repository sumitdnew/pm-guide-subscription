import React, { useState } from 'react';
import { Building2, Grid } from 'lucide-react';

const OkrGenerator = ({ onViewCaseStudies, onViewAllSimulators }) => {
  const [inputs, setInputs] = useState({
    objective: '',
    keyResults: ['', '', '']
  });

  const updateKeyResult = (index, value) => {
    const newKeyResults = [...inputs.keyResults];
    newKeyResults[index] = value;
    setInputs(prev => ({...prev, keyResults: newKeyResults}));
  };

  return (
    <div className="bg-cyan-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-cyan-900 mb-6">OKR Generator</h2>
      
      <div className="bg-cyan-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-cyan-900 mb-2">About OKRs Framework</h3>
        <p className="text-cyan-800 text-sm mb-3">
          OKRs (Objectives and Key Results) is a goal-setting framework that helps teams align around ambitious 
          objectives and track measurable progress. Objectives are qualitative goals that inspire, while Key Results 
          are quantitative metrics that measure success. This framework promotes focus, alignment, and accountability.
        </p>
        <div className="flex items-center justify-between">
          <a 
            href="https://www.whatmatters.com/faqs/okrs-101/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cyan-600 hover:text-cyan-800 text-sm font-medium underline"
          >
            Learn more about OKRs →
          </a>
          <div className="flex items-center space-x-2">
            {onViewCaseStudies && (
              <button
                onClick={() => onViewCaseStudies('okr')}
                className="flex items-center px-3 py-1 bg-cyan-100 text-cyan-700 rounded-lg text-sm font-medium hover:bg-cyan-200 transition-colors"
              >
                <Building2 className="h-4 w-4 mr-1" />
                View Case Studies
              </button>
            )}
            {onViewAllSimulators && (
              <button
                onClick={onViewAllSimulators}
                className="flex items-center space-x-2 px-4 py-2 text-cyan-600 hover:text-cyan-800 transition-colors"
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
          <label className="block text-sm font-medium text-cyan-800 mb-2">
            🎯 Objective (Qualitative)
          </label>
          <input
            type="text"
            value={inputs.objective}
            onChange={(e) => setInputs(prev => ({...prev, objective: e.target.value}))}
            placeholder="e.g., Increase user engagement and satisfaction"
            className="w-full p-3 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
          />
          <p className="text-xs text-cyan-600 mt-1">What do you want to achieve? (Inspirational and qualitative)</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-cyan-800 mb-2">
            📊 Key Results (Quantitative)
          </label>
          <div className="space-y-3">
            {inputs.keyResults.map((kr, index) => (
              <div key={index} className="flex items-center">
                <div className="w-8 h-8 bg-cyan-200 rounded-full flex items-center justify-center text-cyan-800 font-semibold text-sm mr-3">
                  {index + 1}
                </div>
                <input
                  type="text"
                  value={kr}
                  onChange={(e) => updateKeyResult(index, e.target.value)}
                  placeholder={`e.g., Increase daily active users by ${(index + 1) * 20}%`}
                  className="flex-1 p-3 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-cyan-600 mt-2">How will you measure success? (Specific and measurable)</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-cyan-200">
        <h3 className="text-lg font-semibold text-cyan-900 mb-4">Generated OKR</h3>
        
        {inputs.objective && (
          <div className="bg-cyan-100 p-4 rounded-lg mb-4">
            <div className="flex items-center mb-2">
              <div className="text-2xl mr-2">🎯</div>
              <h4 className="font-semibold text-cyan-900">Objective</h4>
            </div>
            <p className="text-cyan-800">{inputs.objective}</p>
          </div>
        )}

        {inputs.keyResults.some(kr => kr.trim() !== '') && (
          <div className="bg-cyan-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-cyan-900 mb-3">Key Results</h4>
            <div className="space-y-2">
              {inputs.keyResults.map((kr, index) => (
                kr.trim() !== '' && (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-cyan-200 rounded-full flex items-center justify-center text-cyan-800 font-semibold text-xs mr-3 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-cyan-800">{kr}</p>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        <div className="bg-cyan-100 p-4 rounded-lg">
          <h4 className="font-semibold text-cyan-900 mb-3">OKR Best Practices</h4>
          <ul className="space-y-2 text-sm text-cyan-800">
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span><strong>Inspirational Objective:</strong> Make it ambitious and qualitative</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span><strong>2-4 Key Results:</strong> Keep it focused and measurable</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span><strong>70% Achievement Target:</strong> Aim for stretch goals, not guarantees</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span><strong>Regular Check-ins:</strong> Review progress weekly or bi-weekly</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span><strong>Alignment:</strong> Ensure OKRs support company goals</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OkrGenerator;
