// Debug environment variables
require('dotenv').config();

console.log('🔍 Debug Environment Variables...\n');

console.log('MAILCHIMP_API_KEY:', process.env.MAILCHIMP_API_KEY ? 'SET' : 'NOT SET');
console.log('MAILCHIMP_LIST_ID:', process.env.MAILCHIMP_LIST_ID ? 'SET' : 'NOT SET');
console.log('MAILCHIMP_SERVER_PREFIX:', process.env.MAILCHIMP_SERVER_PREFIX ? 'SET' : 'NOT SET');

console.log('\nAll environment variables:');
Object.keys(process.env).filter(key => key.includes('MAILCHIMP')).forEach(key => {
  console.log(`${key}: ${process.env[key]}`);
});
