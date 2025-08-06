import React, { useState } from 'react';
import { Building2, Grid } from 'lucide-react';

const ForcesAnalyzer = ({ onViewCaseStudies, onViewAllSimulators }) => {
  const [inputs, setInputs] = useState({
    push: '',
    pull: '',
    habit: '',
    anxiety: ''
  });

  const getStrategicAdvice = () => {
    const { push, pull, habit, anxiety } = inputs;
    const pushLength = push.length;
    const pullLength = pull.length;
    const habitLength = habit.length;
    const anxietyLength = anxiety.length;

    if (pushLength > 0 && pullLength > 0) {
      return "Amplify Push & Pull, Reduce Habit, Address Anxiety";
    } else if (habitLength > 0 && anxietyLength > 0) {
      return "Strong resistance forces. Focus on reducing anxiety and breaking habits.";
    } else if (pushLength > 0 && anxietyLength > 0) {
      return "Mixed signals. Strengthen pull factors while addressing anxiety points.";
    }
    return "Complete the analysis to get strategic recommendations.";
  };

  return (
    <div className="bg-red-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-red-900 mb-6">4 Forces of Progress Analysis</h2>
      
      <div className="bg-red-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-red-900 mb-2">About 4 Forces of Progress Framework</h3>
        <p className="text-red-800 text-sm mb-3">
          The 4 Forces of Progress, developed by Clayton Christensen, analyzes the forces that promote or resist change 
          in customer behavior. It helps understand why customers adopt new solutions and what barriers prevent them from 
          switching, enabling better go-to-market strategies.
        </p>
        <div className="flex items-center justify-between">
          <a 
            href="https://jobs-to-be-done.com/the-four-forces-of-progress-1c8e3c8c8c8c" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-800 text-sm font-medium underline"
          >
            Learn more about 4 Forces →
          </a>
          <div className="flex items-center space-x-2">
            {onViewCaseStudies && (
              <button
                onClick={() => onViewCaseStudies('forces')}
                className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
              >
                <Building2 className="h-4 w-4 mr-1" />
                View Case Studies
              </button>
            )}
            {onViewAllSimulators && (
              <button
                onClick={onViewAllSimulators}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-800 transition-colors"
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
          <label className="block text-sm font-medium text-red-800 mb-2">
            Push of Situation (Green)
          </label>
          <textarea
            value={inputs.push}
            onChange={(e) => setInputs(prev => ({...prev, push: e.target.value}))}
            placeholder="e.g., Current system is slow, expensive, or unreliable"
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-green-100 min-h-[100px]"
          />
          <p className="text-xs text-red-600 mt-1">What's frustrating about current solution?</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-red-800 mb-2">
            Pull of Solution (Blue)
          </label>
          <textarea
            value={inputs.pull}
            onChange={(e) => setInputs(prev => ({...prev, pull: e.target.value}))}
            placeholder="e.g., Faster, cheaper, more reliable alternative"
            className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-blue-100 min-h-[100px]"
          />
          <p className="text-xs text-red-600 mt-1">What attracts customers to new solution?</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-red-800 mb-2">
            Habit of Present (Orange)
          </label>
          <textarea
            value={inputs.habit}
            onChange={(e) => setInputs(prev => ({...prev, habit: e.target.value}))}
            placeholder="e.g., Comfort with current tools, established workflows"
            className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-orange-100 min-h-[100px]"
          />
          <p className="text-xs text-red-600 mt-1">What makes customers stick with current tools?</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-red-800 mb-2">
            Anxiety of Solution (Red)
          </label>
          <textarea
            value={inputs.anxiety}
            onChange={(e) => setInputs(prev => ({...prev, anxiety: e.target.value}))}
            placeholder="e.g., Fear of change, uncertainty about new solution"
            className="w-full p-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-red-100 min-h-[100px]"
          />
          <p className="text-xs text-red-600 mt-1">What concerns about switching?</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-red-200">
        <h3 className="text-lg font-semibold text-red-900 mb-4">Forces Analysis Results</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Forces Promoting Change</h4>
            <div className="space-y-2">
              <div className="text-sm text-green-700">
                <strong>Push:</strong> {inputs.push || 'Not specified'}
              </div>
              <div className="text-sm text-green-700">
                <strong>Pull:</strong> {inputs.pull || 'Not specified'}
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-800 mb-2">Forces Resisting Change</h4>
            <div className="space-y-2">
              <div className="text-sm text-red-700">
                <strong>Habit:</strong> {inputs.habit || 'Not specified'}
              </div>
              <div className="text-sm text-red-700">
                <strong>Anxiety:</strong> {inputs.anxiety || 'Not specified'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-100 p-4 rounded-lg">
          <h4 className="font-semibold text-red-900 mb-2">Strategic Implications</h4>
          <p className="text-red-800">{getStrategicAdvice()}</p>
        </div>
      </div>
    </div>
  );
};

export default ForcesAnalyzer;
