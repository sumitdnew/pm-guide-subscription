import React, { useState } from 'react';
import { Target, Users, MessageSquare, DollarSign, Calendar, TrendingUp, FileText, ExternalLink, Rocket, Building2, Grid } from 'lucide-react';

const GoToMarketStrategy = ({ onViewCaseStudies, onViewAllSimulators }) => {
  const [targetMarket, setTargetMarket] = useState('');
  const [valueProposition, setValueProposition] = useState('');
  const [channels, setChannels] = useState('');
  const [positioning, setPositioning] = useState('');
  const [launchPlan, setLaunchPlan] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');

  const generateGTMStrategy = () => {
    if (!targetMarket || !valueProposition || !channels || !positioning) {
      return null;
    }

    const strategy = {
      targetMarket: targetMarket.split('\n').filter(line => line.trim()),
      valueProposition: valueProposition,
      channels: channels.split('\n').filter(line => line.trim()),
      positioning: positioning,
      launchPlan: launchPlan.split('\n').filter(line => line.trim()),
      budget: budget,
      timeline: timeline
    };

    return strategy;
  };

  const strategy = generateGTMStrategy();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-purple-50 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-purple-900 mb-2">Go-to-Market Strategy</h2>
        <p className="text-purple-700 mb-4">
          Comprehensive plan for bringing products to market with clear positioning, channels, and launch execution.
        </p>
        <div className="flex items-center justify-between">
          <a 
            href="https://blog.hubspot.com/marketing/go-to-market-strategy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
          >
            Learn more about Go-to-Market Strategy
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
          <div className="flex items-center space-x-2">
            {onViewCaseStudies && (
              <button
                onClick={() => onViewCaseStudies('gtm')}
                className="flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
              >
                <Building2 className="h-4 w-4 mr-1" />
                View Case Studies
              </button>
            )}
            {onViewAllSimulators && (
              <button
                onClick={onViewAllSimulators}
                className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:text-purple-800 transition-colors"
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
              <Target className="inline h-4 w-4 mr-1" />
              Target Market & Segments
            </label>
            <textarea
              value={targetMarket}
              onChange={(e) => setTargetMarket(e.target.value)}
              placeholder="• Primary target customers (demographics, psychographics)&#10;• Secondary market segments&#10;• Market size and opportunity&#10;• Customer acquisition cost targets"
              className="w-full h-32 p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="inline h-4 w-4 mr-1" />
              Value Proposition & Positioning
            </label>
            <textarea
              value={valueProposition}
              onChange={(e) => setValueProposition(e.target.value)}
              placeholder="Clear statement of the unique value you provide to customers and how you differentiate from competitors"
              className="w-full h-20 p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline h-4 w-4 mr-1" />
              Marketing Channels & Tactics
            </label>
            <textarea
              value={channels}
              onChange={(e) => setChannels(e.target.value)}
              placeholder="• Digital marketing (SEO, PPC, social media)&#10;• Content marketing and thought leadership&#10;• Partnerships and collaborations&#10;• Sales channels and distribution"
              className="w-full h-32 p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TrendingUp className="inline h-4 w-4 mr-1" />
              Competitive Positioning
            </label>
            <textarea
              value={positioning}
              onChange={(e) => setPositioning(e.target.value)}
              placeholder="How you want customers to perceive your product relative to competitors - price, quality, features, brand"
              className="w-full h-20 p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Rocket className="inline h-4 w-4 mr-1" />
              Launch Plan & Activities
            </label>
            <textarea
              value={launchPlan}
              onChange={(e) => setLaunchPlan(e.target.value)}
              placeholder="• Pre-launch activities (beta testing, PR)&#10;• Launch day activities&#10;• Post-launch follow-up&#10;• Success metrics and KPIs"
              className="w-full h-32 p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline h-4 w-4 mr-1" />
                Marketing Budget
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g., $50,000"
                className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Timeline
              </label>
              <input
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="e.g., 3 months"
                className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {strategy && (
            <>
              <div className="bg-white rounded-lg border border-purple-200 p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Go-to-Market Strategy
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      Target Market ({strategy.targetMarket.length} segments):
                    </h4>
                    <ul className="space-y-1">
                      {strategy.targetMarket.map((segment, index) => (
                        <li key={index} className="text-purple-700 flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          {segment}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Value Proposition:
                    </h4>
                    <p className="text-purple-700 bg-purple-50 p-3 rounded">{strategy.valueProposition}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Marketing Channels ({strategy.channels.length}):
                    </h4>
                    <ul className="space-y-1">
                      {strategy.channels.map((channel, index) => (
                        <li key={index} className="text-purple-700 flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          {channel}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Competitive Positioning:
                    </h4>
                    <p className="text-purple-700 bg-purple-50 p-3 rounded">{strategy.positioning}</p>
                  </div>

                  {strategy.launchPlan.length > 0 && (
                    <div>
                      <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                        <Rocket className="h-4 w-4 mr-1" />
                        Launch Activities ({strategy.launchPlan.length}):
                      </h4>
                      <ul className="space-y-1">
                        {strategy.launchPlan.map((activity, index) => (
                          <li key={index} className="text-purple-700 flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Budget:
                      </h4>
                      <p className="text-purple-700 bg-purple-50 p-2 rounded">{strategy.budget || 'Not specified'}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Timeline:
                      </h4>
                      <p className="text-purple-700 bg-purple-50 p-2 rounded">{strategy.timeline || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">GTM Framework</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">1</div>
                    <span className="text-purple-800 font-medium">Market Research & Segmentation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">2</div>
                    <span className="text-purple-800 font-medium">Value Proposition Development</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">3</div>
                    <span className="text-purple-800 font-medium">Channel Strategy & Selection</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">4</div>
                    <span className="text-purple-800 font-medium">Launch Planning & Execution</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">5</div>
                    <span className="text-purple-800 font-medium">Measurement & Optimization</span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="bg-yellow-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">GTM Best Practices</h3>
            <ul className="space-y-2 text-yellow-800">
              <li>• Start with a clear target market and value proposition</li>
              <li>• Choose channels based on where your customers are</li>
              <li>• Test and iterate before scaling</li>
              <li>• Align sales and marketing efforts</li>
              <li>• Measure everything and optimize based on data</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoToMarketStrategy; 