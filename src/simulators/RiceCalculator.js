import React, { useState } from 'react';
import { Building2, Calculator, TrendingUp, Users, Clock } from 'lucide-react';
import { simulatorStyles, colorSchemes } from '../styles/simulatorStyles';

const RiceCalculator = ({ onViewCaseStudies, onViewAllSimulators }) => {
  const [inputs, setInputs] = useState({
    reach: '',
    impact: '',
    confidence: '',
    effort: ''
  });

  const calculateRICE = () => {
    const { reach, impact, confidence, effort } = inputs;
    if (!reach || !impact || !confidence || !effort) return 0;
    return Math.round((parseFloat(reach) * parseFloat(impact) * parseFloat(confidence)) / parseFloat(effort));
  };

  return (
    <div className={simulatorStyles.container}>
      <div className={simulatorStyles.content}>
        {/* Header */}
        <div className={simulatorStyles.header}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className={simulatorStyles.typography.h1}>RICE Prioritization Calculator</h1>
              <p className={simulatorStyles.typography.body}>Score features using Reach, Impact, Confidence, and Effort</p>
            </div>
          </div>
        </div>



        {/* Main Card */}
        <div className={simulatorStyles.card}>
          {/* Card Header */}
          <div className={`bg-gradient-to-r ${colorSchemes.blue.primary} text-white p-6`}>
            <h2 className="text-2xl font-bold mb-2">RICE Framework</h2>
            <p className="text-blue-100">Prioritize features with data-driven scoring</p>
          </div>

          {/* Card Content */}
          <div className={simulatorStyles.cardContent}>
            {/* Info Section */}
            <div className={`bg-gradient-to-r ${colorSchemes.blue.secondary} rounded-xl p-6 mb-8 border ${colorSchemes.blue.border}`}>
              <h3 className={simulatorStyles.infoTitle}>About RICE Framework</h3>
              <p className={simulatorStyles.infoDescription}>
                RICE is a prioritization framework that scores features based on Reach, Impact, Confidence, and Effort. 
                It helps product teams make data-driven decisions about what to build next by quantifying the potential value 
                of each feature relative to the effort required.
              </p>
              <div className="flex items-center justify-between">
                <a 
                  href="https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={simulatorStyles.infoLink}
                >
                  Learn more about RICE →
                </a>
                {onViewCaseStudies && (
                  <button
                    onClick={() => onViewCaseStudies('rice')}
                    className={simulatorStyles.actionButton}
                  >
                    <Building2 className="h-4 w-4" />
                    <span>View Case Studies</span>
                  </button>
                )}
              </div>
            </div>
      
            {/* Form Section */}
            <div className={simulatorStyles.formGrid}>
              <div className={simulatorStyles.formGroup}>
                <label className={simulatorStyles.formLabel}>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>Reach (users affected per quarter)</span>
                  </div>
                </label>
                <input
                  type="number"
                  value={inputs.reach}
                  onChange={(e) => setInputs(prev => ({...prev, reach: e.target.value}))}
                  placeholder="e.g., 10000"
                  className={simulatorStyles.formInput}
                />
              </div>
              
              <div className={simulatorStyles.formGroup}>
                <label className={simulatorStyles.formLabel}>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span>Impact (0.25 = minimal, 3.0 = massive)</span>
                  </div>
                </label>
                <input
                  type="number"
                  step="0.25"
                  min="0.25"
                  max="3"
                  value={inputs.impact}
                  onChange={(e) => setInputs(prev => ({...prev, impact: e.target.value}))}
                  placeholder="e.g., 2.0"
                  className={simulatorStyles.formInput}
                />
              </div>
              
              <div className={simulatorStyles.formGroup}>
                <label className={simulatorStyles.formLabel}>
                  <div className="flex items-center space-x-2">
                    <Calculator className="h-4 w-4 text-blue-600" />
                    <span>Confidence (percentage)</span>
                  </div>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={inputs.confidence}
                  onChange={(e) => setInputs(prev => ({...prev, confidence: e.target.value}))}
                  placeholder="e.g., 80"
                  className={simulatorStyles.formInput}
                />
              </div>
              
              <div className={simulatorStyles.formGroup}>
                <label className={simulatorStyles.formLabel}>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>Effort (person-months)</span>
                  </div>
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={inputs.effort}
                  onChange={(e) => setInputs(prev => ({...prev, effort: e.target.value}))}
                  placeholder="e.g., 3"
                  className={simulatorStyles.formInput}
                />
              </div>
            </div>

            {/* Results Section */}
            <div className={simulatorStyles.resultCard}>
              <div className="text-center">
                <div className={simulatorStyles.resultScore}>
                  {calculateRICE()}
                </div>
                <div className={simulatorStyles.resultLabel}>RICE Score</div>
                <div className={simulatorStyles.resultFormula}>
                  Formula: ({inputs.reach} × {inputs.impact} × {inputs.confidence}%) / {inputs.effort}
                </div>
              </div>
              
              {calculateRICE() > 0 && (
                <div className={simulatorStyles.resultInterpretation}>
                  <div className="text-sm text-gray-700">
                    <strong>Interpretation:</strong> {
                      calculateRICE() > 1000 ? 'High priority - should be considered for immediate development' :
                      calculateRICE() > 500 ? 'Medium priority - good candidate for next quarter' :
                      calculateRICE() > 100 ? 'Low priority - consider for future roadmap' :
                      'Very low priority - likely not worth pursuing'
                    }
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiceCalculator;