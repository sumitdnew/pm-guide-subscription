# Mailchimp Integration Setup

This guide will help you set up Mailchimp integration with your PM Guide application.

## Prerequisites

1. A Mailchimp account (free or paid)
2. Access to your Mailchimp dashboard
3. Your PM Guide application deployed or running locally

## Step 1: Get Your Mailchimp API Key

1. **Log in to Mailchimp**
   - Go to [mailchimp.com](https://mailchimp.com) and sign in

2. **Navigate to Account Settings**
   - Click on your profile icon in the bottom left
   - Select "Account & billing"
   - Click on "Extras" → "API keys"

3. **Create a New API Key**
   - Click "Create A Key"
   - Give it a name like "PM Guide Integration"
   - Copy the generated API key (you won't be able to see it again)

## Step 2: Find Your Server Prefix

1. **Get Server Prefix**
   - In your Mailchimp dashboard, go to "Account" → "Extras" → "API keys"
   - Look for the server prefix (e.g., "us1", "us2", "us3", etc.)
   - It's usually shown in the format: `https://us1.admin.mailchimp.com`

## Step 3: Create a Mailchimp Audience (List)

1. **Create New Audience**
   - Go to "Audience" → "All contacts"
   - Click "Create Audience"
   - Choose "Create a new audience"

2. **Configure Audience Settings**
   - **Audience name**: "PM Guide Subscribers"
   - **Default from email**: Your email address
   - **Default from name**: "PM Guide Team"
   - **Reminder email**: Optional
   - Click "Save"

3. **Get Audience ID**
   - Go to "Audience" → "All contacts"
   - Click "Settings" → "Audience name and defaults"
   - Scroll down to find the "Audience ID" (it's a long string of letters and numbers)

## Step 4: Set Up Merge Fields (Optional but Recommended)

1. **Add Custom Merge Fields**
   - Go to "Audience" → "All contacts" → "Settings" → "Audience fields and merge tags"
   - Click "Add A Field"
   - Add these fields:
     - **SOURCE** (Text field) - to track where subscribers came from
     - **INTERESTS** (Text field) - to track user interests
     - **SIGNUP_DATE** (Date field) - to track when they subscribed

## Step 5: Configure Environment Variables

### For Local Development (.env file)

Add these variables to your `.env` file:

```env
# Mailchimp Configuration
MAILCHIMP_API_KEY=your_api_key_here
MAILCHIMP_LIST_ID=your_audience_id_here
MAILCHIMP_SERVER_PREFIX=us1
```

### For Production (Vercel)

1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add these variables:
   - `MAILCHIMP_API_KEY` = your_api_key_here
   - `MAILCHIMP_LIST_ID` = your_audience_id_here
   - `MAILCHIMP_SERVER_PREFIX` = us1

## Step 6: Test the Integration

1. **Start your application**
   ```bash
   npm run dev
   ```

2. **Test subscription**
   - Go to your application
   - Subscribe with a test email
   - Check your Mailchimp audience to see if the contact was added

3. **Check logs**
   - Look for these messages in your console:
     - "Mailchimp client initialized"
     - "Subscriber added to Mailchimp: [email]"

## Step 7: Set Up Welcome Email (Optional)

1. **Create Welcome Email**
   - In Mailchimp, go to "Campaigns" → "Create Campaign"
   - Choose "Email" → "Regular campaign"
   - Select your "PM Guide Subscribers" audience
   - Design your welcome email

2. **Set Up Automation**
   - Go to "Automation" → "Create Automation"
   - Choose "Welcome series" or "Welcome email"
   - Configure the trigger and email content

## Features Included

### Automatic Subscriber Addition
- New subscribers are automatically added to your Mailchimp audience
- Includes merge fields: FNAME, LNAME, SOURCE
- Adds tags: "PM Guide Subscriber", "Product Management"

### Error Handling
- Graceful handling of existing subscribers
- Won't break subscription if Mailchimp is down
- Detailed logging for debugging

### Merge Fields
- **FNAME**: First name (extracted from email)
- **LNAME**: Last name (empty by default)
- **SOURCE**: Set to "PM Guide Website"
- **Tags**: Automatically tagged for easy segmentation

## Troubleshooting

### Common Issues

1. **"Invalid API Key"**
   - Check that your API key is correct
   - Ensure you copied the entire key

2. **"Audience not found"**
   - Verify your Audience ID is correct
   - Make sure the audience exists in your account

3. **"Server prefix not found"**
   - Check your server prefix (us1, us2, etc.)
   - It's in your Mailchimp dashboard URL

4. **Subscribers not appearing**
   - Check your browser console for errors
   - Verify environment variables are set correctly
   - Check Mailchimp logs in your dashboard

### Debug Mode

To enable detailed logging, add this to your environment:

```env
DEBUG_MAILCHIMP=true
```

## Security Notes

- Never commit your API key to version control
- Use environment variables for all sensitive data
- Regularly rotate your API keys
- Monitor your Mailchimp usage and limits

## Next Steps

1. **Set up email campaigns** in Mailchimp
2. **Create audience segments** based on tags
3. **Set up automation** for welcome series
4. **Monitor subscriber engagement** through Mailchimp analytics

## Support

If you encounter issues:
1. Check the Mailchimp API documentation
2. Review your environment variables
3. Check the application logs
4. Test with a simple API call first
