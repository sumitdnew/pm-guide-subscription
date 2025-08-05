import React, { useState } from 'react';

const MarketSizeCalculator = () => {
  const [inputs, setInputs] = useState({
    totalMarket: '',
    addressableSegment: '',
    targetMarket: '',
    marketShare: '',
    marketGrowth: '',
    marketName: ''
  });

  const calculateMarketSize = () => {
    const { 
      totalMarket, 
      addressableSegment, 
      targetMarket, 
      marketShare, 
      marketGrowth
    } = inputs;
    
    if (!totalMarket || !addressableSegment || !targetMarket) return null;

    const tam = parseFloat(totalMarket);
    const sam = parseFloat(addressableSegment);
    const som = parseFloat(targetMarket);
    const share = parseFloat(marketShare) || 0;
    const growth = parseFloat(marketGrowth) || 0;

    // Calculate market sizes
    const tamInBillions = tam / 1000000000;
    const samInBillions = sam / 1000000000;
    const somInBillions = som / 1000000000;
    
    // Calculate potential revenue
    const potentialRevenue = som * (share / 100);
    
    // Calculate growth projections
    const growthRate = growth / 100;
    const projectedRevenue = potentialRevenue * Math.pow(1 + growthRate, 3); // 3-year projection
    
    // Market attractiveness score
    const attractivenessScore = calculateAttractiveness(tam, sam, som, growth, share);

    return {
      tam,
      sam,
      som,
      tamInBillions,
      samInBillions,
      somInBillions,
      potentialRevenue,
      projectedRevenue,
      attractivenessScore,
      share,
      growth
    };
  };

  const calculateAttractiveness = (tam, sam, som, growth, share) => {
    let score = 0;
    
    // Market size factor (0-25 points)
    if (tam > 10000000000) score += 25; // >$10B
    else if (tam > 1000000000) score += 20; // >$1B
    else if (tam > 100000000) score += 15; // >$100M
    else if (tam > 10000000) score += 10; // >$10M
    else score += 5;
    
    // SAM/SOM ratio factor (0-25 points)
    const samSomRatio = sam / som;
    if (samSomRatio > 10) score += 25;
    else if (samSomRatio > 5) score += 20;
    else if (samSomRatio > 2) score += 15;
    else if (samSomRatio > 1) score += 10;
    else score += 5;
    
    // Growth factor (0-25 points)
    if (growth > 20) score += 25;
    else if (growth > 15) score += 20;
    else if (growth > 10) score += 15;
    else if (growth > 5) score += 10;
    else score += 5;
    
    // Market share potential (0-25 points)
    if (share > 10) score += 25;
    else if (share > 5) score += 20;
    else if (share > 2) score += 15;
    else if (share > 1) score += 10;
    else score += 5;
    
    return score;
  };

  const getMarketInsights = (results) => {
    if (!results) return null;

    const { attractivenessScore } = results;
    
    if (attractivenessScore >= 80) {
      return {
        status: 'Highly Attractive',
        color: 'text-green-600',
        bg: 'bg-green-100',
        insight: 'Excellent market opportunity with strong growth potential.'
      };
    } else if (attractivenessScore >= 60) {
      return {
        status: 'Attractive',
        color: 'text-blue-600',
        bg: 'bg-blue-100',
        insight: 'Good market opportunity with solid fundamentals.'
      };
    } else if (attractivenessScore >= 40) {
      return {
        status: 'Moderate',
        color: 'text-yellow-600',
        bg: 'bg-yellow-100',
        insight: 'Moderate opportunity, consider niche strategies.'
      };
    } else {
      return {
        status: 'Challenging',
        color: 'text-red-600',
        bg: 'bg-red-100',
        insight: 'Difficult market, consider alternative strategies.'
      };
    }
  };

  const results = calculateMarketSize();
  const insights = getMarketInsights(results);

  return (
    <div className="bg-sky-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-sky-900 mb-6">Market Size Calculator (TAM/SAM/SOM)</h2>
      
      <div className="bg-sky-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-sky-900 mb-2">About Market Size Analysis Framework</h3>
        <p className="text-sky-800 text-sm mb-3">
          TAM (Total Addressable Market), SAM (Serviceable Addressable Market), and SOM (Serviceable Obtainable Market) 
          help quantify market opportunity and guide strategic decisions. This framework helps investors and stakeholders 
          understand the potential scale of your business opportunity.
        </p>
        <a 
          href="https://www.investopedia.com/terms/t/total-addressable-market-tam.asp" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sky-600 hover:text-sky-800 text-sm font-medium underline"
        >
          Learn more about Market Size Analysis →
        </a>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-sky-800 mb-2">
            Market Name
          </label>
          <input
            type="text"
            value={inputs.marketName}
            onChange={(e) => setInputs(prev => ({...prev, marketName: e.target.value}))}
            placeholder="e.g., Global SaaS Market"
            className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-sky-800 mb-2">
            Total Addressable Market - TAM ($)
          </label>
          <input
            type="number"
            step="1000000"
            min="0"
            value={inputs.totalMarket}
            onChange={(e) => setInputs(prev => ({...prev, totalMarket: e.target.value}))}
            placeholder="e.g., 50000000000"
            className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          />
          <p className="text-xs text-sky-600 mt-1">Total market size if you had 100% market share</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-sky-800 mb-2">
            Serviceable Addressable Market - SAM ($)
          </label>
          <input
            type="number"
            step="1000000"
            min="0"
            value={inputs.addressableSegment}
            onChange={(e) => setInputs(prev => ({...prev, addressableSegment: e.target.value}))}
            placeholder="e.g., 10000000000"
            className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          />
          <p className="text-xs text-sky-600 mt-1">Market segment you can realistically reach</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-sky-800 mb-2">
            Serviceable Obtainable Market - SOM ($)
          </label>
          <input
            type="number"
            step="1000000"
            min="0"
            value={inputs.targetMarket}
            onChange={(e) => setInputs(prev => ({...prev, targetMarket: e.target.value}))}
            placeholder="e.g., 1000000000"
            className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          />
          <p className="text-xs text-sky-600 mt-1">Market you can capture in 3-5 years</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-sky-800 mb-2">
            Target Market Share (%)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={inputs.marketShare}
            onChange={(e) => setInputs(prev => ({...prev, marketShare: e.target.value}))}
            placeholder="e.g., 5"
            className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          />
          <p className="text-xs text-sky-600 mt-1">Realistic market share you can achieve</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-sky-800 mb-2">
            Market Growth Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={inputs.marketGrowth}
            onChange={(e) => setInputs(prev => ({...prev, marketGrowth: e.target.value}))}
            placeholder="e.g., 15"
            className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          />
          <p className="text-xs text-sky-600 mt-1">Annual market growth rate</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-sky-200">
        <h3 className="text-lg font-semibold text-sky-900 mb-4">Market Size Analysis Results</h3>
        
        {results ? (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-sky-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-sky-600 mb-1">
                  ${results.tamInBillions.toFixed(1)}B
                </div>
                <div className="text-sm text-sky-700">TAM</div>
              </div>
              
              <div className="bg-sky-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-sky-600 mb-1">
                  ${results.samInBillions.toFixed(1)}B
                </div>
                <div className="text-sm text-sky-700">SAM</div>
              </div>
              
              <div className="bg-sky-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-sky-600 mb-1">
                  ${results.somInBillions.toFixed(1)}B
                </div>
                <div className="text-sm text-sky-700">SOM</div>
              </div>
              
              <div className="bg-sky-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-sky-600 mb-1">
                  {results.attractivenessScore}
                </div>
                <div className="text-sm text-sky-700">Attractiveness Score</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-sky-100 p-4 rounded-lg">
                <h4 className="font-semibold text-sky-900 mb-3">Revenue Projections</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-sky-800">Potential Revenue:</span>
                    <span className="text-sky-700 font-medium">${results.potentialRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sky-800">3-Year Projection:</span>
                    <span className="text-sky-700 font-medium">${results.projectedRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sky-800">Market Share:</span>
                    <span className="text-sky-700 font-medium">{results.share}%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-sky-100 p-4 rounded-lg">
                <h4 className="font-semibold text-sky-900 mb-3">Market Ratios</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-sky-800">SAM/TAM Ratio:</span>
                    <span className="text-sky-700 font-medium">{((results.sam / results.tam) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sky-800">SOM/SAM Ratio:</span>
                    <span className="text-sky-700 font-medium">{((results.som / results.sam) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sky-800">Growth Rate:</span>
                    <span className="text-sky-700 font-medium">{results.growth}%</span>
                  </div>
                </div>
              </div>
            </div>

            {insights && (
              <div className={`p-4 rounded-lg ${insights.bg}`}>
                <div className="flex items-center mb-2">
                  <div className={`text-lg font-semibold ${insights.color}`}>
                    {insights.status} Market
                  </div>
                </div>
                <p className={`text-sm ${insights.color.replace('text-', 'text-').replace('-600', '-700')}`}>
                  {insights.insight}
                </p>
              </div>
            )}

            <div className="bg-sky-50 p-4 rounded-lg">
              <h4 className="font-semibold text-sky-900 mb-3">Market Strategy Recommendations</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-sky-800">
                <div>
                  <strong className="text-sky-900">High TAM Markets:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Focus on niche segments initially</li>
                    <li>• Build strong competitive moats</li>
                    <li>• Invest in customer acquisition</li>
                    <li>• Plan for rapid scaling</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-sky-900">Niche Markets:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Dominate specific segments</li>
                    <li>• Build deep customer relationships</li>
                    <li>• Focus on retention and expansion</li>
                    <li>• Consider adjacent market expansion</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-sky-100 p-4 rounded-lg">
              <h4 className="font-semibold text-sky-900 mb-3">Next Steps</h4>
              <ul className="space-y-2 text-sm text-sky-800">
                <li className="flex items-start">
                  <span className="text-sky-600 mr-2">•</span>
                  <span><strong>Validate assumptions:</strong> Conduct primary market research</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-600 mr-2">•</span>
                  <span><strong>Monitor trends:</strong> Track market growth and competitive landscape</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-600 mr-2">•</span>
                  <span><strong>Update regularly:</strong> Revisit market size analysis quarterly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-600 mr-2">•</span>
                  <span><strong>Refine strategy:</strong> Adjust go-to-market based on market dynamics</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center text-sky-600 py-8">
            Enter market size data to calculate TAM, SAM, and SOM analysis
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketSizeCalculator; 