// Simple authentication utility
// In a real app, you'd use Firebase Auth or a similar service

export const auth = {
  // Check if user is authenticated
  isAuthenticated: () => {
    const user = localStorage.getItem('pm_guide_user');
    const subscription = localStorage.getItem('pm_guide_subscription');
    return user && subscription === 'active';
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('pm_guide_user');
    return user ? JSON.parse(user) : null;
  },

  // Login user
  login: (email, password) => {
    // In a real app, you'd validate against your backend
    const user = { email, name: email.split('@')[0] };
    localStorage.setItem('pm_guide_user', JSON.stringify(user));
    return user;
  },

  // Signup user
  signup: (email, password, name) => {
    // In a real app, you'd create the user in your backend
    const user = { email, name };
    localStorage.setItem('pm_guide_user', JSON.stringify(user));
    return user;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('pm_guide_user');
    localStorage.removeItem('pm_guide_subscription');
  },

  // Activate subscription
  activateSubscription: () => {
    localStorage.setItem('pm_guide_subscription', 'active');
  },

  // Check subscription status
  hasActiveSubscription: () => {
    return localStorage.getItem('pm_guide_subscription') === 'active';
  }
}; 