import React, { useState } from 'react';
import { Building2, Grid } from 'lucide-react';

const JtbdGenerator = ({ onViewCaseStudies, onViewAllSimulators }) => {
  const [inputs, setInputs] = useState({
    customerType: '',
    situation: '',
    motivation: '',
    outcome: ''
  });

  const generateJTBDStory = () => {
    const { customerType, situation, motivation, outcome } = inputs;
    if (!customerType || !situation || !motivation || !outcome) return '';
    
    return `When I am ${situation}, I want ${motivation}, so I can ${outcome}.`;
  };

  return (
    <div className="bg-green-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-green-900 mb-6">Jobs-to-be-Done Story Generator</h2>
      
      <div className="bg-green-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-green-900 mb-2">About Jobs-to-be-Done Framework</h3>
        <p className="text-green-800 text-sm mb-3">
          Jobs-to-be-Done (JTBD) is a framework that focuses on understanding what customers are trying to accomplish 
          rather than what they say they want. It helps identify the underlying motivations and goals that drive customer 
          behavior, leading to better product decisions and innovation.
        </p>
        <div className="flex items-center justify-between">
          <a 
            href="https://www.intercom.com/resources/books/intercom-jobs-to-be-done" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-800 text-sm font-medium underline"
          >
            Learn more about JTBD →
          </a>
          <div className="flex items-center space-x-2">
            {onViewCaseStudies && (
              <button
                onClick={() => onViewCaseStudies('jtbd')}
                className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
              >
                <Building2 className="h-4 w-4 mr-1" />
                View Case Studies
              </button>
            )}
            {onViewAllSimulators && (
              <button
                onClick={onViewAllSimulators}
                className="flex items-center space-x-2 px-4 py-2 text-green-600 hover:text-green-800 transition-colors"
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
          <label className="block text-sm font-medium text-green-800 mb-2">
            Customer Type
          </label>
          <input
            type="text"
            value={inputs.customerType}
            onChange={(e) => setInputs(prev => ({...prev, customerType: e.target.value}))}
            placeholder="e.g., busy product manager"
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-green-800 mb-2">
            Situation (When I...)
          </label>
          <input
            type="text"
            value={inputs.situation}
            onChange={(e) => setInputs(prev => ({...prev, situation: e.target.value}))}
            placeholder="e.g., need to prioritize features for next sprint"
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-green-800 mb-2">
            Motivation (I want to...)
          </label>
          <input
            type="text"
            value={inputs.motivation}
            onChange={(e) => setInputs(prev => ({...prev, motivation: e.target.value}))}
            placeholder="e.g., make data-driven decisions quickly"
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-green-800 mb-2">
            Expected Outcome (So I can...)
          </label>
          <input
            type="text"
            value={inputs.outcome}
            onChange={(e) => setInputs(prev => ({...prev, outcome: e.target.value}))}
            placeholder="e.g., deliver maximum value to users"
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-3">Generated Job Story</h3>
        <div className="bg-green-100 p-4 rounded-lg mb-4">
          <p className="text-green-800 font-medium">
            {generateJTBDStory() || 'Fill in the fields above to generate your job story...'}
          </p>
        </div>
        
        <h3 className="text-lg font-semibold text-green-900 mb-3">Suggested Interview Questions</h3>
        <div className="space-y-2">
          <div className="bg-green-100 p-3 rounded">
            <p className="text-green-800 text-sm">
              "Tell me about the last time you {inputs.situation || '[situation]'}"
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded">
            <p className="text-green-800 text-sm">
              "What were you trying to accomplish?"
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded">
            <p className="text-green-800 text-sm">
              "What did you do instead? What workarounds did you use?"
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded">
            <p className="text-green-800 text-sm">
              "What would have been ideal in that situation?"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JtbdGenerator; 