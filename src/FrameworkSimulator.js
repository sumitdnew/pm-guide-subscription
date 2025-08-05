import React, { useState } from 'react';
import { Calculator, FileText, GitBranch, Star, BarChart3, Compass, Rocket, Target, CheckCircle, Filter, Users, TrendingUp, ArrowLeft, Sparkles, BookOpen, DollarSign, Heart, Crown, Lock } from 'lucide-react';
import { simulatorConfigs } from './data';
import CaseStudyViewer from './components/CaseStudyViewer';
import { isSimulatorAvailableInDemo, getDemoLimitationMessage } from './config/demo';
import UpgradePage from './components/UpgradePage';
import RiceCalculator from './simulators/RiceCalculator';
import IceCalculator from './simulators/IceCalculator';
import JtbdGenerator from './simulators/JtbdGenerator';
import ForcesAnalyzer from './simulators/ForcesAnalyzer';
import KanoAnalyzer from './simulators/KanoAnalyzer';
import PmfMeasurement from './simulators/PmfMeasurement';
import SwotAnalysis from './simulators/SwotAnalysis';
import AarrrMetrics from './simulators/AarrrMetrics';
import OkrGenerator from './simulators/OkrGenerator';
import NorthStarFramework from './simulators/NorthStarFramework';
import MoscowMethod from './simulators/MoscowMethod';
import UserPersonaGenerator from './simulators/UserPersonaGenerator';
import CohortAnalysisCalculator from './simulators/CohortAnalysisCalculator';
import AbTestSampleSizeCalculator from './simulators/AbTestSampleSizeCalculator';
import CustomerLifetimeValueCalculator from './simulators/CustomerLifetimeValueCalculator';
import CompetitiveAnalysisMatrix from './simulators/CompetitiveAnalysisMatrix';
import PricingStrategyCalculator from './simulators/PricingStrategyCalculator';
import MarketSizeCalculator from './simulators/MarketSizeCalculator';
import CustomerDevelopment from './simulators/CustomerDevelopment';
import DesignThinking from './simulators/DesignThinking';
import ValuePropositionCanvas from './simulators/ValuePropositionCanvas';
import GoToMarketStrategy from './simulators/GoToMarketStrategy';
import GrowthHacking from './simulators/GrowthHacking';

const FrameworkSimulator = ({ onBack, framework = '', isDemo = false }) => {
  const [simulatorType, setSimulatorType] = useState(framework);
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [showCaseStudies, setShowCaseStudies] = useState(false);
  const [currentCaseStudyFramework, setCurrentCaseStudyFramework] = useState('');
  const [showUpgradePage, setShowUpgradePage] = useState(false);
  
  console.log('FrameworkSimulator - isDemo:', isDemo, 'showUpgradePage:', showUpgradePage);

  const phases = [
    { value: 'all', label: 'All Phases', icon: Star },
    { value: 'discovery', label: 'Discovery & Validation', icon: Compass },
    { value: 'strategy', label: 'Strategy & Positioning', icon: Target },
    { value: 'planning', label: 'Planning & Prioritization', icon: GitBranch },
    { value: 'development', label: 'Development & Building', icon: Rocket },
    { value: 'launch', label: 'Launch & Go-to-Market', icon: TrendingUp },
    { value: 'growth', label: 'Growth & Optimization', icon: BarChart3 },
    { value: 'scale', label: 'Scale & Expansion', icon: Users }
  ];

  const filteredConfigs = selectedPhase === 'all' 
    ? simulatorConfigs 
    : simulatorConfigs.filter(config => config.phases.includes(selectedPhase));

  // For demo mode, show all configs but mark some as locked
  const availableConfigs = filteredConfigs;

  const handleViewCaseStudies = (frameworkId) => {
    setCurrentCaseStudyFramework(frameworkId);
    setShowCaseStudies(true);
  };

  const handleBackFromCaseStudies = () => {
    setShowCaseStudies(false);
    setCurrentCaseStudyFramework('');
  };

  const renderSimulator = () => {
    switch (simulatorType) {
      case 'rice':
        return <RiceCalculator onViewCaseStudies={handleViewCaseStudies} />;
      case 'ice':
        return <IceCalculator onViewCaseStudies={handleViewCaseStudies} />;
      case 'jtbd':
        return <JtbdGenerator onViewCaseStudies={handleViewCaseStudies} />;
      case 'forces':
        return <ForcesAnalyzer onViewCaseStudies={handleViewCaseStudies} />;
      case 'kano':
        return <KanoAnalyzer onViewCaseStudies={handleViewCaseStudies} />;
      case 'pmf':
        return <PmfMeasurement onViewCaseStudies={handleViewCaseStudies} />;
      case 'swot':
        return <SwotAnalysis onViewCaseStudies={handleViewCaseStudies} />;
      case 'aarrr':
        return <AarrrMetrics onViewCaseStudies={handleViewCaseStudies} />;
      case 'okr':
        return <OkrGenerator onViewCaseStudies={handleViewCaseStudies} />;
      case 'northstar':
        return <NorthStarFramework onViewCaseStudies={handleViewCaseStudies} />;
      case 'moscow':
        return <MoscowMethod onViewCaseStudies={handleViewCaseStudies} />;
      case 'persona':
        return <UserPersonaGenerator onViewCaseStudies={handleViewCaseStudies} />;
      case 'cohort':
        return <CohortAnalysisCalculator onViewCaseStudies={handleViewCaseStudies} />;
      case 'abtest':
        return <AbTestSampleSizeCalculator onViewCaseStudies={handleViewCaseStudies} />;
      case 'clv':
        return <CustomerLifetimeValueCalculator onViewCaseStudies={handleViewCaseStudies} />;
      case 'competitive':
        return <CompetitiveAnalysisMatrix onViewCaseStudies={handleViewCaseStudies} />;
      case 'pricing':
        return <PricingStrategyCalculator onViewCaseStudies={handleViewCaseStudies} />;
      case 'marketsize':
        return <MarketSizeCalculator onViewCaseStudies={handleViewCaseStudies} />;
      case 'customerdev':
        return <CustomerDevelopment onViewCaseStudies={handleViewCaseStudies} />;
      case 'designthinking':
        return <DesignThinking onViewCaseStudies={handleViewCaseStudies} />;
      case 'valueprop':
        return <ValuePropositionCanvas onViewCaseStudies={handleViewCaseStudies} />;
      case 'gtm':
        return <GoToMarketStrategy onViewCaseStudies={handleViewCaseStudies} />;
      case 'growthhacking':
        return <GrowthHacking onViewCaseStudies={handleViewCaseStudies} />;
      default:
        return null;
    }
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      Calculator, FileText, GitBranch, Star, BarChart3, Compass, Rocket, 
      Target, CheckCircle, Filter, Users, TrendingUp, DollarSign, Heart
    };
    return iconMap[iconName] || Calculator;
  };

  if (showCaseStudies) {
    return (
      <CaseStudyViewer 
        frameworkId={currentCaseStudyFramework}
        onBack={handleBackFromCaseStudies}
      />
    );
  }

  if (simulatorType && simulatorType !== 'all') {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Frameworks</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Calculator className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Framework Simulator</h1>
          </div>
        </div>

        {/* Simulator Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {renderSimulator()}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Framework Simulators</h1>
          {isDemo && (
            <div className="flex items-center space-x-2 ml-4">
              <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-medium rounded-full">
                DEMO
              </div>
            </div>
          )}
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Interactive tools to help you apply product management frameworks and methodologies in practice.
        </p>
        {isDemo && (
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Crown className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Demo Version</span>
            </div>
                    <p className="text-sm text-green-700">
          You can see all frameworks but only 2 simulators are available in demo. {getDemoLimitationMessage().upgrade}
        </p>
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Recommendations</span>
        </button>
      </div>

      {/* Phase Filter */}
      <div className="mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filter by Phase</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {phases.map((phase) => {
              const IconComponent = phase.icon;
              return (
                <button
                  key={phase.value}
                  onClick={() => setSelectedPhase(phase.value)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
                    selectedPhase === phase.value
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-500 shadow-md'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm font-medium">{phase.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Frameworks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableConfigs.map((config) => {
          const IconComponent = getIconComponent(config.icon);
          return (
            <div
              key={config.id}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={() => setSimulatorType(config.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center space-x-1">
                  {config.phases.map((phase) => (
                    <span
                      key={phase}
                      className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full"
                    >
                      {phase}
                    </span>
                  ))}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {config.name}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {config.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <BookOpen className="h-4 w-4" />
                  <span>{config.category}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewCaseStudies(config.id);
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Case Studies
                  </button>
                  
                  {isDemo && !isSimulatorAvailableInDemo(config.id) ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Upgrade button clicked, setting showUpgradePage to true');
                        setShowUpgradePage(true);
                      }}
                      className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-500 rounded-lg flex items-center space-x-1 hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      <Lock className="h-3 w-3" />
                      <span>Upgrade Required</span>
                    </button>
                  ) : (
                    <button className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                      Try Simulator
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {availableConfigs.length === 0 && (
        <div className="text-center py-12">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Sparkles className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No frameworks found</h3>
          <p className="text-gray-600">Try selecting a different phase or check back later for new frameworks.</p>
        </div>
      )}

      {/* Upgrade Page */}
      {showUpgradePage && (
        <div>
          {console.log('Rendering UpgradePage, showUpgradePage:', showUpgradePage)}
          <UpgradePage onClose={() => setShowUpgradePage(false)} isDemo={isDemo} />
        </div>
      )}
    </div>
  );
};

export default FrameworkSimulator;