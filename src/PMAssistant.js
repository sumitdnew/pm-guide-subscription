import React, { useState } from 'react';
import { ChevronRight, Calculator, Sparkles, Target, TrendingUp, Users } from 'lucide-react';
import FrameworkSimulator from './FrameworkSimulator';
import RecommendationsView from './RecommendationsView';
import { frameworkDatabase, questions } from './data';

const PMAssistant = ({ isDemo = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [recommendations, setRecommendations] = useState(null);
  const [showSimulator, setShowSimulator] = useState(false);
  const [selectedSimulator, setSelectedSimulator] = useState('');

  const generateRecommendations = () => {
    const { stage, type, challenge, timeline } = responses;
    
    let phase = 'discovery';
    if (stage === 'discovery') phase = 'discovery';
    else if (stage === 'early') phase = challenge === 'positioning' ? 'strategy' : 'planning';
    else if (stage === 'growth') phase = 'growth';
    else if (stage === 'mature') phase = 'scale';
    else if (stage === 'idea') phase = 'discovery';

    // Get the frameworks for the phase from the database
    const frameworksData = frameworkDatabase[phase];
    
    let actions = [];
    let priorities = [];
    
    if (challenge === 'understanding') {
      actions = [
        'Conduct 10-15 customer interviews using JTBD framework',
        'Create user personas and journey maps',
        'Analyze current customer behavior data',
        'Survey existing users about pain points'
      ];
      priorities = ['Customer Research', 'Problem Validation', 'Market Analysis'];
    } else if (challenge === 'prioritization') {
      actions = [
        'Score all features using RICE framework',
        'Map features using Kano Model (Basic/Performance/Delight)',
        'Align priorities with OKRs and North Star metric',
        'Create user story map for next release'
      ];
      priorities = ['Feature Scoring', 'Strategic Alignment', 'Roadmap Planning'];
    } else if (challenge === 'growth') {
      actions = [
        'Analyze user cohorts to identify retention patterns',
        'Set up growth experiment pipeline',
        'Implement viral/referral mechanisms',
        'Optimize activation and onboarding flow'
      ];
      priorities = ['Retention Analysis', 'Growth Experiments', 'Viral Mechanisms'];
    } else if (challenge === 'positioning') {
      actions = [
        'Define target segments using segmentation framework',
        'Map competitive landscape and differentiation',
        'Create positioning statement and messaging',
        'Test positioning with target customers'
      ];
      priorities = ['Market Segmentation', 'Competitive Analysis', 'Positioning Testing'];
    } else if (challenge === 'retention') {
      actions = [
        'Analyze user cohorts to identify retention patterns',
        'Implement onboarding improvements',
        'Create engagement campaigns for at-risk users',
        'Build habit-forming product features'
      ];
      priorities = ['Retention Analysis', 'User Engagement', 'Churn Prevention'];
    } else if (challenge === 'monetization') {
      actions = [
        'Test different pricing models with user segments',
        'Implement value-based pricing strategy',
        'Create freemium conversion funnel',
        'Optimize payment and checkout experience'
      ];
      priorities = ['Pricing Strategy', 'Conversion Optimization', 'Revenue Growth'];
    } else if (challenge === 'scaling') {
      actions = [
        'Implement scalable processes and systems',
        'Build cross-functional team structures',
        'Create automated customer success workflows',
        'Establish data-driven decision making frameworks'
      ];
      priorities = ['Process Optimization', 'Team Scaling', 'System Architecture'];
    }

    if (type === 'ai') {
      if (phase === 'discovery') {
        actions.unshift('Research AI adoption barriers in target market');
        actions.push('Validate AI solution vs. traditional approaches');
      } else if (phase === 'development') {
        actions.push('Test AI model accuracy and bias with real users');
        actions.push('Design fallback experiences for AI failures');
      }
    }

    if (timeline === 'immediate') {
      actions = actions.slice(0, 2).map(action => `URGENT: ${action}`);
    }

    setRecommendations({
      frameworks: frameworksData,
      actions,
      priorities,
      phase
    });
  };

  const handleAnswer = (value) => {
    const question = questions[currentStep];
    setResponses(prev => ({
      ...prev,
      [question.id]: value
    }));
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendations();
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setResponses({});
    setRecommendations(null);
    setShowSimulator(false);
    setSelectedSimulator('');
  };

  if (showSimulator) {
    return (
      <FrameworkSimulator 
        framework={selectedSimulator} 
        isDemo={isDemo}
        onBack={() => {
          setShowSimulator(false);
          setSelectedSimulator('');
        }}
      />
    );
  }

  if (recommendations) {
    return (
      <RecommendationsView 
        recommendations={recommendations}
        onReset={reset}
        onOpenSimulator={(framework) => {
          setSelectedSimulator(framework);
          setShowSimulator(true);
        }}
      />
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="h-6 w-6 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">PM Assistant</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get personalized product management recommendations and frameworks based on your current challenges and goals.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">{currentStep + 1} of {questions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-4">
            <Target className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{currentQuestion.question}</h2>
          {currentQuestion.description && (
            <p className="text-gray-600">{currentQuestion.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className="p-6 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
                    {String.fromCharCode(65 + index)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{option.label}</h3>
                  {option.description && (
                    <p className="text-sm text-gray-600">{option.description}</p>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calculator className="h-4 w-4 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Frameworks</h3>
          </div>
          <p className="text-sm text-gray-600">Access proven PM frameworks and methodologies</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Recommendations</h3>
          </div>
          <p className="text-sm text-gray-600">Get personalized advice for your challenges</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="h-4 w-4 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Case Studies</h3>
          </div>
          <p className="text-sm text-gray-600">Learn from real-world product examples</p>
        </div>
      </div>
    </div>
  );
};

export default PMAssistant;