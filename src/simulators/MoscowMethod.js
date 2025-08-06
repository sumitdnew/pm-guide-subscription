import React, { useState } from 'react';
import { Building2, Grid } from 'lucide-react';

const MoscowMethod = ({ onViewCaseStudies, onViewAllSimulators }) => {
  const [inputs, setInputs] = useState({
    mustHave: '',
    shouldHave: '',
    couldHave: '',
    wontHave: ''
  });

  return (
    <div className="bg-violet-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-violet-900 mb-6">MoSCoW Prioritization Method</h2>
      
      <div className="bg-violet-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-violet-900 mb-2">About MoSCoW Prioritization Framework</h3>
        <p className="text-violet-800 text-sm mb-3">
          MoSCoW is a prioritization technique that categorizes requirements into Must Have, Should Have, Could Have, 
          and Won't Have. It helps teams focus on delivering the most critical features first while managing stakeholder 
          expectations about what will and won't be included in each release.
        </p>
        <div className="flex items-center justify-between">
          <a 
            href="https://www.agilebusiness.org/resource/the-moscow-method.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-violet-600 hover:text-violet-800 text-sm font-medium underline"
          >
            Learn more about MoSCoW →
          </a>
          <div className="flex items-center space-x-2">
            {onViewCaseStudies && (
              <button
                onClick={() => onViewCaseStudies('moscow')}
                className="flex items-center px-3 py-1 bg-violet-100 text-violet-700 rounded-lg text-sm font-medium hover:bg-violet-200 transition-colors"
              >
                <Building2 className="h-4 w-4 mr-1" />
                View Case Studies
              </button>
            )}
            {onViewAllSimulators && (
              <button
                onClick={onViewAllSimulators}
                className="flex items-center space-x-2 px-4 py-2 text-violet-600 hover:text-violet-800 transition-colors"
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
          <label className="block text-sm font-medium text-violet-800 mb-2">
            Must Have (Critical)
          </label>
          <textarea
            value={inputs.mustHave}
            onChange={(e) => setInputs(prev => ({...prev, mustHave: e.target.value}))}
            placeholder="e.g., User authentication, core functionality, legal requirements"
            className="w-full p-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-red-100 min-h-[100px]"
          />
          <p className="text-xs text-violet-600 mt-1">Critical requirements, product fails without these</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-violet-800 mb-2">
            Should Have (Important)
          </label>
          <textarea
            value={inputs.shouldHave}
            onChange={(e) => setInputs(prev => ({...prev, shouldHave: e.target.value}))}
            placeholder="e.g., Advanced features, performance optimizations, user experience improvements"
            className="w-full p-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-yellow-100 min-h-[100px]"
          />
          <p className="text-xs text-violet-600 mt-1">Important but not critical, significant impact if left out</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-violet-800 mb-2">
            Could Have (Nice to Have)
          </label>
          <textarea
            value={inputs.couldHave}
            onChange={(e) => setInputs(prev => ({...prev, couldHave: e.target.value}))}
            placeholder="e.g., Nice-to-have features, enhancements, additional integrations"
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-green-100 min-h-[100px]"
          />
          <p className="text-xs text-violet-600 mt-1">Nice to have, would be good but not essential</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-violet-800 mb-2">
            Won't Have (Excluded)
          </label>
          <textarea
            value={inputs.wontHave}
            onChange={(e) => setInputs(prev => ({...prev, wontHave: e.target.value}))}
            placeholder="e.g., Features explicitly excluded, future considerations, low priority items"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 bg-gray-100 min-h-[100px]"
          />
          <p className="text-xs text-violet-600 mt-1">Explicitly excluded this time, maybe future releases</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-violet-200">
        <h3 className="text-lg font-semibold text-violet-900 mb-4">MoSCoW Prioritization Results</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-800 mb-2">Must Have (Critical)</h4>
            <div className="text-sm text-red-700">
              {inputs.mustHave || 'No critical requirements specified'}
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">Should Have (Important)</h4>
            <div className="text-sm text-yellow-700">
              {inputs.shouldHave || 'No important requirements specified'}
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Could Have (Nice to Have)</h4>
            <div className="text-sm text-green-700">
              {inputs.couldHave || 'No nice-to-have requirements specified'}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">Won't Have (Excluded)</h4>
            <div className="text-sm text-gray-700">
              {inputs.wontHave || 'No excluded requirements specified'}
            </div>
          </div>
        </div>

        <div className="bg-violet-100 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-violet-900 mb-3">Implementation Guide</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-violet-800">
            <div>
              <strong className="text-violet-900">60% Must Have:</strong>
              <p className="mt-1">Focus on critical requirements first</p>
            </div>
            <div>
              <strong className="text-violet-900">20% Should Have:</strong>
              <p className="mt-1">Include important features when possible</p>
            </div>
            <div>
              <strong className="text-violet-900">20% Could Have:</strong>
              <p className="mt-1">Add nice-to-have features if time permits</p>
            </div>
          </div>
        </div>

        <div className="bg-violet-50 p-4 rounded-lg">
          <h4 className="font-semibold text-violet-900 mb-3">Best Practices</h4>
          <ul className="space-y-2 text-sm text-violet-800">
            <li className="flex items-start">
              <span className="text-violet-600 mr-2">•</span>
              <span><strong>Clear Criteria:</strong> Define what makes a requirement critical vs. important</span>
            </li>
            <li className="flex items-start">
              <span className="text-violet-600 mr-2">•</span>
              <span><strong>Stakeholder Alignment:</strong> Get agreement on priorities from all stakeholders</span>
            </li>
            <li className="flex items-start">
              <span className="text-violet-600 mr-2">•</span>
              <span><strong>Regular Reviews:</strong> Reassess priorities as requirements evolve</span>
            </li>
            <li className="flex items-start">
              <span className="text-violet-600 mr-2">•</span>
              <span><strong>Realistic Scope:</strong> Don't overload Must Have with too many requirements</span>
            </li>
            <li className="flex items-start">
              <span className="text-violet-600 mr-2">•</span>
              <span><strong>Communication:</strong> Clearly explain what's in/out of scope to stakeholders</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MoscowMethod;
