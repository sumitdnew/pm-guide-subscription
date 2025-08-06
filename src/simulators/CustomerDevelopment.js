import React, { useState } from 'react';
import { Users, Target, CheckCircle, AlertCircle, FileText, MessageSquare, TrendingUp, Lightbulb, Building2, Grid } from 'lucide-react';

const CustomerDevelopment = ({ onViewCaseStudies, onViewAllSimulators }) => {
  const [customerInterviews, setCustomerInterviews] = useState('');
  const [hypothesis, setHypothesis] = useState('');
  const [validationMethod, setValidationMethod] = useState('');
  const [insights, setInsights] = useState('');
  const [nextSteps, setNextSteps] = useState('');

  const generateCustomerDevelopmentPlan = () => {
    if (!customerInterviews || !hypothesis || !validationMethod) {
      return null;
    }

    const plan = {
      interviews: customerInterviews.split('\n').filter(line => line.trim()),
      hypothesis: hypothesis,
      validation: validationMethod,
      insights: insights.split('\n').filter(line => line.trim()),
      nextSteps: nextSteps.split('\n').filter(line => line.trim())
    };

    return plan;
  };

  const plan = generateCustomerDevelopmentPlan();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Customer Development Framework</h2>
        <p className="text-blue-700 mb-4">
          Systematic process for discovering and validating customer needs through structured interviews and hypothesis testing.
        </p>
        <div className="flex items-center justify-between">
          <a 
            href="https://steveblank.com/category/customer-development/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            Learn more about Customer Development
            <MessageSquare className="ml-1 h-4 w-4" />
          </a>
          <div className="flex items-center space-x-2">
            {onViewCaseStudies && (
              <button
                onClick={() => onViewCaseStudies('customerdev')}
                className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                <Building2 className="h-4 w-4 mr-1" />
                View Case Studies
              </button>
            )}
            {onViewAllSimulators && (
              <button
                onClick={onViewAllSimulators}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Grid className="h-4 w-4" />
                <span>View All Simulators</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline h-4 w-4 mr-1" />
              Customer Interview Questions
            </label>
            <textarea
              value={customerInterviews}
              onChange={(e) => setCustomerInterviews(e.target.value)}
              placeholder="• What problem are you trying to solve?&#10;• How do you currently solve this problem?&#10;• What would make your life easier?&#10;• How much would you pay for a solution?"
              className="w-full h-32 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Target className="inline h-4 w-4 mr-1" />
              Key Hypothesis to Test
            </label>
            <textarea
              value={hypothesis}
              onChange={(e) => setHypothesis(e.target.value)}
              placeholder="We believe that [target customer] has [problem] and would pay [amount] for [solution]"
              className="w-full h-20 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CheckCircle className="inline h-4 w-4 mr-1" />
              Validation Method
            </label>
            <textarea
              value={validationMethod}
              onChange={(e) => setValidationMethod(e.target.value)}
              placeholder="• Customer interviews (10-20 people)&#10;• Landing page with signup form&#10;• Concierge MVP test&#10;• Survey with specific questions"
              className="w-full h-20 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Lightbulb className="inline h-4 w-4 mr-1" />
              Key Insights from Interviews
            </label>
            <textarea
              value={insights}
              onChange={(e) => setInsights(e.target.value)}
              placeholder="• Common pain points mentioned&#10;• Willingness to pay signals&#10;• Current solution frustrations&#10;• Decision-making factors"
              className="w-full h-20 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TrendingUp className="inline h-4 w-4 mr-1" />
              Next Steps
            </label>
            <textarea
              value={nextSteps}
              onChange={(e) => setNextSteps(e.target.value)}
              placeholder="• Schedule 5 more interviews&#10;• Create landing page MVP&#10;• Test pricing assumptions&#10;• Refine value proposition"
              className="w-full h-20 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {plan && (
            <>
              <div className="bg-white rounded-lg border border-blue-200 p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Customer Development Plan
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Hypothesis to Test:</h4>
                    <p className="text-blue-700 bg-blue-50 p-3 rounded">{plan.hypothesis}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Validation Method:</h4>
                    <p className="text-blue-700 bg-blue-50 p-3 rounded">{plan.validation}</p>
                  </div>

                  {plan.interviews.length > 0 && (
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Interview Questions ({plan.interviews.length}):</h4>
                      <ul className="space-y-1">
                        {plan.interviews.map((question, index) => (
                          <li key={index} className="text-blue-700 flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {question}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {plan.insights.length > 0 && (
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Key Insights:</h4>
                      <ul className="space-y-1">
                        {plan.insights.map((insight, index) => (
                          <li key={index} className="text-blue-700 flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {plan.nextSteps.length > 0 && (
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Next Steps:</h4>
                      <ul className="space-y-1">
                        {plan.nextSteps.map((step, index) => (
                          <li key={index} className="text-blue-700 flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Customer Development Process</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">1</div>
                    <span className="text-blue-800 font-medium">Customer Discovery</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">2</div>
                    <span className="text-blue-800 font-medium">Customer Validation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">3</div>
                    <span className="text-blue-800 font-medium">Customer Creation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">4</div>
                    <span className="text-blue-800 font-medium">Company Building</span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="bg-yellow-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Best Practices
            </h3>
            <ul className="space-y-2 text-yellow-800">
              <li>• Interview 10-20 customers before making decisions</li>
              <li>• Ask open-ended questions, not leading questions</li>
              <li>• Focus on problems, not solutions</li>
              <li>• Document everything and look for patterns</li>
              <li>• Be prepared to pivot based on insights</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDevelopment; 