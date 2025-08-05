// Professional simulator styling system
export const simulatorStyles = {
  // Container styles
  container: "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6",
  content: "max-w-6xl mx-auto",
  
  // Header styles
  header: "mb-8",
  headerTitle: "text-3xl font-bold text-gray-900 mb-2",
  headerSubtitle: "text-gray-600 text-lg",
  
  // Card styles
  card: "bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden",
  cardHeader: "bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6",
  cardContent: "p-8",
  
  // Info section styles
  infoSection: "bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-200",
  infoTitle: "text-xl font-semibold text-gray-900 mb-3",
  infoDescription: "text-gray-700 leading-relaxed mb-4",
  infoLink: "inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors",
  
  // Form styles
  formGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8",
  formGroup: "space-y-2",
  formLabel: "block text-sm font-semibold text-gray-700 mb-2",
  formInput: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500",
  formSelect: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900",
  formTextarea: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500 resize-none",
  
  // Button styles
  button: {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl",
    secondary: "bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200",
    outline: "border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200",
    small: "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
  },
  
  // Result styles
  resultCard: "bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200 shadow-lg",
  resultScore: "text-5xl font-bold text-green-600 mb-2 text-center",
  resultLabel: "text-xl text-gray-700 text-center mb-4",
  resultFormula: "text-sm text-gray-600 text-center mb-6 font-mono bg-gray-100 px-4 py-2 rounded-lg",
  resultInterpretation: "bg-white rounded-lg p-4 border border-green-200 shadow-sm",
  
  // Status styles
  status: {
    high: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200", 
    low: "bg-red-100 text-red-800 border-red-200",
    neutral: "bg-gray-100 text-gray-800 border-gray-200"
  },
  
  // Action buttons
  actionButton: "flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-all duration-200 shadow-sm hover:shadow-md",
  
  // Grid layouts
  grid: {
    two: "grid grid-cols-1 md:grid-cols-2 gap-6",
    three: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    four: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
  },
  
  // Spacing
  spacing: {
    section: "mb-8",
    large: "mb-6",
    medium: "mb-4",
    small: "mb-2"
  },
  
  // Typography
  typography: {
    h1: "text-3xl font-bold text-gray-900",
    h2: "text-2xl font-semibold text-gray-900",
    h3: "text-xl font-semibold text-gray-900",
    body: "text-gray-700 leading-relaxed",
    small: "text-sm text-gray-600",
    mono: "font-mono text-sm"
  }
};

// Color schemes for different simulators
export const colorSchemes = {
  blue: {
    primary: 'from-blue-600 to-purple-600',
    secondary: 'from-blue-50 to-purple-50',
    accent: 'blue',
    text: 'text-blue-900',
    border: 'border-blue-200'
  },
  green: {
    primary: 'from-green-600 to-emerald-600',
    secondary: 'from-green-50 to-emerald-50',
    accent: 'green',
    text: 'text-green-900',
    border: 'border-green-200'
  },
  purple: {
    primary: 'from-purple-600 to-pink-600',
    secondary: 'from-purple-50 to-pink-50',
    accent: 'purple',
    text: 'text-purple-900',
    border: 'border-purple-200'
  },
  orange: {
    primary: 'from-orange-600 to-red-600',
    secondary: 'from-orange-50 to-red-50',
    accent: 'orange',
    text: 'text-orange-900',
    border: 'border-orange-200'
  },
  teal: {
    primary: 'from-teal-600 to-cyan-600',
    secondary: 'from-teal-50 to-cyan-50',
    accent: 'teal',
    text: 'text-teal-900',
    border: 'border-teal-200'
  }
}; 