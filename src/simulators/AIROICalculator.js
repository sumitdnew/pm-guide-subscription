import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Calculator, AlertTriangle, CheckCircle, Clock, Database, Target, BarChart3, Activity, Gauge, Shield, RefreshCw, Eye, ArrowLeft, Grid, Zap, Users, Settings, FileText, BarChart, PieChart, LineChart } from 'lucide-react';

const AIROICalculator = ({ onViewCaseStudies, onViewAllSimulators, onBack }) => {
  const [inputs, setInputs] = useState({
    // Costs
    developmentCost: 150000,
    infrastructureCost: 50000,
    dataCost: 25000,
    maintenanceCost: 30000,
    complianceCost: 20000,
    modelRetrainingCost: 15000,
    monitoringCost: 10000,
    
    // Benefits
    efficiencyGains: 25, // percentage
    costSavings: 100000,
    revenueIncrease: 200000,
    riskReduction: 50000,
    
    // Timeline and Scaling
    implementationTimeline: 12, // months
    scalingFactor: 1.5,
    riskAdjustment: 0.15, // 15% risk adjustment
    
    // Additional Factors
    discountRate: 0.10, // 10% discount rate
    projectLifespan: 36, // months
    teamSize: 5,
    dataQuality: 0.85,
    modelAccuracy: 0.92
  });

  const [scenarios, setScenarios] = useState({
    optimistic: { costMultiplier: 0.8, benefitMultiplier: 1.3 },
    realistic: { costMultiplier: 1.0, benefitMultiplier: 1.0 },
    pessimistic: { costMultiplier: 1.3, benefitMultiplier: 0.7 }
  });

  const [selectedScenario, setSelectedScenario] = useState('realistic');

  // Calculate total costs
  const calculateTotalCosts = (scenario = 'realistic') => {
    const multiplier = scenarios[scenario].costMultiplier;
    const baseCosts = {
      development: inputs.developmentCost,
      infrastructure: inputs.infrastructureCost,
      data: inputs.dataCost,
      maintenance: inputs.maintenanceCost,
      compliance: inputs.complianceCost,
      retraining: inputs.modelRetrainingCost,
      monitoring: inputs.monitoringCost
    };

    const totalBaseCost = Object.values(baseCosts).reduce((sum, cost) => sum + cost, 0);
    const adjustedCosts = Object.keys(baseCosts).map(key => ({
      category: key,
      amount: baseCosts[key] * multiplier
    }));

    return {
      total: totalBaseCost * multiplier,
      breakdown: adjustedCosts,
      baseCosts
    };
  };

  // Calculate total benefits
  const calculateTotalBenefits = (scenario = 'realistic') => {
    const multiplier = scenarios[scenario].benefitMultiplier;
    const efficiencyValue = (inputs.costSavings * inputs.efficiencyGains / 100);
    const totalBenefits = efficiencyValue + inputs.costSavings + inputs.revenueIncrease + inputs.riskReduction;
    
    return {
      total: totalBenefits * multiplier,
      breakdown: [
        { category: 'Efficiency Gains', amount: efficiencyValue * multiplier },
        { category: 'Cost Savings', amount: inputs.costSavings * multiplier },
        { category: 'Revenue Increase', amount: inputs.revenueIncrease * multiplier },
        { category: 'Risk Reduction', amount: inputs.riskReduction * multiplier }
      ]
    };
  };

  // Calculate ROI
  const calculateROI = (scenario = 'realistic') => {
    const costs = calculateTotalCosts(scenario);
    const benefits = calculateTotalBenefits(scenario);
    const netBenefit = benefits.total - costs.total;
    const roi = costs.total > 0 ? (netBenefit / costs.total) * 100 : 0;
    
    return {
      roi: roi,
      netBenefit: netBenefit,
      paybackPeriod: costs.total > 0 ? costs.total / (benefits.total / inputs.projectLifespan) : 0,
      breakEvenPoint: costs.total > 0 ? costs.total / (benefits.total / 12) : 0 // months
    };
  };

  // Calculate risk-adjusted ROI
  const calculateRiskAdjustedROI = () => {
    const baseROI = calculateROI(selectedScenario);
    const riskAdjustedROI = baseROI.roi * (1 - inputs.riskAdjustment);
    
    return {
      baseROI: baseROI.roi,
      riskAdjustedROI: riskAdjustedROI,
      riskAdjustment: inputs.riskAdjustment * 100
    };
  };

  // Calculate NPV (Net Present Value)
  const calculateNPV = () => {
    const costs = calculateTotalCosts(selectedScenario);
    const benefits = calculateTotalBenefits(selectedScenario);
    const monthlyBenefit = benefits.total / inputs.projectLifespan;
    const monthlyCost = costs.total / inputs.implementationTimeline;
    
    let npv = -costs.total; // Initial investment
    
    for (let month = 1; month <= inputs.projectLifespan; month++) {
      const monthlyNetCashFlow = monthlyBenefit - (month <= inputs.implementationTimeline ? monthlyCost : 0);
      npv += monthlyNetCashFlow / Math.pow(1 + inputs.discountRate / 12, month);
    }
    
    return npv;
  };

  // Industry benchmarks
  const industryBenchmarks = {
    aiRoi: { excellent: 300, good: 150, acceptable: 50 },
    paybackPeriod: { excellent: 6, good: 12, acceptable: 18 },
    npv: { excellent: 500000, good: 200000, acceptable: 50000 }
  };

  const getBenchmarkStatus = (metric, value) => {
    const benchmark = industryBenchmarks[metric];
    if (value >= benchmark.excellent) return { status: 'excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (value >= benchmark.good) return { status: 'good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (value >= benchmark.acceptable) return { status: 'acceptable', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { status: 'poor', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const roiResults = calculateROI(selectedScenario);
  const riskAdjustedResults = calculateRiskAdjustedROI();
  const npv = calculateNPV();
  const costs = calculateTotalCosts(selectedScenario);
  const benefits = calculateTotalBenefits(selectedScenario);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl">
            <DollarSign className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">AI ROI Calculator</h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Calculate the return on investment for AI projects with comprehensive cost analysis, benefit modeling, 
          risk-adjusted calculations, and scenario planning. Includes break-even analysis and industry benchmarks.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Frameworks</span>
            </button>
          )}
        </div>
        {onViewAllSimulators && (
          <div className="flex items-center space-x-4">
            <button
              onClick={onViewAllSimulators}
              className="flex items-center space-x-2 px-4 py-2 text-teal-600 hover:text-teal-800 transition-colors"
            >
              <Grid className="h-4 w-4" />
              <span>View All Simulators</span>
            </button>
          </div>
        )}
      </div>

      {/* ROI Summary Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-900">ROI</h3>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getBenchmarkStatus('aiRoi', roiResults.roi).bg} ${getBenchmarkStatus('aiRoi', roiResults.roi).color}`}>
              {getBenchmarkStatus('aiRoi', roiResults.roi).status}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${roiResults.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {roiResults.roi.toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {roiResults.roi >= 0 ? 'Positive ROI' : 'Negative ROI'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Calculator className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Net Benefit</h3>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${roiResults.netBenefit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${(roiResults.netBenefit / 1000).toFixed(0)}k
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {roiResults.netBenefit >= 0 ? 'Profitable' : 'Loss'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Payback Period</h3>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${getBenchmarkStatus('paybackPeriod', roiResults.paybackPeriod).color}`}>
              {roiResults.paybackPeriod.toFixed(1)}m
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {roiResults.paybackPeriod <= 12 ? 'Fast payback' : 'Longer payback'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">NPV</h3>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${getBenchmarkStatus('npv', npv).color}`}>
              ${(npv / 1000).toFixed(0)}k
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {npv >= 0 ? 'Positive NPV' : 'Negative NPV'}
            </p>
          </div>
        </div>
      </div>

      {/* Scenario Selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
        <div className="flex items-center space-x-2 mb-6">
          <Activity className="h-5 w-5 text-teal-600" />
          <h2 className="text-xl font-semibold text-gray-900">Scenario Planning</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(scenarios).map(([key, scenario]) => (
            <button
              key={key}
              onClick={() => setSelectedScenario(key)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedScenario === key
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 bg-gray-50 hover:border-teal-300'
              }`}
            >
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 capitalize mb-2">{key}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Costs: {scenario.costMultiplier}x</div>
                  <div>Benefits: {scenario.benefitMultiplier}x</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Costs Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <DollarSign className="h-5 w-5 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900">Project Costs</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Development Cost ($)
              </label>
              <input
                type="number"
                value={inputs.developmentCost}
                onChange={(e) => setInputs({...inputs, developmentCost: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Infrastructure Cost ($)
              </label>
              <input
                type="number"
                value={inputs.infrastructureCost}
                onChange={(e) => setInputs({...inputs, infrastructureCost: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Acquisition Cost ($)
              </label>
              <input
                type="number"
                value={inputs.dataCost}
                onChange={(e) => setInputs({...inputs, dataCost: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maintenance Cost ($)
              </label>
              <input
                type="number"
                value={inputs.maintenanceCost}
                onChange={(e) => setInputs({...inputs, maintenanceCost: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compliance & Security ($)
              </label>
              <input
                type="number"
                value={inputs.complianceCost}
                onChange={(e) => setInputs({...inputs, complianceCost: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model Retraining Cost ($)
              </label>
              <input
                type="number"
                value={inputs.modelRetrainingCost}
                onChange={(e) => setInputs({...inputs, modelRetrainingCost: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monitoring & Alerting ($)
              </label>
              <input
                type="number"
                value={inputs.monitoringCost}
                onChange={(e) => setInputs({...inputs, monitoringCost: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Project Benefits</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Efficiency Gains (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={inputs.efficiencyGains}
                onChange={(e) => setInputs({...inputs, efficiencyGains: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost Savings ($)
              </label>
              <input
                type="number"
                value={inputs.costSavings}
                onChange={(e) => setInputs({...inputs, costSavings: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Revenue Increase ($)
              </label>
              <input
                type="number"
                value={inputs.revenueIncrease}
                onChange={(e) => setInputs({...inputs, revenueIncrease: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Risk Reduction Value ($)
              </label>
              <input
                type="number"
                value={inputs.riskReduction}
                onChange={(e) => setInputs({...inputs, riskReduction: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Timeline and Risk Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <Clock className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Timeline & Scaling</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Implementation Timeline (months)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={inputs.implementationTimeline}
                onChange={(e) => setInputs({...inputs, implementationTimeline: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scaling Factor
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="5"
                value={inputs.scalingFactor}
                onChange={(e) => setInputs({...inputs, scalingFactor: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Lifespan (months)
              </label>
              <input
                type="number"
                min="6"
                max="120"
                value={inputs.projectLifespan}
                onChange={(e) => setInputs({...inputs, projectLifespan: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={inputs.discountRate * 100}
                onChange={(e) => setInputs({...inputs, discountRate: parseFloat(e.target.value) / 100})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="h-5 w-5 text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900">Risk & Quality Factors</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Risk Adjustment Factor (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={inputs.riskAdjustment * 100}
                onChange={(e) => setInputs({...inputs, riskAdjustment: parseFloat(e.target.value) / 100})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Size
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={inputs.teamSize}
                onChange={(e) => setInputs({...inputs, teamSize: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Quality Score (0-1)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={inputs.dataQuality}
                onChange={(e) => setInputs({...inputs, dataQuality: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model Accuracy (0-1)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={inputs.modelAccuracy}
                onChange={(e) => setInputs({...inputs, modelAccuracy: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Cost Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <PieChart className="h-5 w-5 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900">Cost Breakdown</h2>
          </div>
          
          <div className="space-y-3">
            {costs.breakdown.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700 capitalize">{item.category}</span>
                <span className="text-gray-900 font-semibold">${item.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t pt-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Total Costs</span>
                <span className="text-xl font-bold text-red-600">${costs.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefit Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <BarChart className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Benefit Breakdown</h2>
          </div>
          
          <div className="space-y-3">
            {benefits.breakdown.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">{item.category}</span>
                <span className="text-gray-900 font-semibold">${item.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t pt-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Total Benefits</span>
                <span className="text-xl font-bold text-green-600">${benefits.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk-Adjusted Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
        <div className="flex items-center space-x-2 mb-6">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          <h2 className="text-xl font-semibold text-gray-900">Risk-Adjusted Analysis</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{riskAdjustedResults.baseROI.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Base ROI</div>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{riskAdjustedResults.riskAdjustment.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Risk Adjustment</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{riskAdjustedResults.riskAdjustedROI.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Risk-Adjusted ROI</div>
          </div>
        </div>
      </div>

      {/* Break-Even Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
        <div className="flex items-center space-x-2 mb-6">
          <Target className="h-5 w-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">Break-Even Analysis</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Break-Even Point</h4>
            <div className="text-2xl font-bold text-purple-600">{roiResults.breakEvenPoint.toFixed(1)} months</div>
            <p className="text-sm text-gray-600 mt-2">
              Time to recover initial investment
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Payback Period</h4>
            <div className="text-2xl font-bold text-blue-600">{roiResults.paybackPeriod.toFixed(1)} months</div>
            <p className="text-sm text-gray-600 mt-2">
              Time to recover total costs
            </p>
          </div>
        </div>
      </div>

      {/* Industry Benchmarks */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="h-5 w-5 text-teal-600" />
          <h2 className="text-xl font-semibold text-gray-900">Industry Benchmarks</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">AI Project ROI</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Excellent:</span>
                <span className="text-green-600">≥ 300%</span>
              </div>
              <div className="flex justify-between">
                <span>Good:</span>
                <span className="text-blue-600">≥ 150%</span>
              </div>
              <div className="flex justify-between">
                <span>Acceptable:</span>
                <span className="text-yellow-600">≥ 50%</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Payback Period</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Excellent:</span>
                <span className="text-green-600">≤ 6 months</span>
              </div>
              <div className="flex justify-between">
                <span>Good:</span>
                <span className="text-blue-600">≤ 12 months</span>
              </div>
              <div className="flex justify-between">
                <span>Acceptable:</span>
                <span className="text-yellow-600">≤ 18 months</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">NPV Thresholds</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Excellent:</span>
                <span className="text-green-600">≥ $500k</span>
              </div>
              <div className="flex justify-between">
                <span>Good:</span>
                <span className="text-blue-600">≥ $200k</span>
              </div>
              <div className="flex justify-between">
                <span>Acceptable:</span>
                <span className="text-yellow-600">≥ $50k</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => {
            // Reset to realistic values
            setInputs({
              developmentCost: 150000,
              infrastructureCost: 50000,
              dataCost: 25000,
              maintenanceCost: 30000,
              complianceCost: 20000,
              modelRetrainingCost: 15000,
              monitoringCost: 10000,
              efficiencyGains: 25,
              costSavings: 100000,
              revenueIncrease: 200000,
              riskReduction: 50000,
              implementationTimeline: 12,
              scalingFactor: 1.5,
              riskAdjustment: 0.15,
              discountRate: 0.10,
              projectLifespan: 36,
              teamSize: 5,
              dataQuality: 0.85,
              modelAccuracy: 0.92
            });
            setSelectedScenario('realistic');
          }}
          className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg font-medium hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset to Default
        </button>

        {onViewCaseStudies && (
          <button
            onClick={() => onViewCaseStudies('airoi')}
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Case Studies
          </button>
        )}
      </div>
    </div>
  );
};

export default AIROICalculator; 