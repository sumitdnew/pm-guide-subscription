import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, FileText, AlertCircle, BookOpen, RefreshCw, Users, Scale, Lock, ArrowLeft, Grid } from 'lucide-react';
import jsPDF from 'jspdf';

const AIEthicsAssessment = ({ onViewCaseStudies, onViewAllSimulators, onBack }) => {
  const [assessment, setAssessment] = useState({
    fairness: {
      demographicParity: 0.85,
      equalizedOdds: 0.82,
      disparateImpact: 0.78,
      biasDetection: 0.90
    },
    transparency: {
      explainability: 0.75,
      interpretability: 0.80,
      documentation: 0.85,
      auditTrail: 0.70
    },
    accountability: {
      responsibility: 0.88,
      oversight: 0.82,
      governance: 0.85,
      monitoring: 0.80
    },
    privacy: {
      dataProtection: 0.90,
      consent: 0.85,
      anonymization: 0.88,
      compliance: 0.92
    }
  });

  const [biasChecklist, setBiasChecklist] = useState({
    dataRepresentation: false,
    featureSelection: false,
    algorithmChoice: false,
    evaluationMetrics: false,
    deploymentMonitoring: false,
    feedbackLoops: false
  });

  const [regulatoryCompliance, setRegulatoryCompliance] = useState({
    gdpr: false,
    ccpa: false,
    hipaa: false,
    sox: false,
    industrySpecific: false
  });

  const [recommendations, setRecommendations] = useState([]);
  const [ethicsScore, setEthicsScore] = useState(0);

  const calculateEthicsScore = () => {
    const fairnessScore = Object.values(assessment.fairness).reduce((a, b) => a + b, 0) / 4;
    const transparencyScore = Object.values(assessment.transparency).reduce((a, b) => a + b, 0) / 4;
    const accountabilityScore = Object.values(assessment.accountability).reduce((a, b) => a + b, 0) / 4;
    const privacyScore = Object.values(assessment.privacy).reduce((a, b) => a + b, 0) / 4;
    
    const checklistScore = Object.values(biasChecklist).filter(Boolean).length / 6;
    const complianceScore = Object.values(regulatoryCompliance).filter(Boolean).length / 5;
    
    const totalScore = (
      fairnessScore * 0.25 +
      transparencyScore * 0.20 +
      accountabilityScore * 0.20 +
      privacyScore * 0.20 +
      checklistScore * 0.10 +
      complianceScore * 0.05
    ) * 100;
    
    return Math.round(totalScore);
  };

  const generateRecommendations = () => {
    const recommendations = [];
    const score = calculateEthicsScore();

    if (score < 70) {
      recommendations.push({
        priority: 'High',
        category: 'Fairness',
        action: 'Implement bias detection algorithms and retrain model with balanced datasets',
        impact: 'Critical for reducing discriminatory outcomes'
      });
    }

    if (assessment.transparency.explainability < 0.8) {
      recommendations.push({
        priority: 'Medium',
        category: 'Transparency',
        action: 'Add model interpretability tools and improve documentation',
        impact: 'Essential for user trust and regulatory compliance'
      });
    }

    if (Object.values(biasChecklist).filter(Boolean).length < 4) {
      recommendations.push({
        priority: 'High',
        category: 'Bias Prevention',
        action: 'Complete bias detection checklist and implement monitoring systems',
        impact: 'Prevents bias amplification in production'
      });
    }

    if (!regulatoryCompliance.gdpr && !regulatoryCompliance.ccpa) {
      recommendations.push({
        priority: 'High',
        category: 'Compliance',
        action: 'Review and implement data protection regulations',
        impact: 'Required for legal operation in target markets'
      });
    }

    return recommendations;
  };

  useEffect(() => {
    setEthicsScore(calculateEthicsScore());
    setRecommendations(generateRecommendations());
  }, [assessment, biasChecklist, regulatoryCompliance, calculateEthicsScore, generateRecommendations]);

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

  const handleAssessmentChange = (category, metric, value) => {
    setAssessment(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [metric]: parseFloat(value)
      }
    }));
  };

  const handleBiasChecklistChange = (item) => {
    setBiasChecklist(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleComplianceChange = (regulation) => {
    setRegulatoryCompliance(prev => ({
      ...prev,
      [regulation]: !prev[regulation]
    }));
  };

  // Generate comprehensive ethics report
  const generateEthicsReport = () => {
    const ethicsScore = calculateEthicsScore();
    const report = {
      timestamp: new Date().toISOString(),
      ethicsScore: ethicsScore,
      assessment: assessment,
      biasChecklist: biasChecklist,
      regulatoryCompliance: regulatoryCompliance,
      recommendations: recommendations,
      summary: {
        fairness: assessment.fairness,
        transparency: assessment.transparency,
        accountability: assessment.accountability,
        privacy: assessment.privacy
      }
    };
    return report;
  };

  // Export report to PDF
  const exportToPDF = (report) => {
    const doc = new jsPDF();
    
    // Set up styling
    doc.setFontSize(20);
    doc.setTextColor(34, 139, 34); // Green color
    doc.text('AI Ethics Assessment Report', 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 35);
    
    // Overall Score
    doc.setFontSize(16);
    doc.setTextColor(34, 139, 34);
    doc.text(`Overall Ethics Score: ${report.ethicsScore}%`, 20, 50);
    
    // Assessment Summary
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Assessment Summary:', 20, 70);
    
    doc.setFontSize(12);
    const fairnessScore = Math.round((report.assessment.fairness.demographicParity + report.assessment.fairness.equalizedOdds + report.assessment.fairness.disparateImpact + report.assessment.fairness.biasDetection) / 4 * 100);
    const transparencyScore = Math.round((report.assessment.transparency.explainability + report.assessment.transparency.interpretability + report.assessment.transparency.documentation + report.assessment.transparency.auditTrail) / 4 * 100);
    const accountabilityScore = Math.round((report.assessment.accountability.responsibility + report.assessment.accountability.oversight + report.assessment.accountability.governance + report.assessment.accountability.monitoring) / 4 * 100);
    const privacyScore = Math.round((report.assessment.privacy.dataProtection + report.assessment.privacy.consent + report.assessment.privacy.anonymization + report.assessment.privacy.compliance) / 4 * 100);
    
    doc.text(`• Fairness Score: ${fairnessScore}%`, 30, 85);
    doc.text(`• Transparency Score: ${transparencyScore}%`, 30, 95);
    doc.text(`• Accountability Score: ${accountabilityScore}%`, 30, 105);
    doc.text(`• Privacy Score: ${privacyScore}%`, 30, 115);
    
    // Bias Checklist
    doc.setFontSize(14);
    doc.text('Bias Checklist Completion:', 20, 135);
    const completedItems = Object.values(report.biasChecklist).filter(Boolean).length;
    doc.setFontSize(12);
    doc.text(`${completedItems}/6 items completed`, 30, 145);
    
    // Regulatory Compliance
    doc.setFontSize(14);
    doc.text('Regulatory Compliance:', 20, 165);
    const compliantFrameworks = Object.values(report.regulatoryCompliance).filter(Boolean).length;
    doc.setFontSize(12);
    doc.text(`${compliantFrameworks}/5 frameworks compliant`, 30, 175);
    
    // Recommendations
    doc.setFontSize(14);
    doc.text('Recommendations:', 20, 195);
    
    let yPosition = 205;
    report.recommendations.forEach((rec, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(12);
      doc.setTextColor(139, 0, 0); // Dark red for priority
      doc.text(`${rec.priority} Priority - ${rec.category}:`, 30, yPosition);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      const actionLines = doc.splitTextToSize(rec.action, 150);
      doc.text(actionLines, 35, yPosition + 5);
      
      yPosition += 15 + (actionLines.length * 5);
    });
    
    // Compliance Status
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.text('Compliance Status:', 20, yPosition);
    
    yPosition += 15;
    Object.entries(report.regulatoryCompliance).forEach(([key, value]) => {
      doc.setFontSize(10);
      doc.setTextColor(value ? 34 : 139, 0, 0); // Green if compliant, red if not
      doc.text(`${key.toUpperCase()}: ${value ? 'Compliant' : 'Non-Compliant'}`, 30, yPosition);
      yPosition += 8;
    });
    
    // Save the PDF
    const fileName = `ai-ethics-assessment-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
    alert('PDF report generated and downloaded successfully!');
  };

  // Download template functions
  const downloadTemplate = (templateName, content, title) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.setTextColor(34, 139, 34); // Green color
    doc.text(title, 20, 20);
    
    // Content
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    const lines = doc.splitTextToSize(content, 170);
    let yPosition = 35;
    
    lines.forEach(line => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, 20, yPosition);
      yPosition += 7;
    });
    
    // Save the PDF
    const fileName = `${templateName}-template.pdf`;
    doc.save(fileName);
  };

  const downloadEthicsPolicy = () => {
    const content = `
AI Ethics Policy Template

1. PURPOSE AND SCOPE
This policy establishes guidelines for the ethical development, deployment, and use of artificial intelligence systems within our organization.

2. PRINCIPLES
- Fairness: AI systems must treat all individuals fairly without discrimination
- Transparency: AI decisions must be explainable and auditable
- Accountability: Clear responsibility for AI system outcomes
- Privacy: Protect user data and maintain confidentiality

3. IMPLEMENTATION
- Regular ethics reviews of AI systems
- Bias detection and mitigation procedures
- User consent and data protection measures
- Ongoing monitoring and evaluation

4. COMPLIANCE
- Regular audits and assessments
- Training for all AI development teams
- Incident reporting and response procedures
- Continuous improvement processes
    `;
         downloadTemplate('ai-ethics-policy', content, 'AI Ethics Policy Template');
  };

  const downloadBiasAssessment = () => {
    const content = `
Bias Assessment Report Template

1. MODEL OVERVIEW
- Model name and version
- Purpose and use case
- Target population
- Data sources

2. BIAS DETECTION METHODOLOGY
- Demographic parity analysis
- Equalized odds assessment
- Disparate impact evaluation
- Feature importance analysis

3. FINDINGS
- Identified biases
- Impact assessment
- Risk evaluation
- Mitigation strategies

4. RECOMMENDATIONS
- Immediate actions required
- Long-term improvements
- Monitoring requirements
- Retraining considerations

5. COMPLIANCE STATUS
- Regulatory requirements
- Industry standards
- Internal policies
- Audit trail
    `;
         downloadTemplate('bias-assessment', content, 'Bias Assessment Report Template');
  };

  const downloadComplianceChecklist = () => {
    const content = `
AI Compliance Checklist

REGULATORY COMPLIANCE
□ GDPR (EU Data Protection)
  □ Data minimization
  □ User consent mechanisms
  □ Right to explanation
  □ Data portability

□ CCPA (California Privacy)
  □ Consumer rights
  □ Data disclosure
  □ Opt-out mechanisms
  □ Privacy notices

□ HIPAA (Healthcare)
  □ PHI protection
  □ Access controls
  □ Audit trails
  □ Breach notification

□ SOX (Financial)
  □ Financial reporting
  □ Internal controls
  □ Audit requirements
  □ Documentation

ETHICAL COMPLIANCE
□ Fairness Assessment
  □ Demographic parity
  □ Equalized odds
  □ Disparate impact
  □ Bias detection

□ Transparency Requirements
  □ Explainability
  □ Interpretability
  □ Documentation
  □ Audit trails

□ Accountability Measures
  □ Responsibility assignment
  □ Oversight mechanisms
  □ Governance framework
  □ Monitoring systems

□ Privacy Protection
  □ Data anonymization
  □ Consent management
  □ Data retention
  □ Security measures
    `;
         downloadTemplate('compliance-checklist', content, 'AI Compliance Checklist Template');
  };

  const biasChecklistItems = [
    { key: 'dataRepresentation', label: 'Data representation across demographics', description: 'Ensure training data represents all user groups fairly' },
    { key: 'featureSelection', label: 'Feature selection bias review', description: 'Review features for potential discriminatory proxies' },
    { key: 'algorithmChoice', label: 'Algorithm choice justification', description: 'Document why specific algorithms were chosen' },
    { key: 'evaluationMetrics', label: 'Evaluation metrics across groups', description: 'Test performance across different demographic groups' },
    { key: 'deploymentMonitoring', label: 'Deployment monitoring plan', description: 'Plan for ongoing bias monitoring in production' },
    { key: 'feedbackLoops', label: 'Feedback loop analysis', description: 'Analyze potential feedback loops that could amplify bias' }
  ];

  const regulatoryFrameworks = [
    { key: 'gdpr', label: 'GDPR (EU)', description: 'General Data Protection Regulation' },
    { key: 'ccpa', label: 'CCPA (California)', description: 'California Consumer Privacy Act' },
    { key: 'hipaa', label: 'HIPAA (Healthcare)', description: 'Health Insurance Portability and Accountability Act' },
    { key: 'sox', label: 'SOX (Financial)', description: 'Sarbanes-Oxley Act for financial reporting' },
    { key: 'industrySpecific', label: 'Industry-Specific', description: 'Other industry-specific regulations' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-full mr-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Ethics Assessment</h1>
            <p className="text-gray-600">Evaluate AI model fairness, transparency, and ethical compliance</p>
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

      {/* Ethics Score Dashboard */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Ethics Score</h2>
            <p className="text-gray-600">Overall ethical assessment score</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">{ethicsScore}</div>
            <div className="text-sm text-gray-500">out of 100</div>
          </div>
          <div className="flex items-center">
            {getScoreIcon(ethicsScore)}
            <span className={`ml-2 font-semibold ${getScoreColor(ethicsScore)}`}>
              {ethicsScore >= 80 ? 'Excellent' : ethicsScore >= 60 ? 'Good' : 'Needs Improvement'}
            </span>
          </div>
        </div>
      </div>

      {/* Assessment Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Fairness Assessment */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Users className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Fairness Assessment</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Demographic Parity
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={assessment.fairness.demographicParity}
                onChange={(e) => handleAssessmentChange('fairness', 'demographicParity', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{Math.round(assessment.fairness.demographicParity * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equalized Odds
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={assessment.fairness.equalizedOdds}
                onChange={(e) => handleAssessmentChange('fairness', 'equalizedOdds', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{Math.round(assessment.fairness.equalizedOdds * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Disparate Impact
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={assessment.fairness.disparateImpact}
                onChange={(e) => handleAssessmentChange('fairness', 'disparateImpact', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{Math.round(assessment.fairness.disparateImpact * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bias Detection
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={assessment.fairness.biasDetection}
                onChange={(e) => handleAssessmentChange('fairness', 'biasDetection', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{Math.round(assessment.fairness.biasDetection * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transparency Assessment */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Eye className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Transparency Assessment</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Explainability
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={assessment.transparency.explainability}
                onChange={(e) => handleAssessmentChange('transparency', 'explainability', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{Math.round(assessment.transparency.explainability * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interpretability
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={assessment.transparency.interpretability}
                onChange={(e) => handleAssessmentChange('transparency', 'interpretability', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{Math.round(assessment.transparency.interpretability * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Documentation
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={assessment.transparency.documentation}
                onChange={(e) => handleAssessmentChange('transparency', 'documentation', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{Math.round(assessment.transparency.documentation * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Audit Trail
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={assessment.transparency.auditTrail}
                onChange={(e) => handleAssessmentChange('transparency', 'auditTrail', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{Math.round(assessment.transparency.auditTrail * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accountability Assessment */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Scale className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Accountability Assessment</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Responsibility Assignment
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={assessment.accountability.responsibility}
                onChange={(e) => handleAssessmentChange('accountability', 'responsibility', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{Math.round(assessment.accountability.responsibility * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Oversight Mechanisms
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={assessment.accountability.oversight}
                onChange={(e) => handleAssessmentChange('accountability', 'oversight', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{Math.round(assessment.accountability.oversight * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Governance Framework
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={assessment.accountability.governance}
                onChange={(e) => handleAssessmentChange('accountability', 'governance', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{Math.round(assessment.accountability.governance * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monitoring Systems
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={assessment.accountability.monitoring}
                onChange={(e) => handleAssessmentChange('accountability', 'monitoring', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{Math.round(assessment.accountability.monitoring * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Assessment */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Lock className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Privacy Assessment</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Protection
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={assessment.privacy.dataProtection}
                onChange={(e) => handleAssessmentChange('privacy', 'dataProtection', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{Math.round(assessment.privacy.dataProtection * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consent Management
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={assessment.privacy.consent}
                onChange={(e) => handleAssessmentChange('privacy', 'consent', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{Math.round(assessment.privacy.consent * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Anonymization
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={assessment.privacy.anonymization}
                onChange={(e) => handleAssessmentChange('privacy', 'anonymization', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{Math.round(assessment.privacy.anonymization * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Compliance Score
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={assessment.privacy.compliance}
                onChange={(e) => handleAssessmentChange('privacy', 'compliance', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{Math.round(assessment.privacy.compliance * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bias Detection Checklist */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Bias Detection Checklist</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {biasChecklistItems.map((item) => (
            <div key={item.key} className="flex items-start space-x-3">
              <input
                type="checkbox"
                id={item.key}
                checked={biasChecklist[item.key]}
                onChange={() => handleBiasChecklistChange(item.key)}
                className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <div>
                <label htmlFor={item.key} className="text-sm font-medium text-gray-900 cursor-pointer">
                  {item.label}
                </label>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory Compliance */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <FileText className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Regulatory Compliance</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {regulatoryFrameworks.map((regulation) => (
            <div key={regulation.key} className="flex items-start space-x-3">
              <input
                type="checkbox"
                id={regulation.key}
                checked={regulatoryCompliance[regulation.key]}
                onChange={() => handleComplianceChange(regulation.key)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div>
                <label htmlFor={regulation.key} className="text-sm font-medium text-gray-900 cursor-pointer">
                  {regulation.label}
                </label>
                <p className="text-xs text-gray-500 mt-1">{regulation.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Ethics Recommendations</h3>
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ethics Documentation Templates */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <BookOpen className="h-5 w-5 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Ethics Documentation Templates</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">AI Ethics Policy</h4>
            <p className="text-sm text-gray-600 mb-3">Comprehensive policy covering fairness, transparency, and accountability</p>
            <button 
              onClick={downloadEthicsPolicy}
              className="text-sm text-purple-600 hover:text-purple-800 font-medium hover:underline transition-colors"
            >
              Download Template →
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Bias Assessment Report</h4>
            <p className="text-sm text-gray-600 mb-3">Template for documenting bias detection and mitigation strategies</p>
            <button 
              onClick={downloadBiasAssessment}
              className="text-sm text-purple-600 hover:text-purple-800 font-medium hover:underline transition-colors"
            >
              Download Template →
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Compliance Checklist</h4>
            <p className="text-sm text-gray-600 mb-3">Regulatory compliance checklist for AI systems</p>
            <button 
              onClick={downloadComplianceChecklist}
              className="text-sm text-purple-600 hover:text-purple-800 font-medium hover:underline transition-colors"
            >
              Download Template →
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
                 <button 
           onClick={() => {
             const report = generateEthicsReport();
             exportToPDF(report);
           }}
           className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center"
         >
           <RefreshCw className="h-4 w-4 mr-2" />
           Generate PDF Report
         </button>
        <button 
          onClick={() => {
            const report = generateEthicsReport();
            exportToPDF(report);
          }}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center"
        >
                     <FileText className="h-4 w-4 mr-2" />
           Export PDF Assessment
        </button>
        {onViewCaseStudies && (
          <button 
            onClick={() => onViewCaseStudies('aiethics')} 
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

export default AIEthicsAssessment; 