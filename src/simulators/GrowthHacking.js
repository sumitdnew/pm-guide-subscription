import React, { useState } from 'react';
import { TrendingUp, Target, Zap, BarChart3, Users, DollarSign, FileText, ExternalLink, Rocket, Building2, Grid } from 'lucide-react';

const GrowthHacking = ({ onViewCaseStudies, onViewAllSimulators }) => {
  const [acquisition, setAcquisition] = useState('');
  const [activation, setActivation] = useState('');
  const [retention, setRetention] = useState('');
  const [revenue, setRevenue] = useState('');
  const [referral, setReferral] = useState('');
  const [experiments, setExperiments] = useState('');
  const [metrics, setMetrics] = useState('');

  const generateGrowthStrategy = () => {
    if (!acquisition || !activation || !retention) {
      return null;
    }

    const strategy = {
      acquisition: acquisition.split('\n').filter(line => line.trim()),
      activation: activation.split('\n').filter(line => line.trim()),
      retention: retention.split('\n').filter(line => line.trim()),
      revenue: revenue.split('\n').filter(line => line.trim()),
      referral: referral.split('\n').filter(line => line.trim()),
      experiments: experiments.split('\n').filter(line => line.trim()),
      metrics: metrics.split('\n').filter(line => line.trim())
    };

    return strategy;
  };

  const strategy = generateGrowthStrategy();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-orange-50 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-orange-900 mb-2">Growth Hacking Framework</h2>
        <p className="text-orange-700 mb-4">
          Data-driven marketing focused on rapid experimentation and optimization across the entire customer journey.
        </p>
        <div className="flex items-center justify-between">
          <a 
            href="https://blog.growthhackers.com/what-is-growth-hacking-definitive-guide-f49ab9f5f7ba" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium"
          >
            Learn more about Growth Hacking
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
          <div className="flex items-center space-x-2">
            {onViewCaseStudies && (
              <button
                onClick={() => onViewCaseStudies('growthhacking')}
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
              Acquisition Strategies
            </label>
            <textarea
              value={acquisition}
              onChange={(e) => setAcquisition(e.target.value)}
              placeholder="• Content marketing and SEO&#10;• Social media and viral campaigns&#10;• Paid advertising (PPC, social ads)&#10;• Partnerships and collaborations&#10;• Referral programs"
              className="w-full h-32 p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Zap className="inline h-4 w-4 mr-1" />
              Activation Strategies
            </label>
            <textarea
              value={activation}
              onChange={(e) => setActivation(e.target.value)}
              placeholder="• Onboarding optimization&#10;• First-time user experience&#10;• Feature discovery and engagement&#10;• A/B testing signup flows&#10;• Welcome sequences"
              className="w-full h-32 p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Target className="inline h-4 w-4 mr-1" />
              Retention Strategies
            </label>
            <textarea
              value={retention}
              onChange={(e) => setRetention(e.target.value)}
              placeholder="• Email marketing and re-engagement&#10;• Product feature optimization&#10;• Customer success and support&#10;• Community building&#10;• Personalization and recommendations"
              className="w-full h-32 p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="inline h-4 w-4 mr-1" />
              Revenue Optimization
            </label>
            <textarea
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="• Pricing optimization and testing&#10;• Upselling and cross-selling&#10;• Subscription model optimization&#10;• Payment flow optimization&#10;• Customer lifetime value maximization"
              className="w-full h-32 p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Rocket className="inline h-4 w-4 mr-1" />
              Referral & Viral Strategies
            </label>
            <textarea
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              placeholder="• Referral program design&#10;• Viral coefficient optimization&#10;• Social sharing incentives&#10;• Word-of-mouth campaigns&#10;• Network effects leverage"
              className="w-full h-32 p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <BarChart3 className="inline h-4 w-4 mr-1" />
              Growth Experiments
            </label>
            <textarea
              value={experiments}
              onChange={(e) => setExperiments(e.target.value)}
              placeholder="• A/B testing hypotheses&#10;• Landing page optimization&#10;• Email subject line testing&#10;• Pricing experiments&#10;• Feature adoption tests"
              className="w-full h-32 p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TrendingUp className="inline h-4 w-4 mr-1" />
              Key Metrics & KPIs
            </label>
            <textarea
              value={metrics}
              onChange={(e) => setMetrics(e.target.value)}
              placeholder="• Customer Acquisition Cost (CAC)&#10;• Lifetime Value (LTV)&#10;• Churn rate and retention&#10;• Conversion rates&#10;• Viral coefficient"
              className="w-full h-32 p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {strategy && (
            <>
              <div className="bg-white rounded-lg border border-orange-200 p-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Growth Hacking Strategy
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-orange-800 mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Acquisition ({strategy.acquisition.length} strategies):
                    </h4>
                    <ul className="space-y-1">
                      {strategy.acquisition.map((strategy, index) => (
                        <li key={index} className="text-orange-700 flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-orange-800 mb-2 flex items-center">
                      <Zap className="h-4 w-4 mr-1" />
                      Activation ({strategy.activation.length} strategies):
                    </h4>
                    <ul className="space-y-1">
                      {strategy.activation.map((strategy, index) => (
                        <li key={index} className="text-orange-700 flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-orange-800 mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      Retention ({strategy.retention.length} strategies):
                    </h4>
                    <ul className="space-y-1">
                      {strategy.retention.map((strategy, index) => (
                        <li key={index} className="text-orange-700 flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {strategy.revenue.length > 0 && (
                    <div>
                      <h4 className="font-medium text-orange-800 mb-2 flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Revenue ({strategy.revenue.length} strategies):
                      </h4>
                      <ul className="space-y-1">
                        {strategy.revenue.map((strategy, index) => (
                          <li key={index} className="text-orange-700 flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {strategy.referral.length > 0 && (
                    <div>
                      <h4 className="font-medium text-orange-800 mb-2 flex items-center">
                        <Rocket className="h-4 w-4 mr-1" />
                        Referral ({strategy.referral.length} strategies):
                      </h4>
                      <ul className="space-y-1">
                        {strategy.referral.map((strategy, index) => (
                          <li key={index} className="text-orange-700 flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {strategy.experiments.length > 0 && (
                    <div>
                      <h4 className="font-medium text-orange-800 mb-2 flex items-center">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Experiments ({strategy.experiments.length}):
                      </h4>
                      <ul className="space-y-1">
                        {strategy.experiments.map((experiment, index) => (
                          <li key={index} className="text-orange-700 flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            {experiment}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {strategy.metrics.length > 0 && (
                    <div>
                      <h4 className="font-medium text-orange-800 mb-2 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Key Metrics ({strategy.metrics.length}):
                      </h4>
                      <ul className="space-y-1">
                        {strategy.metrics.map((metric, index) => (
                          <li key={index} className="text-orange-700 flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-4">Growth Hacking Process</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">1</div>
                    <span className="text-orange-800 font-medium">Ideate</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">2</div>
                    <span className="text-orange-800 font-medium">Prioritize</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">3</div>
                    <span className="text-orange-800 font-medium">Test</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">4</div>
                    <span className="text-orange-800 font-medium">Analyze</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">5</div>
                    <span className="text-orange-800 font-medium">Optimize</span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="bg-yellow-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">Growth Hacking Principles</h3>
            <ul className="space-y-2 text-yellow-800">
              <li>• Start with the biggest impact, lowest effort experiments</li>
              <li>• Test everything and let data drive decisions</li>
              <li>• Focus on one metric at a time</li>
              <li>• Move fast and iterate quickly</li>
              <li>• Think outside the box and be creative</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthHacking; 