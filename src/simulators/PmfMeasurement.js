import React, { useState } from 'react';
import { Building2, Grid } from 'lucide-react';

const PmfMeasurement = ({ onViewCaseStudies, onViewAllSimulators }) => {
  const [inputs, setInputs] = useState({
    veryDisappointed: '',
    somewhatDisappointed: '',
    notDisappointed: ''
  });

  const calculatePMF = () => {
    const { veryDisappointed, somewhatDisappointed, notDisappointed } = inputs;
    if (!veryDisappointed || !somewhatDisappointed || !notDisappointed) return 0;
    
    const total = parseFloat(veryDisappointed) + parseFloat(somewhatDisappointed) + parseFloat(notDisappointed);
    if (total === 0) return 0;
    
    return Math.round((parseFloat(veryDisappointed) / total) * 100);
  };

  const getPMFRating = (pmf) => {
    if (pmf >= 40) return { rating: 'Strong Product-Market Fit', color: 'text-teal-600', bg: 'bg-teal-100' };
    if (pmf >= 25) return { rating: 'Moderate PMF - needs improvement', color: 'text-teal-700', bg: 'bg-teal-50' };
    return { rating: 'Weak PMF - major changes needed', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getRecommendations = (pmf) => {
    if (pmf >= 40) {
      return [
        'Focus on scaling and growth',
        'Optimize user acquisition',
        'Consider expanding to new markets',
        'Invest in product development'
      ];
    } else if (pmf >= 25) {
      return [
        'Continue iterating on product features',
        'Gather more user feedback',
        'Focus on core value proposition',
        'Consider pivoting if needed'
      ];
    } else {
      return [
        'Re-evaluate product-market fit',
        'Conduct user research',
        'Consider significant pivots',
        'Focus on finding the right market'
      ];
    }
  };

  const pmf = calculatePMF();
  const rating = getPMFRating(pmf);
  const recommendations = getRecommendations(pmf);

  return (
    <div className="bg-teal-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-teal-900 mb-6">Sean Ellis PMF Survey</h2>
      
      <div className="bg-teal-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-teal-900 mb-2">About Product-Market Fit Framework</h3>
        <p className="text-teal-800 text-sm mb-3">
          Product-Market Fit (PMF) measures how well a product satisfies market demand. The Sean Ellis survey asks 
          customers how they would feel if they could no longer use the product, helping teams understand if they've 
          achieved PMF and need to focus on growth, or if they need to iterate further.
        </p>
        <div className="flex items-center justify-between">
          <a 
            href="https://www.productmarketfit.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-teal-600 hover:text-teal-800 text-sm font-medium underline"
          >
            Learn more about PMF →
          </a>
          <div className="flex items-center space-x-2">
            {onViewCaseStudies && (
              <button
                onClick={() => onViewCaseStudies('pmf')}
                className="flex items-center px-3 py-1 bg-teal-100 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-200 transition-colors"
              >
                <Building2 className="h-4 w-4 mr-1" />
                View Case Studies
              </button>
            )}
            {onViewAllSimulators && (
              <button
                onClick={onViewAllSimulators}
                className="flex items-center space-x-2 px-4 py-2 text-teal-600 hover:text-teal-800 transition-colors"
              >
                <Grid className="h-4 w-4" />
                <span>View All Simulators</span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-teal-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-teal-900 mb-2">Survey Question:</h3>
        <p className="text-teal-800 text-lg">"How would you feel if you could no longer use this product?"</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-teal-800 mb-2">
            Very Disappointed (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={inputs.veryDisappointed}
            onChange={(e) => setInputs(prev => ({...prev, veryDisappointed: e.target.value}))}
            placeholder="e.g., 15"
            className="w-full p-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
          <p className="text-xs text-teal-600 mt-1">% who would be very disappointed</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-teal-800 mb-2">
            Somewhat Disappointed (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={inputs.somewhatDisappointed}
            onChange={(e) => setInputs(prev => ({...prev, somewhatDisappointed: e.target.value}))}
            placeholder="e.g., 25"
            className="w-full p-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
          <p className="text-xs text-teal-600 mt-1">% who would be somewhat disappointed</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-teal-800 mb-2">
            Not Disappointed (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={inputs.notDisappointed}
            onChange={(e) => setInputs(prev => ({...prev, notDisappointed: e.target.value}))}
            placeholder="e.g., 60"
            className="w-full p-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
          <p className="text-xs text-teal-600 mt-1">% who would not be disappointed</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-teal-200">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-teal-600 mb-2">
            {pmf}%
          </div>
          <div className="text-teal-800 text-lg">PMF Score</div>
          <div className={`text-lg font-semibold ${rating.color} mt-2`}>
            {rating.rating}
          </div>
        </div>
        
        {pmf > 0 && (
          <div className={`p-4 rounded-lg ${rating.bg} mb-6`}>
            <h4 className="font-semibold text-teal-900 mb-3">Interpretation</h4>
            <p className="text-teal-800">
              {pmf >= 40 ? 'Strong product-market fit detected. Your product is meeting a real need in the market.' :
               pmf >= 25 ? 'Moderate product-market fit. There\'s potential, but room for improvement.' :
               'Weak product-market fit. Consider pivoting or finding a different market.'}
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-teal-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-teal-600 mb-1">
              {inputs.veryDisappointed || '—'}%
            </div>
            <div className="text-sm text-teal-800">Very Disappointed</div>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-teal-600 mb-1">
              {inputs.somewhatDisappointed || '—'}%
            </div>
            <div className="text-sm text-teal-800">Somewhat Disappointed</div>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-teal-600 mb-1">
              {inputs.notDisappointed || '—'}%
            </div>
            <div className="text-sm text-teal-800">Not Disappointed</div>
          </div>
        </div>

        <div className="bg-teal-100 p-4 rounded-lg">
          <h4 className="font-semibold text-teal-900 mb-3">Recommendations</h4>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="text-teal-800 text-sm flex items-start">
                <span className="text-teal-600 mr-2">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PmfMeasurement;
