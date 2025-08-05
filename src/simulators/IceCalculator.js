import React, { useState } from 'react';
import { Building2, TrendingUp, Target, Zap } from 'lucide-react';
import { simulatorStyles, colorSchemes } from '../styles/simulatorStyles';

const IceCalculator = ({ onViewCaseStudies }) => {
  const [inputs, setInputs] = useState({
    impact: '',
    confidence: '',
    ease: ''
  });

  const calculateICE = () => {
    const { impact, confidence, ease } = inputs;
    if (!impact || !confidence || !ease) return 0;
    return Math.round(parseFloat(impact) * parseFloat(confidence) * parseFloat(ease));
  };

  const getScoreInterpretation = (score) => {
    if (score >= 700) return { 
      text: 'Excellent - High impact, confident, and easy to implement', 
      color: 'text-purple-600', 
      bg: 'bg-purple-100' 
    };
    if (score >= 500) return { 
      text: 'Good - Worth pursuing with some trade-offs', 
      color: 'text-purple-600', 
      bg: 'bg-purple-100' 
    };
    if (score >= 300) return { 
      text: 'Moderate - Consider against other priorities', 
      color: 'text-purple-700', 
      bg: 'bg-purple-50' 
    };
    return { 
      text: 'Low priority - Look for better opportunities', 
      color: 'text-gray-600', 
      bg: 'bg-gray-100' 
    };
  };

  const score = calculateICE();
  const interpretation = getScoreInterpretation(score);

  return (
    <div className={simulatorStyles.container}>
      <div className={simulatorStyles.content}>
        {/* Header */}
        <div className={simulatorStyles.header}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className={simulatorStyles.typography.h1}>ICE Scoring Framework</h1>
              <p className={simulatorStyles.typography.body}>Quick prioritization using Impact, Confidence, and Ease</p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className={simulatorStyles.card}>
          {/* Card Header */}
          <div className={`bg-gradient-to-r ${colorSchemes.purple.primary} text-white p-6`}>
            <h2 className="text-2xl font-bold mb-2">ICE Framework</h2>
            <p className="text-purple-100">Simplified prioritization for fast decisions</p>
          </div>

          {/* Card Content */}
          <div className={simulatorStyles.cardContent}>
            {/* Info Section */}
            <div className={`bg-gradient-to-r ${colorSchemes.purple.secondary} rounded-xl p-6 mb-8 border ${colorSchemes.purple.border}`}>
              <h3 className={simulatorStyles.infoTitle}>About ICE Framework</h3>
              <p className={simulatorStyles.infoDescription}>
                ICE is a simplified prioritization framework that evaluates features based on Impact, Confidence, and Ease. 
                It's a streamlined alternative to RICE that focuses on the three most important factors for quick decision-making 
                in fast-paced product development environments.
              </p>
              <div className="flex items-center justify-between">
                <a 
                  href="https://www.productplan.com/glossary/ice-scoring-model/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={simulatorStyles.infoLink}
                >
                  Learn more about ICE →
                </a>
                {onViewCaseStudies && (
                  <button
                    onClick={() => onViewCaseStudies('ice')}
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
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                    <span>Impact (1-10)</span>
                  </div>
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={inputs.impact}
                  onChange={(e) => setInputs(prev => ({...prev, impact: e.target.value}))}
                  placeholder="e.g., 8"
                  className={simulatorStyles.formInput}
                />
                <p className="text-xs text-gray-600 mt-1">How much will this move the needle?</p>
              </div>
              
              <div className={simulatorStyles.formGroup}>
                <label className={simulatorStyles.formLabel}>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-purple-600" />
                    <span>Confidence (1-10)</span>
                  </div>
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={inputs.confidence}
                  onChange={(e) => setInputs(prev => ({...prev, confidence: e.target.value}))}
                  placeholder="e.g., 7"
                  className={simulatorStyles.formInput}
                />
                <p className="text-xs text-gray-600 mt-1">How sure are we about this?</p>
              </div>
              
              <div className={simulatorStyles.formGroup}>
                <label className={simulatorStyles.formLabel}>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-purple-600" />
                    <span>Ease (1-10)</span>
                  </div>
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={inputs.ease}
                  onChange={(e) => setInputs(prev => ({...prev, ease: e.target.value}))}
                  placeholder="e.g., 6"
                  className={simulatorStyles.formInput}
                />
                <p className="text-xs text-gray-600 mt-1">How easy is it to implement?</p>
              </div>
            </div>

            {/* Results Section */}
            <div className={simulatorStyles.resultCard}>
              <div className="text-center">
                <div className={simulatorStyles.resultScore}>
                  {score}
                </div>
                <div className={simulatorStyles.resultLabel}>ICE Score</div>
                <div className={simulatorStyles.resultFormula}>
                  Formula: {inputs.impact} × {inputs.confidence} × {inputs.ease}
                </div>
              </div>
              
              {score > 0 && (
                <div className={simulatorStyles.resultInterpretation}>
                  <div className={`text-center p-3 rounded-lg ${interpretation.bg}`}>
                    <div className={`text-lg font-semibold ${interpretation.color}`}>
                      {interpretation.text}
                    </div>
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

export default IceCalculator;
