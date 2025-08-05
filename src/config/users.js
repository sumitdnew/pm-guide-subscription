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

// Check if a user is authorized
export const isUserAuthorized = (email) => {
  return authorizedUsers.includes(email.toLowerCase());
};

// Get user role
export const getUserRole = (email) => {
  return userRoles[email.toLowerCase()] || 'user';
}; 