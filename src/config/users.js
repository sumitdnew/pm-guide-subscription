import fs from 'fs';
import path from 'path';

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

// Load users from database file
export const loadUsersFromDatabase = () => {
  try {
    const usersFile = path.join(process.cwd(), 'data', 'users.json');
    if (fs.existsSync(usersFile)) {
      const fileContent = fs.readFileSync(usersFile, 'utf8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error('Error loading users from database:', error);
  }
  return [];
};

// Check if a user is authorized (includes database users)
export const isUserAuthorized = (email) => {
  if (!email) return false;
  
  const normalizedEmail = email.toLowerCase();
  
  // Check static authorized users
  if (authorizedUsers.includes(normalizedEmail)) {
    return true;
  }
  
  // Check database users
  try {
    const users = loadUsersFromDatabase();
    const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
    return user && user.subscriptionStatus === 'active';
  } catch (error) {
    console.error('Error checking user authorization:', error);
    return false;
  }
};

// Get user from database
export const getUserFromDatabase = (email) => {
  if (!email) return null;
  
  try {
    const users = loadUsersFromDatabase();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  } catch (error) {
    console.error('Error getting user from database:', error);
    return null;
  }
};

// Get user role
export const getUserRole = (email) => {
  if (!email) return 'user';
  
  const normalizedEmail = email.toLowerCase();
  
  // Check static roles first
  if (userRoles[normalizedEmail]) {
    return userRoles[normalizedEmail];
  }
  
  // Check database user
  const user = getUserFromDatabase(normalizedEmail);
  if (user) {
    return user.accessLevel || 'user';
  }
  
  return 'user';
}; 