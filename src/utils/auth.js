// Simple authentication utility
const auth = {
  // Check if user is authenticated
  isAuthenticated: () => {
    const user = localStorage.getItem('pm_guide_user');
    return !!user;
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('pm_guide_user');
    return user ? JSON.parse(user) : null;
  },

  // Login user
  login: (user) => {
    localStorage.setItem('pm_guide_user', JSON.stringify(user));
    return user;
  },

  // Signup user
  signup: (user) => {
    localStorage.setItem('pm_guide_user', JSON.stringify(user));
    return user;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('pm_guide_user');
    localStorage.removeItem('pm_guide_subscription');
    localStorage.removeItem('pm_guide_admin');
    localStorage.removeItem('pm_guide_developer');
  },

  // Clear all data (for testing)
  clearAllData: () => {
    localStorage.removeItem('pm_guide_user');
    localStorage.removeItem('pm_guide_subscription');
    localStorage.removeItem('pm_guide_admin');
    localStorage.removeItem('pm_guide_developer');
  }
};

export default auth; 