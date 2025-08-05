// Authorized users for the PM Guide system
// Add or remove email addresses as needed
export const authorizedUsers = [
  'admin@pmguide.com',
  'your-email@example.com', // Replace with your actual email
  // Add more authorized emails here
  // 'user1@company.com',
  // 'user2@company.com',
];

// Optional: Add user roles or additional permissions
export const userRoles = {
  'admin@pmguide.com': 'admin',
  'your-email@example.com': 'admin',
  // Add more user roles as needed
};

// Check if a user is authorized (includes database users)
export const isUserAuthorized = (email) => {
  if (!email) return false;
  
  const normalizedEmail = email.toLowerCase();
  
  // Check static authorized users
  if (authorizedUsers.includes(normalizedEmail)) {
    return true;
  }
  
  // For now, we'll use a simple approach
  // In production, you'd want to check against a proper database
  // For testing, we can add specific emails here
  const testUsers = [
    'sumitdas.cse@gmail.com', // Add test users here
  ];
  
  if (testUsers.includes(normalizedEmail)) {
    return true;
  }
  
  return false;
};

// Get user from database (simplified for Vercel)
export const getUserFromDatabase = (email) => {
  if (!email) return null;
  
  const normalizedEmail = email.toLowerCase();
  
  // For now, return a basic user object
  // In production, you'd query a real database
  if (isUserAuthorized(normalizedEmail)) {
    return {
      email: normalizedEmail,
      username: normalizedEmail.split('@')[0] + '_user',
      accessLevel: 'full',
      subscriptionStatus: 'active',
      isDemo: false
    };
  }
  
  return null;
};

// Get user role
export const getUserRole = (email) => {
  if (!email) return 'user';
  
  const normalizedEmail = email.toLowerCase();
  
  // Check static roles first
  if (userRoles[normalizedEmail]) {
    return userRoles[normalizedEmail];
  }
  
  // Check if user is authorized
  if (isUserAuthorized(normalizedEmail)) {
    return 'full';
  }
  
  return 'user';
}; 