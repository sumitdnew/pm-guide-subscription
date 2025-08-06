import React, { useState } from 'react';
import { Building2, CheckCircle, Gauge, Database, Users, Shield, DollarSign, TrendingUp, Clock, AlertTriangle, Target, Zap } from 'lucide-react';

const AIReadinessAssessment = ({ onViewCaseStudies, onViewAllSimulators }) => {
  const [assessments, setAssessments] = useState({
    technicalInfrastructure: {
      cloudPlatform: '',
      dataStorage: '',
      computeResources: '',
      mlOps: '',
      security: ''
    },
    dataMaturity: {
      dataQuality: '',
      dataGovernance: '',
      dataAccess: '',
      dataVolume: '',
      dataVariety: ''
    },
    teamCapabilities: {
      aiExpertise: '',
      dataScience: '',
      engineering: '',
      domainKnowledge: '',
      changeManagement: ''
    },
    regulatoryCompliance: {
      dataPrivacy: '',
      industryRegulations: '',
      aiEthics: '',
      auditTrail: '',
      riskAssessment: ''
    },
    businessCase: {
      problemDefinition: '',
      roiPotential: '',
      stakeholderAlignment: '',
      successMetrics: '',
      competitiveAdvantage: ''
    },
    organizationalReadiness: {
      leadershipSupport: '',
      changeManagement: '',
      trainingPrograms: '',
      communication: '',
      culture: ''
    }
  });

  const categories = {
    technicalInfrastructure: {
      title: 'Technical Infrastructure',
      icon: Database,
      description: 'Evaluate cloud platforms, data storage, compute resources, ML Ops, and security',
      questions: {
        cloudPlatform: 'Cloud platform maturity and AI services availability',
        dataStorage: 'Data storage infrastructure and scalability',
        computeResources: 'Computing resources for AI model training',
        mlOps: 'ML Ops pipeline and model deployment capabilities',
        security: 'Security infrastructure for AI systems'
      }
    },
    dataMaturity: {
      title: 'Data Maturity',
      icon: TrendingUp,
      description: 'Assess data quality, governance, access, volume, and variety',
      questions: {
        dataQuality: 'Data quality and cleanliness standards',
        dataGovernance: 'Data governance and management policies',
        dataAccess: 'Data access and integration capabilities',
        dataVolume: 'Volume of available training data',
        dataVariety: 'Variety and diversity of data sources'
      }
    },
    teamCapabilities: {
      title: 'Team Capabilities',
      icon: Users,
      description: 'Evaluate AI expertise, data science skills, engineering, domain knowledge, and change management',
      questions: {
        aiExpertise: 'AI/ML expertise and experience',
        dataScience: 'Data science and analytics capabilities',
        engineering: 'Software engineering and DevOps skills',
        domainKnowledge: 'Domain knowledge and business understanding',
        changeManagement: 'Change management and training capabilities'
      }
    },
    regulatoryCompliance: {
      title: 'Regulatory & Ethical Compliance',
      icon: Shield,
      description: 'Assess data privacy, industry regulations, AI ethics, audit trails, and risk assessment',
      questions: {
        dataPrivacy: 'Data privacy and protection compliance',
        industryRegulations: 'Industry-specific regulatory requirements',
        aiEthics: 'AI ethics and bias mitigation frameworks',
        auditTrail: 'Audit trail and explainability capabilities',
        riskAssessment: 'Risk assessment and mitigation strategies'
      }
    },
    businessCase: {
      title: 'Business Case & ROI',
      icon: DollarSign,
      description: 'Evaluate problem definition, ROI potential, stakeholder alignment, success metrics, and competitive advantage',
      questions: {
        problemDefinition: 'Clear problem definition and use case',
        roiPotential: 'ROI potential and business value',
        stakeholderAlignment: 'Stakeholder alignment and buy-in',
        successMetrics: 'Success metrics and KPIs definition',
        competitiveAdvantage: 'Competitive advantage and differentiation'
      }
    },
    organizationalReadiness: {
      title: 'Organizational Readiness',
      icon: Target,
      description: 'Assess leadership support, change management, training programs, communication, and culture',
      questions: {
        leadershipSupport: 'Leadership support and sponsorship',
        changeManagement: 'Change management strategy and execution',
        trainingPrograms: 'Training programs and skill development',
        communication: 'Communication and transparency',
        culture: 'Organizational culture and innovation mindset'
      }
    }
  };

  const calculateCategoryScore = (categoryData) => {
    const values = Object.values(categoryData);
    const validValues = values.filter(v => v !== '');
    if (validValues.length === 0) return 0;
    return Math.round(validValues.reduce((sum, val) => sum + parseInt(val), 0) / validValues.length);
  };

  const calculateOverallScore = () => {
    const categoryScores = Object.keys(categories).map(category => 
      calculateCategoryScore(assessments[category])
    );
    const validScores = categoryScores.filter(score => score > 0);
    if (validScores.length === 0) return 0;
    return Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length);
  };

  const getReadinessLevel = (score) => {
    if (score >= 80) return { level: 'Ready', color: 'text-green-600', bg: 'bg-green-100', description: 'Ready for AI implementation' };
    if (score >= 60) return { level: 'Nearly Ready', color: 'text-yellow-600', bg: 'bg-yellow-100', description: 'Minor improvements needed' };
    if (score >= 40) return { level: 'Needs Work', color: 'text-orange-600', bg: 'bg-orange-100', description: 'Significant improvements required' };
    return { level: 'Not Ready', color: 'text-red-600', bg: 'bg-red-100', description: 'Major foundation work needed' };
  };

  const getRecommendations = (score) => {
    if (score >= 80) {
      return [
        'Begin pilot AI project with high-impact use case',
        'Establish AI governance committee',
        'Create AI ethics review board',
        'Develop AI training program for broader team',
        'Set up continuous monitoring and improvement processes'
      ];
    } else if (score >= 60) {
      return [
        'Strengthen data governance and quality processes',
        'Invest in AI/ML training for key team members',
        'Improve technical infrastructure and ML Ops',
        'Develop clear AI strategy and roadmap',
        'Enhance stakeholder communication and alignment'
      ];
    } else if (score >= 40) {
      return [
        'Build foundational data infrastructure and governance',
        'Hire or train AI/ML experts',
        'Establish basic security and compliance frameworks',
        'Develop clear business case and success metrics',
        'Create change management and training programs'
      ];
    } else {
      return [
        'Start with data foundation and quality improvement',
        'Build basic technical infrastructure',
        'Develop AI strategy and business case',
        'Establish data governance and security policies',
        'Create organizational readiness and training programs'
      ];
    }
  };

  const getTimelineEstimate = (score) => {
    if (score >= 80) return '3-6 months for first AI implementation';
    if (score >= 60) return '6-12 months for AI implementation';
    if (score >= 40) return '12-18 months for AI implementation';
    return '18-24 months for AI implementation';
  };

  const handleAssessmentChange = (category, field, value) => {
    setAssessments(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const overallScore = calculateOverallScore();
  const readinessLevel = getReadinessLevel(overallScore);
  const recommendations = getRecommendations(overallScore);
  const timelineEstimate = getTimelineEstimate(overallScore);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
            <Gauge className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">AI Readiness Assessment</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive evaluation of your organization's readiness for AI implementation across technical, 
          data, team, regulatory, business, and organizational dimensions.
        </p>
      </div>

      {/* Assessment Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {Object.entries(categories).map(([categoryKey, category]) => {
          const IconComponent = category.icon;
          const categoryScore = calculateCategoryScore(assessments[categoryKey]);
          
          return (
            <div key={categoryKey} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(category.questions).map(([field, question]) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {question}
                    </label>
                    <select
                      value={assessments[categoryKey][field]}
                      onChange={(e) => handleAssessmentChange(categoryKey, field, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">Select score...</option>
                      <option value="20">20 - Very Poor</option>
                      <option value="40">40 - Poor</option>
                      <option value="60">60 - Fair</option>
                      <option value="80">80 - Good</option>
                      <option value="100">100 - Excellent</option>
                    </select>
                  </div>
                ))}
              </div>

              {categoryScore > 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Category Score:</span>
                    <span className="text-lg font-bold text-orange-600">{categoryScore}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${categoryScore}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Results Section */}
      {overallScore > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Readiness Assessment Results</h2>
            <p className="text-gray-600">Your organization's readiness for AI implementation</p>
          </div>

          {/* Overall Score */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4">
              <span className="text-2xl font-bold text-white">{overallScore}</span>
            </div>
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${readinessLevel.bg} mb-2`}>
              <CheckCircle className={`h-5 w-5 mr-2 ${readinessLevel.color}`} />
              <span className={`font-semibold ${readinessLevel.color}`}>{readinessLevel.level}</span>
            </div>
            <p className="text-gray-600">{readinessLevel.description}</p>
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {Object.entries(categories).map(([categoryKey, category]) => {
              const categoryScore = calculateCategoryScore(assessments[categoryKey]);
              if (categoryScore === 0) return null;
              
              return (
                <div key={categoryKey} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{category.title}</span>
                    <span className="text-sm font-bold text-orange-600">{categoryScore}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${categoryScore}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timeline Estimate */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-semibold text-blue-900">Implementation Timeline</h4>
                <p className="text-blue-700">{timelineEstimate}</p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Next Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-orange-800">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <a 
            href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2023-generative-ais-breakout-year" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-600 hover:text-orange-800 text-sm font-medium underline"
          >
            Learn more about AI readiness →
          </a>
        </div>
        
        <div className="flex items-center space-x-2">
          {onViewCaseStudies && (
            <button
              onClick={() => onViewCaseStudies('aireadiness')}
              className="flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors"
            >
              <Building2 className="h-4 w-4 mr-1" />
              View Case Studies
            </button>
          )}
          
          {onViewAllSimulators && (
            <button
              onClick={onViewAllSimulators}
              className="flex items-center space-x-2 px-4 py-2 text-orange-600 hover:text-orange-800 transition-colors"
            >
              <Zap className="h-4 w-4" />
              <span>View All Simulators</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIReadinessAssessment; 