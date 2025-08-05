// Test script to simulate the webhook event processing
import fs from 'fs';
import path from 'path';

// Simulate the webhook event data
const testEvent = {
  "id": "evt_1RsaetQ0mQabLsGQ3HJvRIdn",
  "object": "event",
  "api_version": "2025-06-30.basil",
  "created": 1754361083,
  "data": {
    "object": {
      "id": "cs_test_a1ignRza3DMWanBMplnyQ6sZnNKrczVTnxCDfGKLUzWpkWmeZCrLBv6LsE",
      "object": "checkout.session",
      "payment_status": "paid",
      "customer_details": {
        "email": "sumitdas.cse@gmail.com",
        "name": "SUMIT DAS"
      }
    }
  },
  "type": "checkout.session.completed"
};

// Test the user creation logic
async function testUserCreation() {
  console.log('Testing webhook event processing...');
  
  const session = testEvent.data.object;
  const customerEmail = session.customer_details.email;
  
  console.log('Customer email:', customerEmail);
  console.log('Payment status:', session.payment_status);
  
  if (session.payment_status !== 'paid') {
    console.log('Payment not completed, skipping user creation');
    return;
  }
  
  // Test user creation
  const username = customerEmail.split('@')[0] + '_' + Date.now();
  const password = generateSecurePassword();
  
  const user = {
    email: customerEmail.toLowerCase(),
    username,
    password,
    accessLevel: 'full',
    createdAt: new Date().toISOString(),
    isDemo: false,
    subscriptionStatus: 'active'
  };
  
  console.log('Created user:', {
    email: user.email,
    username: user.username,
    accessLevel: user.accessLevel,
    subscriptionStatus: user.subscriptionStatus
  });
  
  // Test saving to database
  await saveUserToDatabase(user);
  
  console.log('✅ Test completed successfully!');
  console.log('User should now be able to login with:');
  console.log('Username:', username);
  console.log('Password:', password);
}

function generateSecurePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

async function saveUserToDatabase(user) {
  try {
    // Create users directory if it doesn't exist
    const usersDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(usersDir)) {
      fs.mkdirSync(usersDir, { recursive: true });
    }
    
    const usersFile = path.join(usersDir, 'users.json');
    
    // Read existing users
    let users = [];
    if (fs.existsSync(usersFile)) {
      const fileContent = fs.readFileSync(usersFile, 'utf8');
      users = JSON.parse(fileContent);
    }
    
    // Check if user already exists
    const existingUserIndex = users.findIndex(u => u.email === user.email);
    if (existingUserIndex !== -1) {
      // Update existing user
      users[existingUserIndex] = { ...users[existingUserIndex], ...user };
      console.log('Updated existing user');
    } else {
      // Add new user
      users.push(user);
      console.log('Added new user');
    }
    
    // Write back to file
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    
    console.log('User saved to database:', user.email);
  } catch (error) {
    console.error('Error saving user to database:', error);
    throw error;
  }
}

// Run the test
testUserCreation().catch(console.error); 