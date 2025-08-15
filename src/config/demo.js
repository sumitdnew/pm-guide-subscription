// Demo configuration - all features now available for free
export const demoConfig = {
  // All simulators available for free
  availableSimulators: [
    'rice', 'ice', 'jtbd', 'forces', 'kano', 'pmf', 'swot', 'aarrr', 
    'okr', 'northstar', 'moscow', 'persona', 'cohort', 'abtest', 
    'clv', 'competitive', 'pricing', 'marketsize', 'customerdev', 
    'designthinking', 'valueprop', 'gtm', 'growthhacking',
    'aimodel', 'aiethics', 'aidataquality', 'aireadiness', 'airoi', 'aieux'
  ],
  
  // All phases available
  availablePhases: ['all', 'discovery', 'strategy', 'planning', 'development', 'launch', 'growth', 'scale'],
  
  // All product types available
  availableProductTypes: ['ai', 'saas', 'consumer', 'marketplace', 'enterprise'],
  
  // All team sizes available
  availableTeamSizes: ['limited', 'moderate', 'substantial', 'enterprise'],
  
  // No limitations - everything is free
  limitations: {
    maxSimulators: Infinity,
    showUpgradePrompt: false,
    watermark: 'FREE VERSION'
  },
  
  // No upgrade messaging needed
  upgradeMessage: {
    title: 'All Features Available',
    description: 'Enjoy full access to all frameworks and simulators',
    features: [
      'All 20+ interactive simulators',
      'Complete case study library',
      'Advanced analytics and insights',
      'Team collaboration features',
      'Custom framework creation',
      'Priority support'
    ],
    cta: 'Start exploring!'
  }
};

// Check if a simulator is available - now all simulators are available
export const isSimulatorAvailableInDemo = (simulatorId) => {
  return true; // All simulators are now available for free
};

// Get demo limitations message - now shows everything is free
export const getDemoLimitationMessage = () => {
  return {
    title: 'Free Version',
    message: 'All frameworks and simulators are now available for free!'
  };
}; 