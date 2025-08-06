# PM Guide - Product Management Framework Library

A comprehensive web application providing product managers with access to 20+ frameworks, simulators, and case studies for mastering product management methodologies.

## 🚀 Features

### Core Features
- **20+ Framework Simulators**: RICE, ICE, JTBD, Forces Analysis, Kano Analysis, and more
- **Complete Case Studies**: Real-world examples from Netflix, Spotify, Airbnb, Uber, and Slack
- **Interactive Tools**: Calculators, generators, and analysis frameworks
- **Secure Payment System**: Stripe integration for seamless purchases
- **User Management**: Automatic credential generation and email delivery

### Available Frameworks
- **Prioritization**: RICE Calculator, ICE Scoring, MoSCoW Method
- **Discovery**: JTBD Generator, User Persona Generator, Customer Development, Design Thinking
- **Strategy**: Forces Analysis, Kano Analysis, SWOT Analysis, North Star Framework, Competitive Analysis, Pricing Strategy, Market Size Calculator, Value Proposition Canvas
- **Validation**: PMF Measurement, A/B Test Calculator
- **Analytics**: Cohort Analysis, Customer Lifetime Value, AARRR Metrics
- **Planning**: OKR Generator
- **Launch**: Go-to-Market Strategy
- **Growth**: Growth Hacking
- **AI/ML**: AI Model Performance, AI Ethics Assessment, AI Data Quality, AI Readiness Assessment, AI ROI Calculator, AI User Experience

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Vercel** - Serverless deployment platform

### Database & Authentication
- **Supabase** - PostgreSQL database with real-time features
- **Stripe** - Payment processing and webhooks

### Email Service
- **Nodemailer** - Email delivery system
- **Gmail SMTP** - Email provider

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sumitdnew/pm-guide-subscription.git
   cd pm-guide-subscription
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Stripe Configuration
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

   # Email Configuration (Gmail)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password

   # Supabase Database Configuration
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your_supabase_anon_key_here

   # Frontend Supabase Configuration
   REACT_APP_SUPABASE_URL=https://your-project.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here

   # App Configuration
   APP_URL=https://yourdomain.com

   # Server Configuration
   PORT=3001
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Start the backend server**
   ```bash
   node server.js
   ```

## 🌐 Deployment

### Vercel Deployment

1. **Connect your GitHub repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Environment Variables for Production

Set these in your Vercel dashboard:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `EMAIL_USER`
- `EMAIL_PASS`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`
- `APP_URL`

## 🔧 Configuration

### Stripe Setup

1. **Create a Stripe account** and get your API keys
2. **Create a webhook endpoint** pointing to your domain: `https://yourdomain.com/api/webhook`
3. **Configure webhook events** to listen for `checkout.session.completed`
4. **Copy the webhook signing secret** to your environment variables

### Supabase Setup

1. **Create a Supabase project**
2. **Create a `users` table** with the following schema:
   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email VARCHAR UNIQUE NOT NULL,
     username VARCHAR UNIQUE NOT NULL,
     password VARCHAR NOT NULL,
     access_level VARCHAR DEFAULT 'full',
     created_at TIMESTAMP DEFAULT NOW(),
     is_demo BOOLEAN DEFAULT FALSE,
     subscription_status VARCHAR DEFAULT 'active',
     stripe_customer_id VARCHAR
   );
   ```
3. **Copy your Supabase URL and anon key** to environment variables

### Email Setup

1. **Enable 2-factor authentication** on your Gmail account
2. **Generate an app password** for this application
3. **Add the email and password** to environment variables

## 🎯 Usage

### Demo Mode
- Access limited simulators (RICE Calculator, ICE Scoring)
- View all available frameworks
- Test the upgrade flow

### Full Version
- Access all 20+ simulators
- Complete case studies
- Comprehensive framework library
- Lifetime access after purchase

### Payment Flow
1. User clicks "Upgrade to Full Version"
2. Redirected to Stripe checkout
3. Payment processed securely
4. Webhook triggers user creation
5. Email sent with login credentials
6. User gains full access

## 🔒 Security

- **Webhook signature verification** ensures requests come from Stripe
- **Environment variables** keep secrets secure
- **HTTPS only** for all production traffic
- **Private repository** protects source code

## 📁 Project Structure

```
pm-guide-subscription/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── utils/              # Utility functions
│   └── App.js              # Main app component
├── api/                    # Vercel API routes
│   └── webhook.js          # Stripe webhook handler
├── server.js               # Express server (local development)
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🚀 Scripts

- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `node server.js` - Start backend server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary. All rights reserved.

## 🆘 Support

For support or questions:
- Check the documentation
- Review the code comments
- Contact the development team

## 🎉 Acknowledgments

- Built with React and modern web technologies
- Powered by Stripe for secure payments
- Hosted on Vercel for reliable deployment
- Database powered by Supabase

---

**PM Guide** - Empowering product managers with comprehensive frameworks and tools for success.
