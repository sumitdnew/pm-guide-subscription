import React from 'react';
import { Target, Lightbulb, CheckCircle, Rocket, Calculator, ExternalLink, BookOpen, FileText, Settings, Code, Users, ArrowLeft, Star, TrendingUp, Users as UsersIcon, Building2 } from 'lucide-react';

// Mapping between framework names in database and simulator IDs
const frameworkToSimulatorMap = {
  'RICE Prioritization': 'rice',
  'ICE Scoring': 'ice',
  'Jobs-to-be-Done (JTBD)': 'jtbd',
  '4 Forces of Progress': 'forces',
  'Kano Model': 'kano',
  'Sean Ellis PMF Survey': 'pmf',
  'SWOT Analysis': 'swot',
  'AARRR Metrics': 'aarrr',
  'OKRs': 'okr',
  'North Star Metrics': 'northstar',
  'MoSCoW Method': 'moscow',
  'Cohort Analysis': 'cohort',
  'Customer Lifetime Value': 'clv',
  'A/B Testing Framework': 'abtest',
  'User Personas': 'persona',
  'Competitive Analysis': 'competitive',
  'Pricing Strategy': 'pricing',
  'Market Size Analysis': 'marketsize',
  'Customer Development': 'customerdev',
  'Design Thinking': 'designthinking',
  'Value Proposition Canvas': 'valueprop',
  'Go-to-Market Strategy': 'gtm',
  'Growth Hacking': 'growthhacking',
  // Additional mappings based on actual framework names in data
  'Strategic Formula': 'strategy',
  'Segmentation Framework': 'segmentation',
  '4 Types of PMF': 'pmf',
  'Problem-Solution Fit Canvas': 'problemsolution',
  'Persona Development': 'persona',
  'Lean Startup': 'leanstartup',
  'Design Sprint': 'designsprint',
  'Beta Testing Framework': 'betatesting',
  'Viral Coefficient': 'viralcoefficient',
  'Platform Strategy': 'platformstrategy',
  'International Expansion': 'international',
  'Network Effects': 'networkeffects'
};

const RecommendationsView = ({ recommendations, onReset, onOpenSimulator, onViewCaseStudies }) => {
  // Get icon for resource type
  const getResourceIcon = (type) => {
    switch (type) {
      case 'guide': return <BookOpen className="h-4 w-4" />;
      case 'article': return <FileText className="h-4 w-4" />;
      case 'tool': return <Settings className="h-4 w-4" />;
      case 'template': return <FileText className="h-4 w-4" />;
      case 'book': return <BookOpen className="h-4 w-4" />;
      case 'course': return <Users className="h-4 w-4" />;
      case 'examples': return <Code className="h-4 w-4" />;
      case 'presentation': return <FileText className="h-4 w-4" />;
      case 'framework': return <Settings className="h-4 w-4" />;
      default: return <ExternalLink className="h-4 w-4" />;
    }
  };

  // Get color for resource type
  const getResourceColor = (type) => {
    switch (type) {
      case 'guide': return 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100';
      case 'article': return 'text-green-600 bg-green-50 border-green-200 hover:bg-green-100';
      case 'tool': return 'text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100';
      case 'template': return 'text-orange-600 bg-orange-50 border-orange-200 hover:bg-orange-100';
      case 'book': return 'text-indigo-600 bg-indigo-50 border-indigo-200 hover:bg-indigo-100';
      case 'course': return 'text-pink-600 bg-pink-50 border-pink-200 hover:bg-pink-100';
      case 'examples': return 'text-teal-600 bg-teal-50 border-teal-200 hover:bg-teal-100';
      case 'presentation': return 'text-red-600 bg-red-50 border-red-200 hover:bg-red-100';
      case 'framework': return 'text-yellow-600 bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100';
    }
  };

  // Render a single framework card
  const renderFrameworkCard = (framework, index) => {
    // Handle if framework is just a string
    if (typeof framework === 'string') {
      return (
        <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3">
              <Star className="h-4 w-4 text-white" />
            </div>
            <span className="text-gray-900 font-medium">{framework}</span>
          </div>
        </div>
      );
    }

    // Check if this framework has a simulator
    const simulatorId = frameworkToSimulatorMap[framework.name];
    const hasSimulator = simulatorId !== undefined;

    // Handle framework object with resources
    return (
      <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 group">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{framework.name}</h4>
                <p className="text-gray-600 mb-3 leading-relaxed">{framework.description}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 ml-4">
                {hasSimulator && (
                  <button
                    onClick={() => onOpenSimulator(simulatorId)}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Try Simulator
                  </button>
                )}
                <button
                  onClick={() => {
                    console.log('Case Study clicked for framework:', framework.name);
                    console.log('Simulator ID:', simulatorId);
                    console.log('Fallback ID:', framework.name.toLowerCase().replace(/\s+/g, '-'));
                    if (onViewCaseStudies) {
                      onViewCaseStudies(simulatorId || framework.name.toLowerCase().replace(/\s+/g, '-'));
                    } else {
                      onOpenSimulator(simulatorId || framework.name.toLowerCase().replace(/\s+/g, '-'));
                    }
                  }}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  View Case Study
                </button>
              </div>
            </div>
            
            {framework.resources && framework.resources.length > 0 && (
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-700 mb-3">Resources:</h5>
                <div className="flex flex-wrap gap-2">
                  {framework.resources.map((resource, resourceIndex) => (
                    <a
                      key={resourceIndex}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${getResourceColor(resource.type)}`}
                    >
                      {getResourceIcon(resource.type)}
                      <span className="ml-1.5">{resource.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
            <Target className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Your Recommendations</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your responses, here are personalized frameworks and actionable steps for your product management journey.
        </p>
      </div>

      {/* Phase Information - Moved to top */}
      {recommendations.phase && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Current Phase</h2>
            </div>
            <p className="text-gray-700 capitalize mb-4">
              You're currently in the <span className="font-semibold text-orange-600">{recommendations.phase}</span> phase of your product journey.
            </p>
            {/* Start Over Button - Moved to top of current phase */}
            <button
              onClick={onReset}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors bg-white rounded-lg border border-orange-200 hover:border-orange-300 hover:bg-orange-50"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Start Over</span>
            </button>
          </div>
        </div>
      )}

      {/* Priority Actions Section */}
      {recommendations.actions && recommendations.actions.length > 0 && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Priority Actions</h2>
            </div>
            <div className="space-y-3">
              {recommendations.actions.map((action, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full mt-0.5">
                    <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Key Priorities Section */}
      {recommendations.priorities && recommendations.priorities.length > 0 && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Key Priorities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.priorities.map((priority, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-green-200 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-gray-900">{priority}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Frameworks Section */}
      {recommendations.frameworks && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <UsersIcon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Recommended Frameworks</h2>
              </div>
              <button
                onClick={() => onOpenSimulator('all')}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Open All Simulators
              </button>
            </div>
            
            {(() => {
              if (Array.isArray(recommendations.frameworks)) {
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {recommendations.frameworks.map((framework, index) => renderFrameworkCard(framework, index))}
                  </div>
                );
              } else if (recommendations.frameworks && typeof recommendations.frameworks === 'object') {
                // Handle the structure with primary, secondary, advanced sections
                return (
                  <div className="space-y-8">
                    {/* Primary Frameworks */}
                    {recommendations.frameworks.primary && recommendations.frameworks.primary.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          Primary Frameworks
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {recommendations.frameworks.primary.map((framework, index) => renderFrameworkCard(framework, index))}
                        </div>
                      </div>
                    )}
                    
                    {/* Secondary Frameworks */}
                    {recommendations.frameworks.secondary && recommendations.frameworks.secondary.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          Secondary Frameworks
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {recommendations.frameworks.secondary.map((framework, index) => renderFrameworkCard(framework, index))}
                        </div>
                      </div>
                    )}
                    
                    {/* Advanced Frameworks */}
                    {recommendations.frameworks.advanced && recommendations.frameworks.advanced.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          Advanced Frameworks
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {recommendations.frameworks.advanced.map((framework, index) => renderFrameworkCard(framework, index))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })()}
          </div>
        </div>
      )}


    </div>
  );
};

export default RecommendationsView;