import React, { useState, useEffect } from 'react';
import { Cpu, TrendingUp, AlertTriangle, CheckCircle, Clock, Database, Target, BarChart3, Activity, Gauge, Shield, RefreshCw, Eye, AlertCircle, ArrowLeft, Grid } from 'lucide-react';

const AIModelPerformance = ({ onViewCaseStudies, onViewAllSimulators, onBack }) => {
  const [metrics, setMetrics] = useState({
    accuracy: 0.92,
    precision: 0.89,
    recall: 0.94,
    f1Score: 0.91,
    latency: 150,
    throughput: 1000,
    memoryUsage: 75,
    cpuUsage: 60,
    dataQuality: 0.95,
    driftScore: 0.12
  });

  const [historicalData] = useState([
    { date: '2024-01', accuracy: 0.94, drift: 0.08, latency: 120 },
    { date: '2024-02', accuracy: 0.93, drift: 0.09, latency: 125 },
    { date: '2024-03', accuracy: 0.92, drift: 0.11, latency: 135 },
    { date: '2024-04', accuracy: 0.91, drift: 0.13, latency: 145 },
    { date: '2024-05', accuracy: 0.90, drift: 0.15, latency: 155 },
    { date: '2024-06', accuracy: 0.89, drift: 0.18, latency: 165 },
    { date: '2024-07', accuracy: 0.88, drift: 0.20, latency: 175 },
    { date: '2024-08', accuracy: 0.87, drift: 0.22, latency: 185 }
  ]);

  const [alerts, setAlerts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // Calculate model health score
  const calculateHealthScore = () => {
    const accuracyWeight = 0.3;
    const driftWeight = 0.25;
    const latencyWeight = 0.2;
    const qualityWeight = 0.15;
    const resourceWeight = 0.1;

    const accuracyScore = metrics.accuracy * 100;
    const driftScore = Math.max(0, 100 - (metrics.driftScore * 100));
    const latencyScore = Math.max(0, 100 - ((metrics.latency - 100) / 100) * 100);
    const qualityScore = metrics.dataQuality * 100;
    const resourceScore = Math.max(0, 100 - ((metrics.memoryUsage + metrics.cpuUsage) / 2));

    return Math.round(
      accuracyScore * accuracyWeight +
      driftScore * driftWeight +
      latencyScore * latencyWeight +
      qualityScore * qualityWeight +
      resourceScore * resourceWeight
    );
  };

  // Generate alerts based on thresholds
  const generateAlerts = () => {
    const newAlerts = [];
    
    if (metrics.accuracy < 0.90) {
      newAlerts.push({
        type: 'critical',
        message: 'Model accuracy below 90% threshold',
        icon: AlertTriangle
      });
    }
    
    if (metrics.driftScore > 0.15) {
      newAlerts.push({
        type: 'warning',
        message: 'Model drift detected - consider retraining',
        icon: TrendingUp
      });
    }
    
    if (metrics.latency > 200) {
      newAlerts.push({
        type: 'warning',
        message: 'Inference latency above 200ms threshold',
        icon: Clock
      });
    }
    
    if (metrics.memoryUsage > 80) {
      newAlerts.push({
        type: 'info',
        message: 'High memory usage detected',
        icon: Database
      });
    }

    setAlerts(newAlerts);
  };

  // Generate recommendations
  const generateRecommendations = () => {
    const newRecommendations = [];
    
    if (metrics.accuracy < 0.92) {
      newRecommendations.push({
        priority: 'high',
        action: 'Retrain model with updated dataset',
        impact: 'Expected 3-5% accuracy improvement',
        effort: 'Medium'
      });
    }
    
    if (metrics.driftScore > 0.15) {
      newRecommendations.push({
        priority: 'high',
        action: 'Implement drift detection monitoring',
        impact: 'Prevent performance degradation',
        effort: 'Low'
      });
    }
    
    if (metrics.latency > 150) {
      newRecommendations.push({
        priority: 'medium',
        action: 'Optimize model architecture',
        impact: 'Reduce latency by 20-30%',
        effort: 'High'
      });
    }
    
    if (metrics.dataQuality < 0.95) {
      newRecommendations.push({
        priority: 'medium',
        action: 'Improve data preprocessing pipeline',
        impact: 'Better model generalization',
        effort: 'Medium'
      });
    }

    setRecommendations(newRecommendations);
  };

  useEffect(() => {
    generateAlerts();
    generateRecommendations();
  }, [metrics, generateAlerts, generateRecommendations]);

  const healthScore = calculateHealthScore();
  const isHealthy = healthScore >= 80;
  const needsAttention = healthScore < 70;

  const industryBenchmarks = {
    accuracy: { excellent: 0.95, good: 0.90, acceptable: 0.85 },
    latency: { excellent: 100, good: 150, acceptable: 200 },
    drift: { excellent: 0.05, good: 0.10, acceptable: 0.15 }
  };

  const getBenchmarkStatus = (metric, value) => {
    const benchmark = industryBenchmarks[metric];
    if (value >= benchmark.excellent) return { status: 'excellent', color: 'text-green-600' };
    if (value >= benchmark.good) return { status: 'good', color: 'text-blue-600' };
    if (value >= benchmark.acceptable) return { status: 'acceptable', color: 'text-yellow-600' };
    return { status: 'poor', color: 'text-red-600' };
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                            <Cpu className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">AI Model Performance Monitor</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track model performance metrics, detect drift, and monitor health scores to ensure optimal AI model performance.
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
              className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Grid className="h-4 w-4" />
              <span>View All Simulators</span>
            </button>
          </div>
        )}
      </div>

      {/* Health Score Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Model Health Score</h3>
            </div>
            {isHealthy ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : needsAttention ? (
              <AlertTriangle className="h-5 w-5 text-red-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            )}
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold ${isHealthy ? 'text-green-600' : needsAttention ? 'text-red-600' : 'text-yellow-600'}`}>
              {healthScore}%
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {isHealthy ? 'Model is performing well' : needsAttention ? 'Model needs attention' : 'Model performance is acceptable'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Performance Trend</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Accuracy Trend:</span>
              <span className="text-red-600">↓ Declining</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Drift Trend:</span>
              <span className="text-red-600">↑ Increasing</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Latency Trend:</span>
              <span className="text-red-600">↑ Increasing</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{alerts.length}</div>
            <p className="text-sm text-gray-600 mt-2">Alerts requiring attention</p>
          </div>
        </div>
      </div>

      {/* Metrics Input Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
        <div className="flex items-center space-x-2 mb-6">
          <Gauge className="h-5 w-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">Model Metrics</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Accuracy */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model Accuracy
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={metrics.accuracy}
                onChange={(e) => setMetrics({...metrics, accuracy: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className={`text-xs font-medium ${getBenchmarkStatus('accuracy', metrics.accuracy).color}`}>
                  {getBenchmarkStatus('accuracy', metrics.accuracy).status}
                </span>
              </div>
            </div>
          </div>

          {/* Precision */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precision
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={metrics.precision}
              onChange={(e) => setMetrics({...metrics, precision: parseFloat(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Recall */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recall
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={metrics.recall}
              onChange={(e) => setMetrics({...metrics, recall: parseFloat(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* F1 Score */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              F1 Score
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={metrics.f1Score}
              onChange={(e) => setMetrics({...metrics, f1Score: parseFloat(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Latency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inference Latency (ms)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                value={metrics.latency}
                onChange={(e) => setMetrics({...metrics, latency: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className={`text-xs font-medium ${getBenchmarkStatus('latency', metrics.latency).color}`}>
                  {getBenchmarkStatus('latency', metrics.latency).status}
                </span>
              </div>
            </div>
          </div>

          {/* Throughput */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Throughput (req/s)
            </label>
            <input
              type="number"
              min="0"
              value={metrics.throughput}
              onChange={(e) => setMetrics({...metrics, throughput: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Memory Usage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Memory Usage (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={metrics.memoryUsage}
              onChange={(e) => setMetrics({...metrics, memoryUsage: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* CPU Usage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CPU Usage (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={metrics.cpuUsage}
              onChange={(e) => setMetrics({...metrics, cpuUsage: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Data Quality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Quality Score
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={metrics.dataQuality}
              onChange={(e) => setMetrics({...metrics, dataQuality: parseFloat(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Drift Score */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model Drift Score
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={metrics.driftScore}
                onChange={(e) => setMetrics({...metrics, driftScore: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className={`text-xs font-medium ${getBenchmarkStatus('drift', metrics.driftScore).color}`}>
                  {getBenchmarkStatus('drift', metrics.driftScore).status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Alerts */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
          </div>
          <div className="space-y-3">
            {alerts.length > 0 ? (
              alerts.map((alert, index) => {
                const IconComponent = alert.icon;
                return (
                  <div key={index} className={`p-3 rounded-lg border ${
                    alert.type === 'critical' ? 'bg-red-50 border-red-200' :
                    alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <IconComponent className={`h-4 w-4 ${
                        alert.type === 'critical' ? 'text-red-600' :
                        alert.type === 'warning' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`} />
                      <span className="text-sm font-medium text-gray-900">{alert.message}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">No active alerts</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{rec.action}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                    rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {rec.priority}
                  </span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Impact: {rec.impact}</div>
                  <div>Effort: {rec.effort}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="h-5 w-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">Performance Trends</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Accuracy Trend */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Accuracy Over Time</h4>
            <div className="space-y-2">
              {historicalData.slice(-6).map((data, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{data.date}</span>
                  <span className={`font-medium ${
                    data.accuracy >= 0.92 ? 'text-green-600' :
                    data.accuracy >= 0.88 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {(data.accuracy * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Drift Trend */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Drift Score Over Time</h4>
            <div className="space-y-2">
              {historicalData.slice(-6).map((data, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{data.date}</span>
                  <span className={`font-medium ${
                    data.drift <= 0.10 ? 'text-green-600' :
                    data.drift <= 0.15 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {(data.drift * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Latency Trend */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Latency Over Time</h4>
            <div className="space-y-2">
              {historicalData.slice(-6).map((data, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{data.date}</span>
                  <span className={`font-medium ${
                    data.latency <= 150 ? 'text-green-600' :
                    data.latency <= 200 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {data.latency}ms
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Industry Benchmarks */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="h-5 w-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">Industry Benchmarks</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Accuracy Benchmarks</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Excellent:</span>
                <span className="text-green-600">≥ 95%</span>
              </div>
              <div className="flex justify-between">
                <span>Good:</span>
                <span className="text-blue-600">≥ 90%</span>
              </div>
              <div className="flex justify-between">
                <span>Acceptable:</span>
                <span className="text-yellow-600">≥ 85%</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Latency Benchmarks</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Excellent:</span>
                <span className="text-green-600">≤ 100ms</span>
              </div>
              <div className="flex justify-between">
                <span>Good:</span>
                <span className="text-blue-600">≤ 150ms</span>
              </div>
              <div className="flex justify-between">
                <span>Acceptable:</span>
                <span className="text-yellow-600">≤ 200ms</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Drift Benchmarks</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Excellent:</span>
                <span className="text-green-600">≤ 5%</span>
              </div>
              <div className="flex justify-between">
                <span>Good:</span>
                <span className="text-blue-600">≤ 10%</span>
              </div>
              <div className="flex justify-between">
                <span>Acceptable:</span>
                <span className="text-yellow-600">≤ 15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => {
            // Reset to optimal values
            setMetrics({
              accuracy: 0.95,
              precision: 0.93,
              recall: 0.96,
              f1Score: 0.94,
              latency: 100,
              throughput: 1200,
              memoryUsage: 60,
              cpuUsage: 50,
              dataQuality: 0.98,
              driftScore: 0.05
            });
          }}
          className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset to Optimal
        </button>

        {onViewCaseStudies && (
          <button
            onClick={() => onViewCaseStudies('aimodel')}
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

export default AIModelPerformance; 