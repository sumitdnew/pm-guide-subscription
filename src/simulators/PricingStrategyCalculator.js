import React, { useState } from 'react';
import { Grid } from 'lucide-react';

const PricingStrategyCalculator = ({ onViewAllSimulators }) => {
  const [inputs, setInputs] = useState({
    costOfGoods: '',
    fixedCosts: '',
    targetMargin: '',
    competitorPrice: '',
    perceivedValue: '',
    marketSize: '',
    elasticity: ''
  });

  const calculatePricing = () => {
    const { 
      costOfGoods, 
      fixedCosts, 
      targetMargin, 
      competitorPrice, 
      perceivedValue, 
      marketSize
    } = inputs;
    
    if (!costOfGoods || !targetMargin) return null;

    const cog = parseFloat(costOfGoods);
    const fixed = parseFloat(fixedCosts) || 0;
    const margin = parseFloat(targetMargin);
    const compPrice = parseFloat(competitorPrice) || 0;
    const value = parseFloat(perceivedValue) || 0;
    const size = parseFloat(marketSize) || 0;

    // Cost-plus pricing
    const costPlusPrice = cog / (1 - margin / 100);
    
    // Value-based pricing
    const valueBasedPrice = value > 0 ? value * 0.7 : costPlusPrice; // 70% of perceived value
    
    // Competitive pricing
    const competitivePrice = compPrice > 0 ? compPrice : costPlusPrice;
    
    // Optimal price (average of methods)
    const calculatedOptimalPrice = (costPlusPrice + valueBasedPrice + competitivePrice) / 3;
    
    // Profit calculations
    const profitPerUnit = calculatedOptimalPrice - cog;
    const profitMargin = (profitPerUnit / calculatedOptimalPrice) * 100;
    
    // Revenue projections
    const estimatedRevenue = calculatedOptimalPrice * (size || 1000);
    const totalProfit = profitPerUnit * (size || 1000);
    
    // Break-even analysis
    const breakEvenUnits = fixed / profitPerUnit;
    const breakEvenRevenue = breakEvenUnits * calculatedOptimalPrice;

    return {
      costPlusPrice,
      valueBasedPrice,
      competitivePrice,
      optimalPrice: calculatedOptimalPrice,
      profitPerUnit,
      profitMargin,
      estimatedRevenue,
      totalProfit,
      breakEvenUnits,
      breakEvenRevenue,
      cog,
      fixed,
      margin
    };
  };

  const getPricingInsights = (results) => {
    if (!results) return null;

    const { profitMargin } = results;
    
    if (profitMargin > 50) {
      return {
        status: 'Premium Pricing',
        color: 'text-purple-600',
        bg: 'bg-purple-100',
        insight: 'High margin suggests premium positioning opportunity.'
      };
    } else if (profitMargin > 30) {
      return {
        status: 'Standard Pricing',
        color: 'text-blue-600',
        bg: 'bg-blue-100',
        insight: 'Good margin with room for competitive positioning.'
      };
    } else if (profitMargin > 15) {
      return {
        status: 'Value Pricing',
        color: 'text-green-600',
        bg: 'bg-green-100',
        insight: 'Lower margin suggests value-focused strategy.'
      };
    } else {
      return {
        status: 'Cost Leadership',
        color: 'text-orange-600',
        bg: 'bg-orange-100',
        insight: 'Low margin requires high volume or cost optimization.'
      };
    }
  };

  const results = calculatePricing();
  const insights = getPricingInsights(results);

  return (
    <div className="bg-fuchsia-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-fuchsia-900 mb-6">Pricing Strategy Calculator</h2>
      
      {/* Navigation */}
      {onViewAllSimulators && (
        <div className="flex justify-center mb-6">
          <button
            onClick={onViewAllSimulators}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200 shadow-sm"
          >
            <Grid className="h-4 w-4" />
            <span>View All Simulators</span>
          </button>
        </div>
      )}
      
      <div className="bg-fuchsia-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-fuchsia-900 mb-2">About Pricing Strategy Framework</h3>
        <p className="text-fuchsia-800 text-sm mb-3">
          Pricing strategy balances costs, market positioning, and customer value perception. Effective pricing 
          maximizes profitability while remaining competitive and reflecting the value delivered to customers.
        </p>
        <a 
          href="https://www.mckinsey.com/business-functions/marketing-and-sales/our-insights/the-strategic-price-architect" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-fuchsia-600 hover:text-fuchsia-800 text-sm font-medium underline"
        >
          Learn more about Pricing Strategy →
        </a>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-fuchsia-800 mb-2">
            Cost of Goods Sold ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={inputs.costOfGoods}
            onChange={(e) => setInputs(prev => ({...prev, costOfGoods: e.target.value}))}
            placeholder="e.g., 25.00"
            className="w-full p-3 border border-fuchsia-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500"
          />
          <p className="text-xs text-fuchsia-600 mt-1">Direct costs per unit</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-fuchsia-800 mb-2">
            Fixed Costs ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={inputs.fixedCosts}
            onChange={(e) => setInputs(prev => ({...prev, fixedCosts: e.target.value}))}
            placeholder="e.g., 10000"
            className="w-full p-3 border border-fuchsia-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500"
          />
          <p className="text-xs text-fuchsia-600 mt-1">Total fixed costs</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-fuchsia-800 mb-2">
            Target Margin (%)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={inputs.targetMargin}
            onChange={(e) => setInputs(prev => ({...prev, targetMargin: e.target.value}))}
            placeholder="e.g., 30"
            className="w-full p-3 border border-fuchsia-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500"
          />
          <p className="text-xs text-fuchsia-600 mt-1">Desired profit margin</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-fuchsia-800 mb-2">
            Competitor Price ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={inputs.competitorPrice}
            onChange={(e) => setInputs(prev => ({...prev, competitorPrice: e.target.value}))}
            placeholder="e.g., 75.00"
            className="w-full p-3 border border-fuchsia-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500"
          />
          <p className="text-xs text-fuchsia-600 mt-1">Main competitor's price</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-fuchsia-800 mb-2">
            Perceived Value ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={inputs.perceivedValue}
            onChange={(e) => setInputs(prev => ({...prev, perceivedValue: e.target.value}))}
            placeholder="e.g., 100.00"
            className="w-full p-3 border border-fuchsia-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500"
          />
          <p className="text-xs text-fuchsia-600 mt-1">Customer's perceived value</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-fuchsia-800 mb-2">
            Market Size (units)
          </label>
          <input
            type="number"
            min="0"
            value={inputs.marketSize}
            onChange={(e) => setInputs(prev => ({...prev, marketSize: e.target.value}))}
            placeholder="e.g., 10000"
            className="w-full p-3 border border-fuchsia-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500"
          />
          <p className="text-xs text-fuchsia-600 mt-1">Estimated market size</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-fuchsia-200">
        <h3 className="text-lg font-semibold text-fuchsia-900 mb-4">Pricing Analysis Results</h3>
        
        {results ? (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-fuchsia-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-fuchsia-600 mb-1">
                  ${results.optimalPrice.toFixed(2)}
                </div>
                <div className="text-sm text-fuchsia-700">Optimal Price</div>
              </div>
              
              <div className="bg-fuchsia-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-fuchsia-600 mb-1">
                  ${results.profitPerUnit.toFixed(2)}
                </div>
                <div className="text-sm text-fuchsia-700">Profit per Unit</div>
              </div>
              
              <div className="bg-fuchsia-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-fuchsia-600 mb-1">
                  {results.profitMargin.toFixed(1)}%
                </div>
                <div className="text-sm text-fuchsia-700">Profit Margin</div>
              </div>
              
              <div className="bg-fuchsia-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-fuchsia-600 mb-1">
                  ${results.estimatedRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-fuchsia-700">Est. Revenue</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-fuchsia-100 p-4 rounded-lg">
                <h4 className="font-semibold text-fuchsia-900 mb-3">Pricing Methods</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-fuchsia-800">Cost-Plus:</span>
                    <span className="text-fuchsia-700 font-medium">${results.costPlusPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-fuchsia-800">Value-Based:</span>
                    <span className="text-fuchsia-700 font-medium">${results.valueBasedPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-fuchsia-800">Competitive:</span>
                    <span className="text-fuchsia-700 font-medium">${results.competitivePrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-fuchsia-100 p-4 rounded-lg">
                <h4 className="font-semibold text-fuchsia-900 mb-3">Break-Even Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-fuchsia-800">Break-Even Units:</span>
                    <span className="text-fuchsia-700 font-medium">{Math.ceil(results.breakEvenUnits)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-fuchsia-800">Break-Even Revenue:</span>
                    <span className="text-fuchsia-700 font-medium">${results.breakEvenRevenue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-fuchsia-800">Total Profit:</span>
                    <span className="text-fuchsia-700 font-medium">${results.totalProfit.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {insights && (
              <div className={`p-4 rounded-lg ${insights.bg}`}>
                <div className="flex items-center mb-2">
                  <div className={`text-lg font-semibold ${insights.color}`}>
                    {insights.status}
                  </div>
                </div>
                <p className={`text-sm ${insights.color.replace('text-', 'text-').replace('-600', '-700')}`}>
                  {insights.insight}
                </p>
              </div>
            )}

            <div className="bg-fuchsia-50 p-4 rounded-lg">
              <h4 className="font-semibold text-fuchsia-900 mb-3">Pricing Strategy Recommendations</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-fuchsia-800">
                <div>
                  <strong className="text-fuchsia-900">Premium Strategy:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Emphasize unique value proposition</li>
                    <li>• Target high-value customers</li>
                    <li>• Invest in quality and service</li>
                    <li>• Build brand differentiation</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-fuchsia-900">Value Strategy:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Focus on cost efficiency</li>
                    <li>• Optimize operations</li>
                    <li>• Scale for volume</li>
                    <li>• Compete on price</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-fuchsia-100 p-4 rounded-lg">
              <h4 className="font-semibold text-fuchsia-900 mb-3">Implementation Tips</h4>
              <ul className="space-y-2 text-sm text-fuchsia-800">
                <li className="flex items-start">
                  <span className="text-fuchsia-600 mr-2">•</span>
                  <span><strong>Test pricing:</strong> Use A/B testing to validate price points</span>
                </li>
                <li className="flex items-start">
                  <span className="text-fuchsia-600 mr-2">•</span>
                  <span><strong>Monitor competition:</strong> Track competitor price changes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-fuchsia-600 mr-2">•</span>
                  <span><strong>Customer feedback:</strong> Survey customers on price sensitivity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-fuchsia-600 mr-2">•</span>
                  <span><strong>Dynamic pricing:</strong> Consider seasonal or demand-based adjustments</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center text-fuchsia-600 py-8">
            Enter cost and margin data to calculate optimal pricing strategy
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingStrategyCalculator; 