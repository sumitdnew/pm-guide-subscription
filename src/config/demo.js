// Demo configuration - limits available features for demo users
export const demoConfig = {
  // Only 2 simulators available in demo
  availableSimulators: ['rice', 'ice'],
  
  // All phases available for demo
  availablePhases: ['all', 'discovery', 'strategy', 'planning', 'development', 'launch', 'growth', 'scale'],
  
  // All product types available
  availableProductTypes: ['ai', 'saas', 'consumer', 'marketplace', 'enterprise'],
  
  // All team sizes available
  availableTeamSizes: ['limited', 'moderate', 'substantial', 'enterprise'],
  
  // Demo limitations
  limitations: {
    maxSimulators: 2,
    showUpgradePrompt: true,
    watermark: 'DEMO VERSION'
  },
  
  // Upgrade messaging
  upgradeMessage: {
    title: 'Upgrade to Full Version',
    description: 'Get access to all 20+ frameworks and simulators',
    features: [
      'All 20+ interactive simulators',
      'Complete case study library',
      'Advanced analytics and insights',
      'Team collaboration features',
      'Custom framework creation',
      'Priority support'
    ],
    cta: 'Contact us for pricing'
  }
};

// Check if a simulator is available in demo
export const isSimulatorAvailableInDemo = (simulatorId) => {
  return demoConfig.availableSimulators.includes(simulatorId);
};

// Get demo limitations message
export const getDemoLimitationMessage = () => {
  return {
    title: 'Demo Version',
    message: `You can see all frameworks but only ${demoConfig.availableSimulators.length} simulators are available in demo.`,
    upgrade: 'Upgrade to access all 20+ simulators.'
  };
}; 