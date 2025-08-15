# Admin Panel Access

The PM Guide application includes an admin panel that is hidden from regular users. This panel provides access to analytics and subscriber management.

## How to Access the Admin Panel

### Method 1: Keyboard Shortcut
- Press `Ctrl + Shift + A` while on the main application page
- This will immediately open the admin panel

### Method 2: Hidden Button
- Look for a very faint "Admin" text at the bottom of the page
- Hover over it to make it more visible
- Click on it to access the admin panel

## Admin Panel Features

### Analytics Dashboard
- View user engagement metrics
- Track framework usage statistics
- Monitor page views and user interactions
- Export analytics data

### Subscriber Management
- View all email subscribers
- See subscription statistics
- Export subscriber list to CSV
- Monitor subscription growth

## Security Notes

- The admin panel is intentionally hidden from regular users
- No authentication is currently implemented for the admin panel
- In a production environment, you should implement proper authentication
- Consider adding environment variables to control admin access

## Future Enhancements

- Add proper authentication system
- Implement role-based access control
- Add admin user management
- Create audit logs for admin actions

## Technical Implementation

The admin panel is implemented as a separate component (`AdminPanel.js`) that:
- Uses tab navigation to switch between analytics and subscribers
- Integrates with existing analytics and subscriber components
- Provides a clean, professional interface for administrators
- Can be easily extended with additional admin features
