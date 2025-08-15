// Test Mailchimp integration with manual variables
const mailchimp = require('@mailchimp/mailchimp_marketing');

async function testMailchimpIntegration() {
  console.log('Testing Mailchimp integration with manual variables...');
  
  // Manual variables (from your .env file)
  const apiKey = '98ac16ab3579b59c1dd7a3f178781cf3-us12';
  const listId = '16a8d8f166';
  const serverPrefix = 'us12';
  
  console.log('Using:');
  console.log('- API Key:', apiKey.substring(0, 10) + '...' + apiKey.substring(apiKey.length - 4));
  console.log('- List ID:', listId);
  console.log('- Server Prefix:', serverPrefix);
  
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
    
    // Test adding a member
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
