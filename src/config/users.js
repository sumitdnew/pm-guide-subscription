import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for frontend
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

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
export const isUserAuthorized = async (email) => {
  if (!email) return false;
  
  const normalizedEmail = email.toLowerCase();
  
  // Check static authorized users
  if (authorizedUsers.includes(normalizedEmail)) {
    return true;
  }
  
  // PRODUCTION: Check Supabase database for user
  if (process.env.REACT_APP_SUPABASE_URL && process.env.REACT_APP_SUPABASE_ANON_KEY) {
    try {
      const user = await getUserFromSupabase(normalizedEmail);
      return user && user.subscription_status === 'active';
    } catch (error) {
      console.error('Error checking user authorization:', error);
      return false;
    }
  }
  
  // For now, we'll use a simple approach
  // In production, you'd want to check against a proper database
  // For testing, we can add specific emails here
  const testUsers = [
    // 'sumitdas.cse@gmail.com', // Removed for testing
  ];
  
  if (testUsers.includes(normalizedEmail)) {
    return true;
  }
  
  return false;
};

// Get user from database (production with Supabase)
export const getUserFromDatabase = async (email) => {
  if (!email) return null;
  
  const normalizedEmail = email.toLowerCase();
  
  // PRODUCTION: Get user from Supabase
  if (process.env.REACT_APP_SUPABASE_URL && process.env.REACT_APP_SUPABASE_ANON_KEY) {
    try {
      return await getUserFromSupabase(normalizedEmail);
    } catch (error) {
      console.error('Error getting user from database:', error);
      return null;
    }
  }
  
  // For now, return a basic user object
  // In production, you'd query a real database
  if (await isUserAuthorized(normalizedEmail)) {
    return {
      email: normalizedEmail,
      username: normalizedEmail.split('@')[0] + '_user',
      access_level: 'full',
      subscription_status: 'active',
      is_demo: false
    };
  }
  
  return null;
};

// Get user role
export const getUserRole = async (email) => {
  if (!email) return 'user';
  
  const normalizedEmail = email.toLowerCase();
  
  // Check static roles first
  if (userRoles[normalizedEmail]) {
    return userRoles[normalizedEmail];
  }
  
  // Check if user is authorized
  if (await isUserAuthorized(normalizedEmail)) {
    return 'full';
  }
  
  return 'user';
};

// PRODUCTION: Get user from Supabase
async function getUserFromSupabase(email) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error getting user from Supabase:', error);
    return null;
  }
} 