import React, { useState } from 'react';
import { Building2, Target, TrendingUp, Lightbulb, CheckCircle, ExternalLink, ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { caseStudies } from '../data';

const CaseStudyViewer = ({ frameworkId, onBack }) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  
  console.log('CaseStudyViewer received frameworkId:', frameworkId);
  console.log('Available case study keys:', Object.keys(caseStudies));
  console.log('Studies for this framework:', caseStudies[frameworkId]);
  
  const studies = caseStudies[frameworkId] || [];
  
  if (studies.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Case Studies Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We're working on real-world case studies for this framework. Check back soon!
          </p>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Framework
          </button>
        </div>
      </div>
    );
  }

  const currentCase = studies[currentCaseIndex];

  const nextCase = () => {
    setCurrentCaseIndex((prev) => (prev + 1) % studies.length);
  };

  const prevCase = () => {
    setCurrentCaseIndex((prev) => (prev - 1 + studies.length) % studies.length);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Framework
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevCase}
            disabled={studies.length <= 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-gray-600">
            {currentCaseIndex + 1} of {studies.length}
          </span>
          <button
            onClick={nextCase}
            disabled={studies.length <= 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Case Study Content */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
          <div className="flex items-center mb-4">
            <Building2 className="h-8 w-8 mr-3" />
            <div>
              <h1 className="text-3xl font-bold">{currentCase.company}</h1>
              <p className="text-blue-100 text-lg">{currentCase.title}</p>
            </div>
          </div>
          <p className="text-blue-100 text-lg">{currentCase.description}</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Challenge */}
              <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                <div className="flex items-center mb-3">
                  <Target className="h-5 w-5 text-red-600 mr-2" />
                  <h3 className="text-lg font-semibold text-red-900">The Challenge</h3>
                </div>
                <p className="text-red-800">{currentCase.challenge}</p>
              </div>

              {/* Approach */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center mb-3">
                  <Lightbulb className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-blue-900">The Approach</h3>
                </div>
                <p className="text-blue-800">{currentCase.approach}</p>
              </div>

              {/* Results */}
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <div className="flex items-center mb-3">
                  <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-green-900">The Results</h3>
                </div>
                <p className="text-green-800">{currentCase.results}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center mb-3">
                  <Star className="h-5 w-5 text-purple-600 mr-2" />
                  <h3 className="text-lg font-semibold text-purple-900">Key Metrics</h3>
                </div>
                <ul className="space-y-2">
                  {currentCase.metrics.map((metric, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-purple-800">{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Lessons */}
              <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                <div className="flex items-center mb-3">
                  <Lightbulb className="h-5 w-5 text-orange-600 mr-2" />
                  <h3 className="text-lg font-semibold text-orange-900">Key Lessons</h3>
                </div>
                <ul className="space-y-2">
                  {currentCase.lessons.map((lesson, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-orange-800">{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learn More */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Learn More</h3>
                <a
                  href={currentCase.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read the full case study
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {studies.length > 1 && (
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-4">
            <button
              onClick={prevCase}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Case
            </button>
            <button
              onClick={nextCase}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next Case
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudyViewer; 