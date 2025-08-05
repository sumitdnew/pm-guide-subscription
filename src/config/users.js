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
  
  // PRODUCTION: Check database for user
  // Option 1: Supabase
  // const user = await getUserFromSupabase(normalizedEmail);
  // return user && user.subscriptionStatus === 'active';
  
  // Option 2: MongoDB
  // const user = await getUserFromMongoDB(normalizedEmail);
  // return user && user.subscriptionStatus === 'active';
  
  // Option 3: PostgreSQL
  // const user = await getUserFromPostgreSQL(normalizedEmail);
  // return user && user.subscriptionStatus === 'active';
  
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

// Get user from database (simplified for Vercel)
export const getUserFromDatabase = async (email) => {
  if (!email) return null;
  
  const normalizedEmail = email.toLowerCase();
  
  // PRODUCTION: Get user from database
  // Option 1: Supabase
  // return await getUserFromSupabase(normalizedEmail);
  
  // Option 2: MongoDB
  // return await getUserFromMongoDB(normalizedEmail);
  
  // Option 3: PostgreSQL
  // return await getUserFromPostgreSQL(normalizedEmail);
  
  // For now, return a basic user object
  // In production, you'd query a real database
  if (await isUserAuthorized(normalizedEmail)) {
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

// PRODUCTION DATABASE FUNCTIONS (Uncomment and configure as needed)

// Supabase Integration
// async function getUserFromSupabase(email) {
//   const { createClient } = require('@supabase/supabase-js');
//   const supabase = createClient(
//     process.env.SUPABASE_URL,
//     process.env.SUPABASE_ANON_KEY
//   );
//   
//   const { data, error } = await supabase
//     .from('users')
//     .select('*')
//     .eq('email', email)
//     .single();
//   
//   if (error) return null;
//   return data;
// }

// MongoDB Integration
// async function getUserFromMongoDB(email) {
//   const { MongoClient } = require('mongodb');
//   const client = new MongoClient(process.env.MONGODB_URI);
//   
//   await client.connect();
//   const db = client.db('pm-guide');
//   const collection = db.collection('users');
//   
//   const user = await collection.findOne({ email });
//   await client.close();
//   
//   return user;
// }

// PostgreSQL Integration
// async function getUserFromPostgreSQL(email) {
//   const { Pool } = require('pg');
//   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
//   
//   const query = 'SELECT * FROM users WHERE email = $1';
//   const result = await pool.query(query, [email]);
//   
//   await pool.end();
//   return result.rows[0] || null;
// } 