import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for frontend (only if environment variables are available)
let supabase = null;

// Check if we're in a browser environment and if environment variables are available
if (typeof window !== 'undefined' && process.env.REACT_APP_SUPABASE_URL && process.env.REACT_APP_SUPABASE_ANON_KEY) {
  try {
    supabase = createClient(
      process.env.REACT_APP_SUPABASE_URL,
      process.env.REACT_APP_SUPABASE_ANON_KEY
    );
    console.log('Supabase client initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    supabase = null;
  }
} else {
  console.log('Supabase not available - using local authentication only');
}

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
  
  // Check static authorized users first
  if (authorizedUsers.includes(normalizedEmail)) {
    console.log('User found in authorized users:', normalizedEmail);
    return true;
  }
  
  // Check test users
  const testUsers = [
    'sumitdas.cse@gmail.com',
    'test@example.com',
    'demo@pmguide.com',
    'admin@pmguide.com',
    'your-email@example.com'
  ];
  
  if (testUsers.includes(normalizedEmail)) {
    console.log('User found in test users:', normalizedEmail);
    return true;
  }
  
  // PRODUCTION: Check Supabase database for user (only if available)
  if (supabase) {
    try {
      console.log('Checking Supabase for user:', normalizedEmail);
      const user = await getUserFromSupabase(normalizedEmail);
      const isAuthorized = user && user.subscription_status === 'active';
      console.log('Supabase user found:', user ? 'Yes' : 'No', 'Authorized:', isAuthorized);
      return isAuthorized;
    } catch (error) {
      console.error('Error checking user authorization:', error);
      return false;
    }
  } else {
    console.log('Supabase not available, user not found in local lists:', normalizedEmail);
  }
  
  return false;
};

// Get user from database (production with Supabase)
export const getUserFromDatabase = async (emailOrUsername) => {
  if (!emailOrUsername) return null;
  
  const normalizedInput = emailOrUsername.toLowerCase();
  
  // PRODUCTION: Get user from Supabase (only if available)
  if (supabase) {
    try {
      const user = await getUserFromSupabase(normalizedInput);
      if (user) {
        console.log('User found in Supabase:', normalizedInput);
        return user;
      }
    } catch (error) {
      console.error('Error getting user from Supabase:', error);
    }
  }
  
  // Fallback: Check if user is authorized locally
  if (await isUserAuthorized(normalizedInput)) {
    console.log('Creating local user object for:', normalizedInput);
    return {
      email: normalizedInput,
      username: normalizedInput.split('@')[0] + '_user',
      access_level: 'full',
      subscription_status: 'active',
      is_demo: false
    };
  }
  
  console.log('User not found:', normalizedInput);
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
async function getUserFromSupabase(emailOrUsername) {
  if (!supabase) {
    console.log('Supabase not initialized - skipping database lookup');
    return null;
  }
  
  try {
    // First try to find by email
    let { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', emailOrUsername)
      .single();
    
    if (error) {
      // If not found by email, try by username
      const { data: usernameData, error: usernameError } = await supabase
        .from('users')
        .select('*')
        .eq('username', emailOrUsername)
        .single();
      
      if (usernameError) {
        console.error('Supabase error:', usernameError);
        return null;
      }
      
      return usernameData;
    }
    
    return data;
  } catch (error) {
    console.error('Error getting user from Supabase:', error);
    return null;
  }
} 