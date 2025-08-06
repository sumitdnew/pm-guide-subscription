import React, { useState } from 'react';
import { Target, AlertTriangle, Gift, CheckCircle, FileText, ExternalLink, Users, Lightbulb, Building2, Grid } from 'lucide-react';

const ValuePropositionCanvas = ({ onViewCaseStudies, onViewAllSimulators }) => {
  const [customerJobs, setCustomerJobs] = useState('');
  const [pains, setPains] = useState('');
  const [gains, setGains] = useState('');
  const [products, setProducts] = useState('');
  const [painRelievers, setPainRelievers] = useState('');
  const [gainCreators, setGainCreators] = useState('');

  const generateValueProposition = () => {
    if (!customerJobs || !pains || !gains || !products) {
      return null;
    }

    const valueProp = {
      jobs: customerJobs.split('\n').filter(line => line.trim()),
      pains: pains.split('\n').filter(line => line.trim()),
      gains: gains.split('\n').filter(line => line.trim()),
      products: products.split('\n').filter(line => line.trim()),
      painRelievers: painRelievers.split('\n').filter(line => line.trim()),
      gainCreators: gainCreators.split('\n').filter(line => line.trim())
    };

    return valueProp;
  };

  const valueProp = generateValueProposition();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-teal-50 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-teal-900 mb-2">Value Proposition Canvas</h2>
        <p className="text-teal-700 mb-4">
          Map customer jobs, pains, and gains to your value propositions and product features.
        </p>
        <div className="flex items-center justify-between">
          <a 
            href="https://www.strategyzer.com/canvas/value-proposition-canvas" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium"
          >
            Learn more about Value Proposition Canvas
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
          <div className="flex items-center space-x-2">
            {onViewCaseStudies && (
              <button
                onClick={() => onViewCaseStudies('valueprop')}
                className="flex items-center px-3 py-1 bg-teal-100 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-200 transition-colors"
              >
                <Building2 className="h-4 w-4 mr-1" />
                View Case Studies
              </button>
            )}
            {onViewAllSimulators && (
              <button
                onClick={onViewAllSimulators}
                className="flex items-center space-x-2 px-4 py-2 text-teal-600 hover:text-teal-800 transition-colors"
              >
                <Grid className="h-4 w-4" />
                <span>View All Simulators</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Profile Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-teal-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Customer Profile
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Target className="inline h-4 w-4 mr-1" />
              Customer Jobs (What they want to accomplish)
            </label>
            <textarea
              value={customerJobs}
              onChange={(e) => setCustomerJobs(e.target.value)}
              placeholder="• Functional jobs (tasks they want to complete)&#10;• Social jobs (how they want to be perceived)&#10;• Emotional jobs (how they want to feel)&#10;• Supporting jobs (related activities)"
              className="w-full h-32 p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-teal-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <AlertTriangle className="inline h-4 w-4 mr-1" />
              Pains (What frustrates them)
            </label>
            <textarea
              value={pains}
              onChange={(e) => setPains(e.target.value)}
              placeholder="• Undesired outcomes, obstacles, risks&#10;• Current bad solutions&#10;• Missing capabilities&#10;• Cost, time, effort issues"
              className="w-full h-32 p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-teal-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Gift className="inline h-4 w-4 mr-1" />
              Gains (What they want to achieve)
            </label>
            <textarea
              value={gains}
              onChange={(e) => setGains(e.target.value)}
              placeholder="• Desired outcomes and benefits&#10;• Savings in time, money, effort&#10;• Performance improvements&#10;• Social gains and status"
              className="w-full h-32 p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-teal-50"
            />
          </div>
        </div>

        {/* Value Proposition Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-teal-900 mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2" />
            Value Proposition
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CheckCircle className="inline h-4 w-4 mr-1" />
              Products & Services (What you offer)
            </label>
            <textarea
              value={products}
              onChange={(e) => setProducts(e.target.value)}
              placeholder="• Core products and services&#10;• Supporting products and services&#10;• Key features and capabilities&#10;• Technology and platforms"
              className="w-full h-32 p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-teal-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <AlertTriangle className="inline h-4 w-4 mr-1" />
              Pain Relievers (How you solve their problems)
            </label>
            <textarea
              value={painRelievers}
              onChange={(e) => setPainRelievers(e.target.value)}
              placeholder="• How your solution eliminates pains&#10;• Risk reduction and mitigation&#10;• Cost and time savings&#10;• Better alternatives to current solutions"
              className="w-full h-32 p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-teal-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Gift className="inline h-4 w-4 mr-1" />
              Gain Creators (How you create value)
            </label>
            <textarea
              value={gainCreators}
              onChange={(e) => setGainCreators(e.target.value)}
              placeholder="• How your solution creates gains&#10;• Performance improvements&#10;• New capabilities and benefits&#10;• Social and emotional benefits"
              className="w-full h-32 p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-teal-50"
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      {valueProp && (
        <div className="mt-8">
          <div className="bg-white rounded-lg border border-teal-200 p-6">
            <h3 className="text-lg font-semibold text-teal-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Value Proposition Canvas
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Profile Results */}
              <div className="space-y-4">
                <h4 className="font-medium text-teal-800 mb-3">Customer Profile</h4>
                
                <div>
                  <h5 className="text-sm font-medium text-teal-700 mb-2 flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    Customer Jobs ({valueProp.jobs.length}):
                  </h5>
                  <ul className="space-y-1">
                    {valueProp.jobs.map((job, index) => (
                      <li key={index} className="text-teal-700 flex items-start">
                        <span className="text-teal-500 mr-2">•</span>
                        {job}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-teal-700 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Pains ({valueProp.pains.length}):
                  </h5>
                  <ul className="space-y-1">
                    {valueProp.pains.map((pain, index) => (
                      <li key={index} className="text-teal-700 flex items-start">
                        <span className="text-teal-500 mr-2">•</span>
                        {pain}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-teal-700 mb-2 flex items-center">
                    <Gift className="h-4 w-4 mr-1" />
                    Gains ({valueProp.gains.length}):
                  </h5>
                  <ul className="space-y-1">
                    {valueProp.gains.map((gain, index) => (
                      <li key={index} className="text-teal-700 flex items-start">
                        <span className="text-teal-500 mr-2">•</span>
                        {gain}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Value Proposition Results */}
              <div className="space-y-4">
                <h4 className="font-medium text-teal-800 mb-3">Value Proposition</h4>
                
                <div>
                  <h5 className="text-sm font-medium text-teal-700 mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Products & Services ({valueProp.products.length}):
                  </h5>
                  <ul className="space-y-1">
                    {valueProp.products.map((product, index) => (
                      <li key={index} className="text-teal-700 flex items-start">
                        <span className="text-teal-500 mr-2">•</span>
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-teal-700 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Pain Relievers ({valueProp.painRelievers.length}):
                  </h5>
                  <ul className="space-y-1">
                    {valueProp.painRelievers.map((reliever, index) => (
                      <li key={index} className="text-teal-700 flex items-start">
                        <span className="text-teal-500 mr-2">•</span>
                        {reliever}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-teal-700 mb-2 flex items-center">
                    <Gift className="h-4 w-4 mr-1" />
                    Gain Creators ({valueProp.gainCreators.length}):
                  </h5>
                  <ul className="space-y-1">
                    {valueProp.gainCreators.map((creator, index) => (
                      <li key={index} className="text-teal-700 flex items-start">
                        <span className="text-teal-500 mr-2">•</span>
                        {creator}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">Value Proposition Fit Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-yellow-800 mb-2">Pain Relief Score:</h4>
                <p className="text-yellow-700">
                  {valueProp.painRelievers.length > 0 && valueProp.pains.length > 0 
                    ? `${Math.round((valueProp.painRelievers.length / valueProp.pains.length) * 100)}% of pains addressed`
                    : 'Add pain relievers to match customer pains'}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-yellow-800 mb-2">Gain Creation Score:</h4>
                <p className="text-yellow-700">
                  {valueProp.gainCreators.length > 0 && valueProp.gains.length > 0 
                    ? `${Math.round((valueProp.gainCreators.length / valueProp.gains.length) * 100)}% of gains created`
                    : 'Add gain creators to match customer gains'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValuePropositionCanvas; 