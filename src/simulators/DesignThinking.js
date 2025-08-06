import React, { useState } from 'react';
import { Heart, Lightbulb, Palette, Play, Eye, Users, Target, CheckCircle, Building2, Grid } from 'lucide-react';

const DesignThinking = ({ onViewCaseStudies, onViewAllSimulators }) => {
  const [empathy, setEmpathy] = useState('');
  const [define, setDefine] = useState('');
  const [ideate, setIdeate] = useState('');
  const [prototype, setPrototype] = useState('');
  const [test, setTest] = useState('');

  const generateDesignThinkingProcess = () => {
    if (!empathy || !define || !ideate) {
      return null;
    }

    const process = {
      empathy: empathy.split('\n').filter(line => line.trim()),
      define: define,
      ideate: ideate.split('\n').filter(line => line.trim()),
      prototype: prototype.split('\n').filter(line => line.trim()),
      test: test.split('\n').filter(line => line.trim())
    };

    return process;
  };

  const process = generateDesignThinkingProcess();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-green-50 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-green-900 mb-2">Design Thinking Framework</h2>
        <p className="text-green-700 mb-4">
          Human-centered approach to innovation and problem-solving through empathy, creativity, and iteration.
        </p>
        <div className="flex items-center justify-between">
          <a 
            href="https://designthinking.ideo.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
          >
            Learn more about Design Thinking
            <Eye className="ml-1 h-4 w-4" />
          </a>
          <div className="flex items-center space-x-2">
            {onViewCaseStudies && (
              <button
                onClick={() => onViewCaseStudies('designthinking')}
                className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
              >
                <Building2 className="h-4 w-4 mr-1" />
                View Case Studies
              </button>
            )}
            {onViewAllSimulators && (
              <button
                onClick={onViewAllSimulators}
                className="flex items-center space-x-2 px-4 py-2 text-green-600 hover:text-green-800 transition-colors"
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
              <Heart className="inline h-4 w-4 mr-1" />
              Empathy Phase - User Research
            </label>
            <textarea
              value={empathy}
              onChange={(e) => setEmpathy(e.target.value)}
              placeholder="• What are the user's pain points?&#10;• How do they currently solve this problem?&#10;• What are their goals and motivations?&#10;• What frustrates them about existing solutions?"
              className="w-full h-32 p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Target className="inline h-4 w-4 mr-1" />
              Define Phase - Problem Statement
            </label>
            <textarea
              value={define}
              onChange={(e) => setDefine(e.target.value)}
              placeholder="[User] needs a way to [need] because [insight]"
              className="w-full h-20 p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Lightbulb className="inline h-4 w-4 mr-1" />
              Ideate Phase - Solution Ideas
            </label>
            <textarea
              value={ideate}
              onChange={(e) => setIdeate(e.target.value)}
              placeholder="• Brainstorm 50+ ideas without judgment&#10;• Use &quot;How might we...&quot; questions&#10;• Consider different perspectives&#10;• Combine and build on ideas"
              className="w-full h-32 p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Palette className="inline h-4 w-4 mr-1" />
              Prototype Phase - Build to Learn
            </label>
            <textarea
              value={prototype}
              onChange={(e) => setPrototype(e.target.value)}
              placeholder="• Create low-fidelity prototypes&#10;• Focus on learning, not perfection&#10;• Use paper, digital tools, or physical models&#10;• Test specific assumptions"
              className="w-full h-20 p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Play className="inline h-4 w-4 mr-1" />
              Test Phase - User Feedback
            </label>
            <textarea
              value={test}
              onChange={(e) => setTest(e.target.value)}
              placeholder="• Test with real users&#10;• Observe behavior, don't just ask&#10;• Gather feedback on usability&#10;• Iterate based on insights"
              className="w-full h-20 p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {process && (
            <>
              <div className="bg-white rounded-lg border border-green-200 p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Design Thinking Process
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-green-800 mb-2 flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      Empathy Insights:
                    </h4>
                    <ul className="space-y-1">
                      {process.empathy.map((insight, index) => (
                        <li key={index} className="text-green-700 flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-800 mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      Problem Statement:
                    </h4>
                    <p className="text-green-700 bg-green-50 p-3 rounded">{process.define}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-800 mb-2 flex items-center">
                      <Lightbulb className="h-4 w-4 mr-1" />
                      Solution Ideas ({process.ideate.length}):
                    </h4>
                    <ul className="space-y-1">
                      {process.ideate.map((idea, index) => (
                        <li key={index} className="text-green-700 flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {idea}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {process.prototype.length > 0 && (
                    <div>
                      <h4 className="font-medium text-green-800 mb-2 flex items-center">
                        <Palette className="h-4 w-4 mr-1" />
                        Prototype Approach:
                      </h4>
                      <ul className="space-y-1">
                        {process.prototype.map((prototype, index) => (
                          <li key={index} className="text-green-700 flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {prototype}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {process.test.length > 0 && (
                    <div>
                      <h4 className="font-medium text-green-800 mb-2 flex items-center">
                        <Play className="h-4 w-4 mr-1" />
                        Testing Strategy:
                      </h4>
                      <ul className="space-y-1">
                        {process.test.map((test, index) => (
                          <li key={index} className="text-green-700 flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {test}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Design Thinking Phases</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">1</div>
                    <span className="text-green-800 font-medium">Empathize</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">2</div>
                    <span className="text-green-800 font-medium">Define</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">3</div>
                    <span className="text-green-800 font-medium">Ideate</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">4</div>
                    <span className="text-green-800 font-medium">Prototype</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">5</div>
                    <span className="text-green-800 font-medium">Test</span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="bg-yellow-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Design Thinking Principles
            </h3>
            <ul className="space-y-2 text-yellow-800">
              <li>• Human-centered: Start with people, not technology</li>
              <li>• Iterative: Build, test, learn, repeat</li>
              <li>• Collaborative: Diverse perspectives create better solutions</li>
              <li>• Experimental: Embrace uncertainty and rapid prototyping</li>
              <li>• Optimistic: Believe in creative problem-solving</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignThinking; 