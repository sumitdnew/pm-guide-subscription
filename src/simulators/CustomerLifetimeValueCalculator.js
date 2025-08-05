import React, { useState } from 'react';

const CustomerLifetimeValueCalculator = () => {
  const [inputs, setInputs] = useState({
    averageOrderValue: '',
    purchaseFrequency: '',
    customerLifespan: '',
    customerAcquisitionCost: '',
    retentionRate: '',
    discountRate: ''
  });

  const calculateCLV = () => {
    const { 
      averageOrderValue, 
      purchaseFrequency, 
      customerLifespan, 
      customerAcquisitionCost, 
      retentionRate, 
      discountRate 
    } = inputs;
    
    if (!averageOrderValue || !purchaseFrequency || !customerLifespan) return null;

    const aov = parseFloat(averageOrderValue);
    const frequency = parseFloat(purchaseFrequency);
    const lifespan = parseFloat(customerLifespan);
    const cac = parseFloat(customerAcquisitionCost) || 0;
    const retention = parseFloat(retentionRate) || 100;
    const discount = parseFloat(discountRate) || 0;

    // Simple CLV calculation
    const simpleCLV = aov * frequency * lifespan;
    
    // CLV with retention rate
    const retentionCLV = aov * frequency * lifespan * (retention / 100);
    
    // CLV with discount rate (present value)
    const discountFactor = discount > 0 ? (1 - discount / 100) : 1;
    const discountedCLV = retentionCLV * Math.pow(discountFactor, lifespan);
    
    // Net CLV (subtracting acquisition cost)
    const netCLV = discountedCLV - cac;
    
    // Payback period
    const paybackPeriod = cac > 0 ? cac / (aov * frequency) : 0;
    
    // ROI
    const roi = cac > 0 ? ((netCLV - cac) / cac) * 100 : 0;

    return {
      simpleCLV,
      retentionCLV,
      discountedCLV,
      netCLV,
      paybackPeriod,
      roi,
      cac,
      retention,
      discount
    };
  };

  const getCLVInsights = (results) => {
    if (!results) return null;

    const { netCLV, roi } = results;
    
    if (netCLV > 1000 && roi > 300) {
      return {
        status: 'Excellent',
        color: 'text-green-600',
        bg: 'bg-green-100',
        insight: 'Very high CLV indicates strong product-market fit and customer satisfaction.'
      };
    } else if (netCLV > 500 && roi > 100) {
      return {
        status: 'Good',
        color: 'text-blue-600',
        bg: 'bg-blue-100',
        insight: 'Good CLV with room for improvement. Focus on retention and upselling.'
      };
    } else if (netCLV > 100 && roi > 0) {
      return {
        status: 'Fair',
        color: 'text-yellow-600',
        bg: 'bg-yellow-100',
        insight: 'Moderate CLV. Consider optimizing pricing and customer experience.'
      };
    } else {
      return {
        status: 'Poor',
        color: 'text-red-600',
        bg: 'bg-red-100',
        insight: 'Low CLV indicates issues with pricing, retention, or product-market fit.'
      };
    }
  };

  const results = calculateCLV();
  const insights = getCLVInsights(results);

  return (
    <div className="bg-amber-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-amber-900 mb-6">Customer Lifetime Value Calculator</h2>
      
      <div className="bg-amber-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-amber-900 mb-2">About Customer Lifetime Value Framework</h3>
        <p className="text-amber-800 text-sm mb-3">
          Customer Lifetime Value (CLV) measures the total revenue a customer generates over their relationship with your 
          business. It helps optimize customer acquisition costs, retention strategies, and overall business profitability 
          by understanding long-term customer value.
        </p>
        <a 
          href="https://blog.hubspot.com/service/what-does-cltv-mean" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-amber-600 hover:text-amber-800 text-sm font-medium underline"
        >
          Learn more about Customer Lifetime Value →
        </a>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-2">
            Average Order Value ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={inputs.averageOrderValue}
            onChange={(e) => setInputs(prev => ({...prev, averageOrderValue: e.target.value}))}
            placeholder="e.g., 50.00"
            className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          />
          <p className="text-xs text-amber-600 mt-1">Average amount spent per transaction</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-2">
            Purchase Frequency (per year)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={inputs.purchaseFrequency}
            onChange={(e) => setInputs(prev => ({...prev, purchaseFrequency: e.target.value}))}
            placeholder="e.g., 12"
            className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          />
          <p className="text-xs text-amber-600 mt-1">How often customers buy per year</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-2">
            Customer Lifespan (years)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={inputs.customerLifespan}
            onChange={(e) => setInputs(prev => ({...prev, customerLifespan: e.target.value}))}
            placeholder="e.g., 3"
            className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          />
          <p className="text-xs text-amber-600 mt-1">How long customers stay with you</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-2">
            Customer Acquisition Cost ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={inputs.customerAcquisitionCost}
            onChange={(e) => setInputs(prev => ({...prev, customerAcquisitionCost: e.target.value}))}
            placeholder="e.g., 25.00"
            className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          />
          <p className="text-xs text-amber-600 mt-1">Cost to acquire a new customer</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-2">
            Retention Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={inputs.retentionRate}
            onChange={(e) => setInputs(prev => ({...prev, retentionRate: e.target.value}))}
            placeholder="e.g., 85"
            className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          />
          <p className="text-xs text-amber-600 mt-1">Percentage of customers who stay</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-2">
            Discount Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={inputs.discountRate}
            onChange={(e) => setInputs(prev => ({...prev, discountRate: e.target.value}))}
            placeholder="e.g., 10"
            className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          />
          <p className="text-xs text-amber-600 mt-1">Time value of money discount</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-amber-200">
        <h3 className="text-lg font-semibold text-amber-900 mb-4">CLV Analysis Results</h3>
        
        {results ? (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-amber-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">
                  ${results.simpleCLV.toFixed(2)}
                </div>
                <div className="text-sm text-amber-700">Simple CLV</div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">
                  ${results.retentionCLV.toFixed(2)}
                </div>
                <div className="text-sm text-amber-700">With Retention</div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">
                  ${results.discountedCLV.toFixed(2)}
                </div>
                <div className="text-sm text-amber-700">Discounted CLV</div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">
                  ${results.netCLV.toFixed(2)}
                </div>
                <div className="text-sm text-amber-700">Net CLV</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-amber-100 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-900 mb-3">Business Metrics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-amber-800">Payback Period:</span>
                    <span className="text-amber-700 font-medium">
                      {results.paybackPeriod > 0 ? `${results.paybackPeriod.toFixed(1)} years` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-800">ROI:</span>
                    <span className="text-amber-700 font-medium">
                      {results.roi > 0 ? `${results.roi.toFixed(1)}%` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-800">CAC:</span>
                    <span className="text-amber-700 font-medium">
                      ${results.cac.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-100 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-900 mb-3">Parameters Used</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-amber-800">Retention Rate:</span>
                    <span className="text-amber-700 font-medium">{results.retention}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-800">Discount Rate:</span>
                    <span className="text-amber-700 font-medium">{results.discount}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-800">Lifespan:</span>
                    <span className="text-amber-700 font-medium">{inputs.customerLifespan} years</span>
                  </div>
                </div>
              </div>
            </div>

            {insights && (
              <div className={`p-4 rounded-lg ${insights.bg}`}>
                <div className="flex items-center mb-2">
                  <div className={`text-lg font-semibold ${insights.color}`}>
                    {insights.status} CLV
                  </div>
                </div>
                <p className={`text-sm ${insights.color.replace('text-', 'text-').replace('-600', '-700')}`}>
                  {insights.insight}
                </p>
              </div>
            )}

            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-900 mb-3">CLV Optimization Strategies</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-800">
                <div>
                  <strong className="text-amber-900">Increase CLV:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Raise average order value</li>
                    <li>• Increase purchase frequency</li>
                    <li>• Extend customer lifespan</li>
                    <li>• Improve retention rate</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-amber-900">Reduce CAC:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Optimize marketing channels</li>
                    <li>• Improve conversion rates</li>
                    <li>• Leverage organic growth</li>
                    <li>• Focus on high-value segments</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-100 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-900 mb-3">Industry Benchmarks</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-amber-800">
                <div>
                  <strong className="text-amber-900">SaaS:</strong>
                  <p className="text-amber-700">CLV:CAC ratio of 3:1 or higher</p>
                </div>
                <div>
                  <strong className="text-amber-900">E-commerce:</strong>
                  <p className="text-amber-700">CLV:CAC ratio of 2:1 or higher</p>
                </div>
                <div>
                  <strong className="text-amber-900">Subscription:</strong>
                  <p className="text-amber-700">Payback period under 12 months</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-amber-600 py-8">
            Enter customer data to calculate your Customer Lifetime Value
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerLifetimeValueCalculator; 