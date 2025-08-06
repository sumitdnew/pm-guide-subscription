import React, { useState, useEffect } from 'react';
import { Database, FileSearch, AlertTriangle, CheckCircle, XCircle, Eye, FileText, AlertCircle, DollarSign, RefreshCw as RefreshCwIcon, ArrowLeft, Grid } from 'lucide-react';
import jsPDF from 'jspdf';

const AIDataQuality = ({ onViewCaseStudies, onViewAllSimulators, onBack }) => {
  const [dataQuality, setDataQuality] = useState({
    completeness: 0.85,
    accuracy: 0.78,
    consistency: 0.82,
    relevance: 0.90,
    timeliness: 0.75,
    validity: 0.88
  });

  const [labelingAccuracy, setLabelingAccuracy] = useState({
    interAnnotatorAgreement: 0.82,
    labelConsistency: 0.85,
    annotationGuidelines: 0.90,
    qualityChecks: 0.78,
    expertReview: 0.88,
    automatedValidation: 0.75
  });

  const [biasDetection, setBiasDetection] = useState({
    demographicBalance: 0.80,
    featureDistribution: 0.85,
    samplingBias: 0.72,
    temporalBias: 0.78,
    geographicBias: 0.83,
    selectionBias: 0.75
  });

  const [dataLineage, setDataLineage] = useState({
    versionControl: 0.88,
    sourceTracking: 0.85,
    transformationHistory: 0.80,
    auditTrail: 0.82,
    metadataCompleteness: 0.78,
    dataCatalog: 0.85
  });

  const [costEstimates, setCostEstimates] = useState({
    dataCollection: 50000,
    labelingServices: 30000,
    qualityAssurance: 20000,
    biasMitigation: 25000,
    infrastructure: 15000,
    expertConsultation: 10000
  });

  const [recommendations, setRecommendations] = useState([]);
  const [qualityScore, setQualityScore] = useState(0);

  const calculateQualityScore = () => {
    const dataQualityScore = Object.values(dataQuality).reduce((a, b) => a + b, 0) / 6;
    const labelingScore = Object.values(labelingAccuracy).reduce((a, b) => a + b, 0) / 6;
    const biasScore = Object.values(biasDetection).reduce((a, b) => a + b, 0) / 6;
    const lineageScore = Object.values(dataLineage).reduce((a, b) => a + b, 0) / 6;
    
    const totalScore = (
      dataQualityScore * 0.35 +
      labelingScore * 0.25 +
      biasScore * 0.25 +
      lineageScore * 0.15
    ) * 100;
    
    return Math.round(totalScore);
  };

  const generateRecommendations = () => {
    const recommendations = [];
    const score = calculateQualityScore();

    if (score < 75) {
      recommendations.push({
        priority: 'High',
        category: 'Data Quality',
        action: 'Implement automated data validation and cleaning pipelines',
        impact: 'Critical for model performance and reliability',
        cost: 15000
      });
    }

    if (dataQuality.completeness < 0.8) {
      recommendations.push({
        priority: 'Medium',
        category: 'Data Completeness',
        action: 'Establish data collection protocols and missing data handling strategies',
        impact: 'Improves model robustness and reduces bias',
        cost: 8000
      });
    }

    if (labelingAccuracy.interAnnotatorAgreement < 0.85) {
      recommendations.push({
        priority: 'High',
        category: 'Labeling Quality',
        action: 'Improve annotation guidelines and implement quality control measures',
        impact: 'Essential for training reliable models',
        cost: 12000
      });
    }

    if (biasDetection.demographicBalance < 0.8) {
      recommendations.push({
        priority: 'High',
        category: 'Bias Mitigation',
        action: 'Implement balanced sampling and bias detection algorithms',
        impact: 'Prevents discriminatory outcomes and improves fairness',
        cost: 20000
      });
    }

    if (dataLineage.versionControl < 0.9) {
      recommendations.push({
        priority: 'Medium',
        category: 'Data Lineage',
        action: 'Implement comprehensive data versioning and tracking systems',
        impact: 'Ensures reproducibility and compliance',
        cost: 10000
      });
    }

    return recommendations;
  };

  useEffect(() => {
    setQualityScore(calculateQualityScore());
    setRecommendations(generateRecommendations());
  }, [dataQuality, labelingAccuracy, biasDetection, dataLineage, calculateQualityScore, generateRecommendations]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  const handleDataQualityChange = (metric, value) => {
    setDataQuality(prev => ({
      ...prev,
      [metric]: parseFloat(value)
    }));
  };

  const handleLabelingChange = (metric, value) => {
    setLabelingAccuracy(prev => ({
      ...prev,
      [metric]: parseFloat(value)
    }));
  };

  const handleBiasChange = (metric, value) => {
    setBiasDetection(prev => ({
      ...prev,
      [metric]: parseFloat(value)
    }));
  };

  const handleLineageChange = (metric, value) => {
    setDataLineage(prev => ({
      ...prev,
      [metric]: parseFloat(value)
    }));
  };

  const handleCostChange = (item, value) => {
    setCostEstimates(prev => ({
      ...prev,
      [item]: parseInt(value)
    }));
  };

  const calculateTotalCost = () => {
    return Object.values(costEstimates).reduce((a, b) => a + b, 0);
  };

  const exportToPDF = (report, title = 'AI Data Quality Assessment Report') => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text(title, 20, 20);
    
    // Date
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);
    
    let yPosition = 45;
    
    // Overall Quality Score
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('OVERALL QUALITY SCORE', 20, yPosition);
    doc.setFontSize(14);
    doc.text(`${report.qualityScore}%`, 20, yPosition + 8);
    yPosition += 20;
    
    // Data Quality Metrics
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('DATA QUALITY METRICS:', 20, yPosition);
    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`• Completeness: ${Math.round(report.dataQuality.completeness * 100)}%`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Accuracy: ${Math.round(report.dataQuality.accuracy * 100)}%`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Consistency: ${Math.round(report.dataQuality.consistency * 100)}%`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Relevance: ${Math.round(report.dataQuality.relevance * 100)}%`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Timeliness: ${Math.round(report.dataQuality.timeliness * 100)}%`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Validity: ${Math.round(report.dataQuality.validity * 100)}%`, 25, yPosition);
    yPosition += 10;
    
    // Labeling Accuracy
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('LABELING ACCURACY:', 20, yPosition);
    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`• Inter-Annotator Agreement: ${Math.round(report.labelingAccuracy.interAnnotatorAgreement * 100)}%`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Label Consistency: ${Math.round(report.labelingAccuracy.labelConsistency * 100)}%`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Annotation Guidelines: ${Math.round(report.labelingAccuracy.annotationGuidelines * 100)}%`, 25, yPosition);
    yPosition += 10;
    
    // Bias Detection
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('BIAS DETECTION:', 20, yPosition);
    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`• Demographic Balance: ${Math.round(report.biasDetection.demographicBalance * 100)}%`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Feature Distribution: ${Math.round(report.biasDetection.featureDistribution * 100)}%`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Sampling Bias: ${Math.round(report.biasDetection.samplingBias * 100)}%`, 25, yPosition);
    yPosition += 10;
    
    // Data Lineage
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('DATA LINEAGE:', 20, yPosition);
    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`• Version Control: ${Math.round(report.dataLineage.versionControl * 100)}%`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Source Tracking: ${Math.round(report.dataLineage.sourceTracking * 100)}%`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Audit Trail: ${Math.round(report.dataLineage.auditTrail * 100)}%`, 25, yPosition);
    yPosition += 10;
    
    // Cost Estimation
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('COST ESTIMATION:', 20, yPosition);
    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Total Estimated Cost: $${report.totalCost.toLocaleString()}`, 25, yPosition);
    yPosition += 10;
    
    // Recommendations
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('RECOMMENDATIONS:', 20, yPosition);
    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    report.recommendations.forEach(rec => {
      const text = `• ${rec.priority} Priority - ${rec.category}: ${rec.action} (Cost: $${rec.cost.toLocaleString()})`;
      const lines = doc.splitTextToSize(text, 170);
      lines.forEach(line => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, 25, yPosition);
        yPosition += 5;
      });
      yPosition += 3;
    });
    
    // Status
    yPosition += 5;
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    const status = report.qualityScore >= 80 ? 'EXCELLENT' : report.qualityScore >= 60 ? 'GOOD' : 'NEEDS IMPROVEMENT';
    doc.text(`STATUS: ${status}`, 20, yPosition);
    
    doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const dataQualityMetrics = [
    { key: 'completeness', label: 'Data Completeness', description: 'Percentage of required data fields that are populated' },
    { key: 'accuracy', label: 'Data Accuracy', description: 'Correctness and precision of data values' },
    { key: 'consistency', label: 'Data Consistency', description: 'Uniformity of data format and structure' },
    { key: 'relevance', label: 'Data Relevance', description: 'Applicability of data to the intended use case' },
    { key: 'timeliness', label: 'Data Timeliness', description: 'Freshness and currency of data' },
    { key: 'validity', label: 'Data Validity', description: 'Conformity to business rules and constraints' }
  ];

  const labelingMetrics = [
    { key: 'interAnnotatorAgreement', label: 'Inter-Annotator Agreement', description: 'Consistency between different annotators' },
    { key: 'labelConsistency', label: 'Label Consistency', description: 'Uniformity in labeling across datasets' },
    { key: 'annotationGuidelines', label: 'Annotation Guidelines', description: 'Quality and clarity of labeling instructions' },
    { key: 'qualityChecks', label: 'Quality Checks', description: 'Automated and manual validation processes' },
    { key: 'expertReview', label: 'Expert Review', description: 'Validation by domain experts' },
    { key: 'automatedValidation', label: 'Automated Validation', description: 'Algorithmic quality assessment' }
  ];

  const biasMetrics = [
    { key: 'demographicBalance', label: 'Demographic Balance', description: 'Representation across different population groups' },
    { key: 'featureDistribution', label: 'Feature Distribution', description: 'Balance in feature values across classes' },
    { key: 'samplingBias', label: 'Sampling Bias', description: 'Systematic errors in data collection methods' },
    { key: 'temporalBias', label: 'Temporal Bias', description: 'Time-based variations in data collection' },
    { key: 'geographicBias', label: 'Geographic Bias', description: 'Regional variations in data sources' },
    { key: 'selectionBias', label: 'Selection Bias', description: 'Systematic differences in data selection' }
  ];

  const lineageMetrics = [
    { key: 'versionControl', label: 'Version Control', description: 'Tracking of data versions and changes' },
    { key: 'sourceTracking', label: 'Source Tracking', description: 'Documentation of data origins' },
    { key: 'transformationHistory', label: 'Transformation History', description: 'Record of data processing steps' },
    { key: 'auditTrail', label: 'Audit Trail', description: 'Comprehensive logging of data operations' },
    { key: 'metadataCompleteness', label: 'Metadata Completeness', description: 'Documentation of data attributes' },
    { key: 'dataCatalog', label: 'Data Catalog', description: 'Centralized data inventory and discovery' }
  ];

  const costItems = [
    { key: 'dataCollection', label: 'Data Collection', description: 'Costs for gathering new data' },
    { key: 'labelingServices', label: 'Labeling Services', description: 'Manual annotation and labeling' },
    { key: 'qualityAssurance', label: 'Quality Assurance', description: 'Data validation and testing' },
    { key: 'biasMitigation', label: 'Bias Mitigation', description: 'Bias detection and correction' },
    { key: 'infrastructure', label: 'Infrastructure', description: 'Data storage and processing systems' },
    { key: 'expertConsultation', label: 'Expert Consultation', description: 'Domain expert review and guidance' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-full mr-4">
            <Database className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Data Quality Assessment</h1>
            <p className="text-gray-600">Evaluate and improve training data quality for AI models</p>
          </div>
        </div>
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

      {/* Quality Score Dashboard */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Data Quality Score</h2>
            <p className="text-gray-600">Overall data quality assessment</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">{qualityScore}</div>
            <div className="text-sm text-gray-500">out of 100</div>
          </div>
          <div className="flex items-center">
            {getScoreIcon(qualityScore)}
            <span className={`ml-2 font-semibold ${getScoreColor(qualityScore)}`}>
              {qualityScore >= 80 ? 'Excellent' : qualityScore >= 60 ? 'Good' : 'Needs Improvement'}
            </span>
          </div>
        </div>
      </div>

      {/* Data Quality Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Database className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Data Quality Metrics</h3>
          </div>
          <div className="space-y-4">
            {dataQualityMetrics.map((metric) => (
              <div key={metric.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {metric.label}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={dataQuality[metric.key]}
                  onChange={(e) => handleDataQualityChange(metric.key, e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>{Math.round(dataQuality[metric.key] * 100)}%</span>
                  <span>100%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Labeling Accuracy */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FileSearch className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Labeling Accuracy</h3>
          </div>
          <div className="space-y-4">
            {labelingMetrics.map((metric) => (
              <div key={metric.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {metric.label}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={labelingAccuracy[metric.key]}
                  onChange={(e) => handleLabelingChange(metric.key, e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>{Math.round(labelingAccuracy[metric.key] * 100)}%</span>
                  <span>100%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bias Detection */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Bias Detection</h3>
          </div>
          <div className="space-y-4">
            {biasMetrics.map((metric) => (
              <div key={metric.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {metric.label}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={biasDetection[metric.key]}
                  onChange={(e) => handleBiasChange(metric.key, e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>{Math.round(biasDetection[metric.key] * 100)}%</span>
                  <span>100%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Lineage */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Data Lineage</h3>
          </div>
          <div className="space-y-4">
            {lineageMetrics.map((metric) => (
              <div key={metric.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {metric.label}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={dataLineage[metric.key]}
                  onChange={(e) => handleLineageChange(metric.key, e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>{Math.round(dataLineage[metric.key] * 100)}%</span>
                  <span>100%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cost Estimation */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <DollarSign className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Cost Estimation for Data Improvement</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {costItems.map((item) => (
            <div key={item.key} className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {item.label}
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">$</span>
                <input
                  type="number"
                  value={costEstimates[item.key]}
                  onChange={(e) => handleCostChange(item.key, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="0"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">Total Estimated Cost:</span>
            <span className="text-2xl font-bold text-blue-600">${calculateTotalCost().toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Data Quality Recommendations</h3>
        </div>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                      rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {rec.priority}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{rec.category}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{rec.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{rec.impact}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-green-600">${rec.cost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button 
          onClick={() => {
            const report = {
              qualityScore: qualityScore,
              dataQuality: dataQuality,
              labelingAccuracy: labelingAccuracy,
              biasDetection: biasDetection,
              dataLineage: dataLineage,
              costEstimates: costEstimates,
              recommendations: recommendations,
              totalCost: calculateTotalCost()
            };
            exportToPDF(report, 'AI Data Quality Assessment Report');
          }}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center"
        >
          <RefreshCwIcon className="h-4 w-4 mr-2" />
          Generate PDF Report
        </button>
        {onViewCaseStudies && (
          <button 
            onClick={() => onViewCaseStudies('aidataquality')} 
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-200 flex items-center"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Case Studies
          </button>
        )}
      </div>
    </div>
  );
};

export default AIDataQuality; 