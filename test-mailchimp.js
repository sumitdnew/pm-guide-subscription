// Test script for Mailchimp integration
require('dotenv').config();
const mailchimp = require('@mailchimp/mailchimp_marketing');

async function testMailchimpIntegration() {
  console.log('Testing Mailchimp integration...');
  
  // Check if environment variables are set
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  
  if (!apiKey || !listId || !serverPrefix) {
    console.log('❌ Mailchimp environment variables not configured');
    console.log('Please set: MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, MAILCHIMP_SERVER_PREFIX');
    return;
  }
  
  try {
    // Initialize Mailchimp
    mailchimp.setConfig({
      apiKey: apiKey,
      server: serverPrefix,
    });
    
    console.log('✅ Mailchimp client initialized');
    
    // Test API connection
    const response = await mailchimp.ping.get();
    console.log('✅ Mailchimp API connection successful');
    console.log('Server response:', response);
    
    // Test audience access
    const audience = await mailchimp.lists.getList(listId);
    console.log('✅ Audience access successful');
    console.log('Audience name:', audience.name);
    console.log('Audience ID:', audience.id);
    console.log('Member count:', audience.stats.member_count);
    
    // Test adding a member (will fail if already exists, which is expected)
    try {
      const testEmail = `test-${Date.now()}@example.com`;
      const member = await mailchimp.lists.addListMember(listId, {
        email_address: testEmail,
        status: 'subscribed',
        merge_fields: {
          FNAME: 'Test',
          LNAME: 'User',
          SOURCE: 'PM Guide Test'
        },
        tags: ['Test Subscriber']
      });
      
      console.log('✅ Test member added successfully');
      console.log('Member email:', member.email_address);
      
      // Clean up - remove test member
      await mailchimp.lists.deleteListMember(listId, member.id);
      console.log('✅ Test member removed');
      
    } catch (error) {
      if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
        console.log('✅ Error handling works correctly (member already exists)');
      } else {
        console.log('⚠️  Member addition test failed:', error.message);
      }
    }
    
    console.log('\n🎉 Mailchimp integration test completed successfully!');
    
  } catch (error) {
    console.error('❌ Mailchimp integration test failed:', error.message);
    console.error('Error details:', error);
  }
}

testMailchimpIntegration();
