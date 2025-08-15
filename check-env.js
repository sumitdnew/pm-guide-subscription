// Check environment variables
require('dotenv').config();

console.log('🔍 Checking Mailchimp Environment Variables...\n');

const mailchimpVars = {
  'MAILCHIMP_API_KEY': process.env.MAILCHIMP_API_KEY,
  'MAILCHIMP_LIST_ID': process.env.MAILCHIMP_LIST_ID,
  'MAILCHIMP_SERVER_PREFIX': process.env.MAILCHIMP_SERVER_PREFIX
};

console.log('Mailchimp Variables:');
Object.entries(mailchimpVars).forEach(([key, value]) => {
  if (value) {
    console.log(`✅ ${key}: ${value.substring(0, 10)}...${value.substring(value.length - 4)}`);
  } else {
    console.log(`❌ ${key}: Not set`);
  }
});

console.log('\n📁 .env file location:', require('path').resolve('.env'));
console.log('📄 .env file exists:', require('fs').existsSync('.env'));

if (require('fs').existsSync('.env')) {
  console.log('\n📋 .env file contents:');
  const envContent = require('fs').readFileSync('.env', 'utf8');
  const lines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  lines.forEach(line => {
    if (line.includes('MAILCHIMP')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=');
      console.log(`  ${key}=${value.substring(0, 10)}...${value.substring(value.length - 4)}`);
    }
  });
}
