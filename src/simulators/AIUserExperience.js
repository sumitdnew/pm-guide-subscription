import React, { useState, useEffect } from 'react';
import { Users, Brain, Eye, Shield, MessageSquare, AlertCircle, CheckCircle, Clock, Target, BarChart3, Activity, Gauge, RefreshCw, FileText, ArrowLeft, Grid, Zap, Settings, Accessibility, Lightbulb, Heart, Star, TrendingUp, AlertTriangle, Info, HelpCircle, Lock, Unlock, ThumbsUp, ThumbsDown, UserCheck, UserX, Sparkles, Palette, Layers, Smartphone, Monitor, Tablet, Keyboard } from 'lucide-react';

const AIUserExperience = ({ onViewCaseStudies, onViewAllSimulators, onBack }) => {
  const [inputs, setInputs] = useState({
    // AI UX Principles
    transparency: 7,
    userControl: 8,
    feedbackQuality: 6,
    errorHandling: 7,
    
    // Trust & Explainability
    trustScore: 6,
    explainabilityRequired: 8,
    confidenceDisplay: 7,
    uncertaintyHandling: 6,
    
    // Progressive Disclosure
    progressiveDisclosure: 7,
    complexityManagement: 6,
    onboardingQuality: 8,
    
    // Human-AI Interaction
    interactionPatterns: 7,
    conversationQuality: 6,
    personalizationLevel: 7,
    
    // Accessibility
    accessibilityScore: 6,
    screenReaderSupport: 5,
    keyboardNavigation: 7,
    colorContrast: 8,
    
    // User Testing
    userTestingScore: 6,
    feedbackCollection: 7,
    iterationSpeed: 6,
    
    // Documentation
    documentationQuality: 6,
    userGuides: 5,
    helpSystem: 7
  });

  const [results, setResults] = useState({});
  const [activeTab, setActiveTab] = useState('assessment');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const calculateResults = () => {
    const {
      transparency, userControl, feedbackQuality, errorHandling,
      trustScore, explainabilityRequired, confidenceDisplay, uncertaintyHandling,
      progressiveDisclosure, complexityManagement, onboardingQuality,
      interactionPatterns, conversationQuality, personalizationLevel,
      accessibilityScore, screenReaderSupport, keyboardNavigation, colorContrast,
      userTestingScore, feedbackCollection, iterationSpeed,
      documentationQuality, userGuides, helpSystem
    } = inputs;

    // AI UX Maturity Score
    const principlesScore = (transparency + userControl + feedbackQuality + errorHandling) / 4;
    const trustScore_avg = (trustScore + explainabilityRequired + confidenceDisplay + uncertaintyHandling) / 4;
    const disclosureScore = (progressiveDisclosure + complexityManagement + onboardingQuality) / 3;
    const interactionScore = (interactionPatterns + conversationQuality + personalizationLevel) / 3;
    const accessibilityScore_avg = (accessibilityScore + screenReaderSupport + keyboardNavigation + colorContrast) / 4;
    const testingScore = (userTestingScore + feedbackCollection + iterationSpeed) / 3;
    const documentationScore = (documentationQuality + userGuides + helpSystem) / 3;

    const overallMaturityScore = (
      principlesScore * 0.25 +
      trustScore_avg * 0.2 +
      disclosureScore * 0.15 +
      interactionScore * 0.15 +
      accessibilityScore_avg * 0.15 +
      testingScore * 0.05 +
      documentationScore * 0.05
    );

    // Improvement Recommendations
    const recommendations = [];
    if (transparency < 7) recommendations.push('Enhance AI transparency with clear explanations of AI decisions');
    if (userControl < 7) recommendations.push('Increase user control options and override capabilities');
    if (feedbackQuality < 7) recommendations.push('Improve feedback mechanisms and user communication');
    if (trustScore < 7) recommendations.push('Build user trust through consistent and reliable AI behavior');
    if (accessibilityScore < 7) recommendations.push('Strengthen accessibility features for inclusive AI experiences');

    // Risk Assessment
    const riskFactors = [];
    if (transparency < 5) riskFactors.push('Low transparency may lead to user distrust');
    if (userControl < 5) riskFactors.push('Limited user control can cause frustration');
    if (accessibilityScore < 5) riskFactors.push('Poor accessibility may exclude users');

    setResults({
      maturityScore: overallMaturityScore,
      principlesScore,
      trustScore: trustScore_avg,
      disclosureScore,
      interactionScore,
      accessibilityScore: accessibilityScore_avg,
      testingScore,
      documentationScore,
      recommendations,
      riskFactors,
      grade: overallMaturityScore >= 8 ? 'A' : overallMaturityScore >= 6 ? 'B' : overallMaturityScore >= 4 ? 'C' : 'D'
    });
  };

  useEffect(() => {
    calculateResults();
  }, [inputs]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return 'text-green-600';
      case 'B': return 'text-blue-600';
      case 'C': return 'text-yellow-600';
      case 'D': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const templates = [
    {
      id: 'ai-feature-doc',
      name: 'AI Feature Documentation Template',
      description: 'Comprehensive template for documenting AI features',
      icon: FileText
    },
    {
      id: 'user-testing-plan',
      name: 'AI User Testing Plan',
      description: 'Structured plan for testing AI user experiences',
      icon: Users
    },
    {
      id: 'accessibility-checklist',
      name: 'AI Accessibility Checklist',
      description: 'Checklist for ensuring AI interfaces are accessible',
      icon: Accessibility
    },
    {
      id: 'trust-building-guide',
      name: 'AI Trust Building Guide',
      description: 'Guide for building user trust in AI systems',
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI User Experience Designer</h1>
                <p className="text-gray-600">Design exceptional AI-powered user experiences</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onBack}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button
                onClick={onViewAllSimulators}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Grid className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { id: 'assessment', name: 'Assessment', icon: Gauge },
              { id: 'principles', name: 'AI UX Principles', icon: Brain },
              { id: 'patterns', name: 'Interaction Patterns', icon: MessageSquare },
              { id: 'accessibility', name: 'Accessibility', icon: Accessibility },
              { id: 'templates', name: 'Templates', icon: FileText }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-white shadow-sm text-pink-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-pink-600" />
                Assessment Parameters
              </h2>

              {activeTab === 'assessment' && (
                <div className="space-y-6">
                  {/* AI UX Principles */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Brain className="h-4 w-4 mr-2 text-pink-600" />
                      AI UX Principles
                    </h3>
                    <div className="space-y-4">
                      {[
                        { key: 'transparency', label: 'Transparency', icon: Eye },
                        { key: 'userControl', label: 'User Control', icon: Shield },
                        { key: 'feedbackQuality', label: 'Feedback Quality', icon: MessageSquare },
                        { key: 'errorHandling', label: 'Error Handling', icon: AlertCircle }
                      ].map(item => (
                        <div key={item.key}>
                          <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                              <item.icon className="h-4 w-4 mr-2 text-pink-600" />
                              {item.label}
                            </label>
                            <span className={`text-sm font-bold ${getScoreColor(inputs[item.key])}`}>
                              {inputs[item.key]}/10
                            </span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={inputs[item.key]}
                            onChange={(e) => handleInputChange(item.key, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trust & Explainability */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-pink-600" />
                      Trust & Explainability
                    </h3>
                    <div className="space-y-4">
                      {[
                        { key: 'trustScore', label: 'User Trust Score', icon: Heart },
                        { key: 'explainabilityRequired', label: 'Explainability Required', icon: Info },
                        { key: 'confidenceDisplay', label: 'Confidence Display', icon: Gauge },
                        { key: 'uncertaintyHandling', label: 'Uncertainty Handling', icon: AlertTriangle }
                      ].map(item => (
                        <div key={item.key}>
                          <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                              <item.icon className="h-4 w-4 mr-2 text-pink-600" />
                              {item.label}
                            </label>
                            <span className={`text-sm font-bold ${getScoreColor(inputs[item.key])}`}>
                              {inputs[item.key]}/10
                            </span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={inputs[item.key]}
                            onChange={(e) => handleInputChange(item.key, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'principles' && (
                <div className="space-y-6">
                  {/* Progressive Disclosure */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Layers className="h-4 w-4 mr-2 text-pink-600" />
                      Progressive Disclosure
                    </h3>
                    <div className="space-y-4">
                      {[
                        { key: 'progressiveDisclosure', label: 'Progressive Disclosure', icon: Layers },
                        { key: 'complexityManagement', label: 'Complexity Management', icon: Settings },
                        { key: 'onboardingQuality', label: 'Onboarding Quality', icon: Users }
                      ].map(item => (
                        <div key={item.key}>
                          <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                              <item.icon className="h-4 w-4 mr-2 text-pink-600" />
                              {item.label}
                            </label>
                            <span className={`text-sm font-bold ${getScoreColor(inputs[item.key])}`}>
                              {inputs[item.key]}/10
                            </span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={inputs[item.key]}
                            onChange={(e) => handleInputChange(item.key, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Human-AI Interaction */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-pink-600" />
                      Human-AI Interaction
                    </h3>
                    <div className="space-y-4">
                      {[
                        { key: 'interactionPatterns', label: 'Interaction Patterns', icon: MessageSquare },
                        { key: 'conversationQuality', label: 'Conversation Quality', icon: MessageSquare },
                        { key: 'personalizationLevel', label: 'Personalization Level', icon: UserCheck }
                      ].map(item => (
                        <div key={item.key}>
                          <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                              <item.icon className="h-4 w-4 mr-2 text-pink-600" />
                              {item.label}
                            </label>
                            <span className={`text-sm font-bold ${getScoreColor(inputs[item.key])}`}>
                              {inputs[item.key]}/10
                            </span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={inputs[item.key]}
                            onChange={(e) => handleInputChange(item.key, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'accessibility' && (
                <div className="space-y-6">
                  {/* Accessibility Assessment */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Accessibility className="h-4 w-4 mr-2 text-pink-600" />
                      Accessibility Assessment
                    </h3>
                    <div className="space-y-4">
                      {[
                        { key: 'accessibilityScore', label: 'Overall Accessibility', icon: Accessibility },
                        { key: 'screenReaderSupport', label: 'Screen Reader Support', icon: Eye },
                        { key: 'keyboardNavigation', label: 'Keyboard Navigation', icon: Keyboard },
                        { key: 'colorContrast', label: 'Color Contrast', icon: Palette }
                      ].map(item => (
                        <div key={item.key}>
                          <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                              <item.icon className="h-4 w-4 mr-2 text-pink-600" />
                              {item.label}
                            </label>
                            <span className={`text-sm font-bold ${getScoreColor(inputs[item.key])}`}>
                              {inputs[item.key]}/10
                            </span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={inputs[item.key]}
                            onChange={(e) => handleInputChange(item.key, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* User Testing */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Users className="h-4 w-4 mr-2 text-pink-600" />
                      User Testing
                    </h3>
                    <div className="space-y-4">
                      {[
                        { key: 'userTestingScore', label: 'User Testing Score', icon: Users },
                        { key: 'feedbackCollection', label: 'Feedback Collection', icon: MessageSquare },
                        { key: 'iterationSpeed', label: 'Iteration Speed', icon: RefreshCw }
                      ].map(item => (
                        <div key={item.key}>
                          <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                              <item.icon className="h-4 w-4 mr-2 text-pink-600" />
                              {item.label}
                            </label>
                            <span className={`text-sm font-bold ${getScoreColor(inputs[item.key])}`}>
                              {inputs[item.key]}/10
                            </span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={inputs[item.key]}
                            onChange={(e) => handleInputChange(item.key, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documentation */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-pink-600" />
                      Documentation
                    </h3>
                    <div className="space-y-4">
                      {[
                        { key: 'documentationQuality', label: 'Documentation Quality', icon: FileText },
                        { key: 'userGuides', label: 'User Guides', icon: HelpCircle },
                        { key: 'helpSystem', label: 'Help System', icon: Info }
                      ].map(item => (
                        <div key={item.key}>
                          <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                              <item.icon className="h-4 w-4 mr-2 text-pink-600" />
                              {item.label}
                            </label>
                            <span className={`text-sm font-bold ${getScoreColor(inputs[item.key])}`}>
                              {inputs[item.key]}/10
                            </span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={inputs[item.key]}
                            onChange={(e) => handleInputChange(item.key, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-pink-600" />
                AI UX Assessment Results
              </h2>

              {activeTab === 'assessment' && (
                <div className="space-y-6">
                  {/* Overall Score */}
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">AI UX Maturity Score</h3>
                        <p className="text-pink-100">Overall assessment of your AI user experience</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-4xl font-bold ${getGradeColor(results.grade)}`}>
                          {results.grade}
                        </div>
                        <div className="text-2xl font-bold">
                          {results.maturityScore?.toFixed(1)}/10
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'AI UX Principles', score: results.principlesScore, icon: Brain, color: 'pink' },
                      { label: 'Trust & Explainability', score: results.trustScore, icon: Shield, color: 'purple' },
                      { label: 'Progressive Disclosure', score: results.disclosureScore, icon: Layers, color: 'pink' },
                      { label: 'Human-AI Interaction', score: results.interactionScore, icon: MessageSquare, color: 'purple' },
                      { label: 'Accessibility', score: results.accessibilityScore, icon: Accessibility, color: 'pink' },
                      { label: 'User Testing', score: results.testingScore, icon: Users, color: 'purple' }
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <item.icon className={`h-5 w-5 mr-2 text-${item.color}-600`} />
                            <span className="font-medium text-gray-800">{item.label}</span>
                          </div>
                          <span className={`font-bold ${getScoreColor(item.score)}`}>
                            {item.score?.toFixed(1)}/10
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 h-2 rounded-full`}
                            style={{ width: `${(item.score / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  {results.recommendations && results.recommendations.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2 text-pink-600" />
                        Improvement Recommendations
                      </h3>
                      <div className="space-y-2">
                        {results.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-pink-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-pink-600 mt-0.5" />
                            <span className="text-gray-700">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Risk Factors */}
                  {results.riskFactors && results.riskFactors.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                        Risk Factors
                      </h3>
                      <div className="space-y-2">
                        {results.riskFactors.map((risk, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                            <span className="text-gray-700">{risk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'patterns' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Human-AI Interaction Patterns</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: 'Progressive Disclosure',
                        description: 'Reveal AI capabilities gradually to avoid overwhelming users',
                        icon: Layers,
                        color: 'pink'
                      },
                      {
                        title: 'Confidence Display',
                        description: 'Show AI confidence levels to build user trust',
                        icon: Gauge,
                        color: 'purple'
                      },
                      {
                        title: 'Error Recovery',
                        description: 'Provide clear paths for users to correct AI mistakes',
                        icon: RefreshCw,
                        color: 'pink'
                      },
                      {
                        title: 'User Control',
                        description: 'Allow users to override or adjust AI decisions',
                        icon: Shield,
                        color: 'purple'
                      },
                      {
                        title: 'Transparency',
                        description: 'Explain AI reasoning and decision-making process',
                        icon: Eye,
                        color: 'pink'
                      },
                      {
                        title: 'Feedback Loops',
                        description: 'Enable users to provide feedback to improve AI',
                        icon: MessageSquare,
                        color: 'purple'
                      }
                    ].map((pattern, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <pattern.icon className={`h-5 w-5 mr-2 text-${pattern.color}-600`} />
                          <h4 className="font-semibold text-gray-800">{pattern.title}</h4>
                        </div>
                        <p className="text-gray-600 text-sm">{pattern.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'templates' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">AI UX Templates</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <div className="flex items-center mb-2">
                          <template.icon className="h-5 w-5 mr-2 text-pink-600" />
                          <h4 className="font-semibold text-gray-800">{template.name}</h4>
                        </div>
                        <p className="text-gray-600 text-sm">{template.description}</p>
                      </div>
                    ))}
                  </div>

                  {selectedTemplate && (
                    <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">{selectedTemplate.name}</h4>
                      <div className="prose prose-sm max-w-none">
                        {selectedTemplate.id === 'ai-feature-doc' && (
                          <div>
                            <h5>AI Feature Documentation Template</h5>
                            <ul>
                              <li><strong>Feature Overview:</strong> Clear description of AI functionality</li>
                              <li><strong>User Benefits:</strong> How the AI improves user experience</li>
                              <li><strong>Technical Details:</strong> AI model, data sources, accuracy</li>
                              <li><strong>User Controls:</strong> How users can interact with the AI</li>
                              <li><strong>Error Handling:</strong> What happens when AI makes mistakes</li>
                              <li><strong>Privacy & Security:</strong> Data handling and protection measures</li>
                            </ul>
                          </div>
                        )}
                        {selectedTemplate.id === 'user-testing-plan' && (
                          <div>
                            <h5>AI User Testing Plan</h5>
                            <ul>
                              <li><strong>Test Objectives:</strong> What aspects to evaluate</li>
                              <li><strong>User Personas:</strong> Target user groups to test with</li>
                              <li><strong>Test Scenarios:</strong> Specific tasks and situations</li>
                              <li><strong>Success Metrics:</strong> How to measure AI UX success</li>
                              <li><strong>Feedback Collection:</strong> Methods for gathering user input</li>
                              <li><strong>Iteration Plan:</strong> How to improve based on feedback</li>
                            </ul>
                          </div>
                        )}
                        {selectedTemplate.id === 'accessibility-checklist' && (
                          <div>
                            <h5>AI Accessibility Checklist</h5>
                            <ul>
                              <li><strong>Screen Reader Support:</strong> AI outputs are accessible to screen readers</li>
                              <li><strong>Keyboard Navigation:</strong> All AI features work with keyboard only</li>
                              <li><strong>Color Contrast:</strong> AI visualizations meet contrast requirements</li>
                              <li><strong>Alternative Text:</strong> AI-generated images have alt text</li>
                              <li><strong>Error Messages:</strong> Clear, accessible error communication</li>
                              <li><strong>Focus Management:</strong> Proper focus handling in AI interactions</li>
                            </ul>
                          </div>
                        )}
                        {selectedTemplate.id === 'trust-building-guide' && (
                          <div>
                            <h5>AI Trust Building Guide</h5>
                            <ul>
                              <li><strong>Transparency:</strong> Explain how AI works and makes decisions</li>
                              <li><strong>Reliability:</strong> Ensure consistent and accurate AI performance</li>
                              <li><strong>User Control:</strong> Give users agency over AI decisions</li>
                              <li><strong>Feedback Mechanisms:</strong> Allow users to provide input</li>
                              <li><strong>Error Recovery:</strong> Clear paths to correct AI mistakes</li>
                              <li><strong>Privacy Protection:</strong> Secure handling of user data</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          
          
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default AIUserExperience; 