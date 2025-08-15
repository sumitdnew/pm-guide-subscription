// Simple test to check .env file
const fs = require('fs');
const path = require('path');

console.log('🔍 Simple .env Test...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
console.log('📁 .env file path:', envPath);
console.log('📄 .env file exists:', fs.existsSync(envPath));

if (fs.existsSync(envPath)) {
  console.log('\n📋 .env file size:', fs.statSync(envPath).size, 'bytes');
  
  // Read the file content
  const content = fs.readFileSync(envPath, 'utf8');
  console.log('\n📄 .env file content:');
  console.log('---START OF FILE---');
  console.log(content);
  console.log('---END OF FILE---');
  
  // Check for Mailchimp lines
  const lines = content.split('\n');
  console.log('\n🔍 Looking for Mailchimp lines:');
  lines.forEach((line, index) => {
    if (line.includes('MAILCHIMP')) {
      console.log(`Line ${index + 1}: "${line}"`);
    }
  });
}
