import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Eye, TrendingUp, Activity, Download, Trash2, RefreshCw } from 'lucide-react';
import analytics from '../utils/analytics';
import { simulatorConfigs } from '../data';

const AnalyticsDashboard = ({ onClose }) => {
  const [stats, setStats] = useState(null);
  const [frameworkStats, setFrameworkStats] = useState({});
  const [simulatorStats, setSimulatorStats] = useState({});
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = () => {
    const sessionStats = analytics.getSessionStats();
    const frameworkUsage = analytics.getFrameworkUsageStats();
    const simulatorUsage = analytics.getSimulatorUsageStats();

    setStats(sessionStats);
    setFrameworkStats(frameworkUsage);
    setSimulatorStats(simulatorUsage);
  };

  const exportAnalyticsData = () => {
    const data = analytics.getAnalyticsData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pm-guide-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAnalyticsData = () => {
    if (window.confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
      analytics.clearAnalyticsData();
      loadAnalyticsData();
    }
  };

  const getFrameworkName = (id) => {
    const config = simulatorConfigs.find(c => c.id === id);
    return config ? config.name : id;
  };

  const getTopFrameworks = () => {
    return Object.entries(frameworkStats)
      .sort(([,a], [,b]) => b.views - a.views)
      .slice(0, 10)
      .map(([id, data]) => ({
        id,
        name: getFrameworkName(id),
        views: data.views
      }));
  };

  const getTopSimulators = () => {
    return Object.entries(simulatorStats)
      .sort(([,a], [,b]) => b.views - a.views)
      .slice(0, 10)
      .map(([id, data]) => ({
        id,
        name: getFrameworkName(id),
        views: data.views
      }));
  };

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600">Track user engagement and framework usage</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadAnalyticsData}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={exportAnalyticsData}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button
                onClick={clearAnalyticsData}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('frameworks')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'frameworks'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Framework Usage
              </button>
              <button
                onClick={() => setActiveTab('simulators')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'simulators'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Simulator Usage
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Overview Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Total Sessions</p>
                        <p className="text-3xl font-bold">{stats.totalSessions}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Page Views</p>
                        <p className="text-3xl font-bold">{stats.totalPageViews}</p>
                      </div>
                      <Eye className="h-8 w-8 text-green-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Framework Usage</p>
                        <p className="text-3xl font-bold">{stats.totalFrameworkUsage}</p>
                      </div>
                      <Activity className="h-8 w-8 text-purple-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm">Upgrade Attempts</p>
                        <p className="text-3xl font-bold">{stats.totalUpgradeAttempts}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-orange-200" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Average Page Views per Session</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.averagePageViewsPerSession}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Simulator Usage</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalSimulatorUsage}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'frameworks' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Framework Usage Statistics</h2>
                <div className="space-y-4">
                  {getTopFrameworks().map((framework, index) => (
                    <div key={framework.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                            <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{framework.name}</p>
                            <p className="text-sm text-gray-600">{framework.id}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">{framework.views}</p>
                          <p className="text-sm text-gray-600">views</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'simulators' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Simulator Usage Statistics</h2>
                <div className="space-y-4">
                  {getTopSimulators().map((simulator, index) => (
                    <div key={simulator.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                            <span className="text-sm font-bold text-green-600">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{simulator.name}</p>
                            <p className="text-sm text-gray-600">{simulator.id}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">{simulator.views}</p>
                          <p className="text-sm text-gray-600">views</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
