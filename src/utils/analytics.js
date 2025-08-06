// Analytics utility for tracking user interactions and framework usage
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for analytics
let supabase = null;
if (typeof window !== 'undefined' && process.env.REACT_APP_SUPABASE_URL && process.env.REACT_APP_SUPABASE_ANON_KEY) {
  try {
    supabase = createClient(
      process.env.REACT_APP_SUPABASE_URL,
      process.env.REACT_APP_SUPABASE_ANON_KEY
    );
    console.log('Supabase analytics client initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Supabase analytics client:', error);
    supabase = null;
  }
}

class Analytics {
  constructor() {
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.initializeAnalytics();
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  initializeAnalytics() {
    // Track page views
    this.trackPageView(window.location.pathname);
    
    // Track session start
    this.trackEvent('session_start', {
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timestamp: new Date().toISOString()
    });
  }

  trackPageView(page) {
    this.trackEvent('page_view', {
      page,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString()
    });
  }

  trackFrameworkUsage(frameworkId, action = 'view') {
    this.trackEvent('framework_usage', {
      frameworkId,
      action,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString()
    });
  }

  trackSimulatorUsage(simulatorId, action = 'view', duration = null) {
    this.trackEvent('simulator_usage', {
      simulatorId,
      action,
      duration,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString()
    });
  }

  trackUpgradeAttempt(source = 'unknown') {
    this.trackEvent('upgrade_attempt', {
      source,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString()
    });
  }

  async trackEvent(eventName, data = {}) {
    const event = {
      eventName,
      data,
      timestamp: new Date().toISOString()
    };

    this.events.push(event);
    
    // Store in localStorage for persistence (fallback)
    this.saveToLocalStorage();
    
    // Store in Supabase if available
    if (supabase) {
      await this.saveToSupabase(event);
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }
  }

  async saveToSupabase(event) {
    try {
      const { error } = await supabase
        .from('analytics_events')
        .insert([{
          event_name: event.eventName,
          event_data: event.data,
          session_id: event.data.sessionId,
          timestamp: event.timestamp,
          created_at: new Date().toISOString()
        }]);

      if (error) {
        console.error('Failed to save analytics to Supabase:', error);
      } else {
        console.log('Analytics event saved to Supabase');
      }
    } catch (error) {
      console.error('Error saving to Supabase:', error);
    }
  }

  saveToLocalStorage() {
    try {
      const existingData = localStorage.getItem('pm_guide_analytics');
      const analyticsData = existingData ? JSON.parse(existingData) : { events: [] };
      
      analyticsData.events = [...analyticsData.events, ...this.events];
      
      // Keep only last 1000 events to prevent localStorage overflow
      if (analyticsData.events.length > 1000) {
        analyticsData.events = analyticsData.events.slice(-1000);
      }
      
      localStorage.setItem('pm_guide_analytics', JSON.stringify(analyticsData));
      this.events = []; // Clear events after saving
    } catch (error) {
      console.error('Failed to save analytics to localStorage:', error);
    }
  }

  async getAnalyticsData() {
    // Try to get from Supabase first
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('analytics_events')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1000);

        if (error) {
          console.error('Failed to get analytics from Supabase:', error);
        } else {
          // Transform Supabase data to match localStorage format
          const events = data.map(row => ({
            eventName: row.event_name,
            data: row.event_data,
            timestamp: row.timestamp
          }));
          return { events };
        }
      } catch (error) {
        console.error('Error getting analytics from Supabase:', error);
      }
    }

    // Fallback to localStorage
    try {
      const data = localStorage.getItem('pm_guide_analytics');
      return data ? JSON.parse(data) : { events: [] };
    } catch (error) {
      console.error('Failed to get analytics data from localStorage:', error);
      return { events: [] };
    }
  }

  async getFrameworkUsageStats() {
    const data = await this.getAnalyticsData();
    const frameworkEvents = data.events.filter(event => event.eventName === 'framework_usage');
    
    const stats = {};
    frameworkEvents.forEach(event => {
      const frameworkId = event.data.frameworkId;
      if (!stats[frameworkId]) {
        stats[frameworkId] = { views: 0, actions: {} };
      }
      stats[frameworkId].views++;
      
      const action = event.data.action;
      if (!stats[frameworkId].actions[action]) {
        stats[frameworkId].actions[action] = 0;
      }
      stats[frameworkId].actions[action]++;
    });
    
    return stats;
  }

  async getSimulatorUsageStats() {
    const data = await this.getAnalyticsData();
    const simulatorEvents = data.events.filter(event => event.eventName === 'simulator_usage');
    
    const stats = {};
    simulatorEvents.forEach(event => {
      const simulatorId = event.data.simulatorId;
      if (!stats[simulatorId]) {
        stats[simulatorId] = { views: 0, actions: {} };
      }
      stats[simulatorId].views++;
      
      const action = event.data.action;
      if (!stats[simulatorId].actions[action]) {
        stats[simulatorId].actions[action] = 0;
      }
      stats[simulatorId].actions[action]++;
    });
    
    return stats;
  }

  async getSessionStats() {
    const data = await this.getAnalyticsData();
    const sessions = new Set();
    const pageViews = data.events.filter(event => event.eventName === 'page_view').length;
    const frameworkUsage = data.events.filter(event => event.eventName === 'framework_usage').length;
    const simulatorUsage = data.events.filter(event => event.eventName === 'simulator_usage').length;
    const upgradeAttempts = data.events.filter(event => event.eventName === 'upgrade_attempt').length;
    
    data.events.forEach(event => {
      if (event.data.sessionId) {
        sessions.add(event.data.sessionId);
      }
    });
    
    return {
      totalSessions: sessions.size,
      totalPageViews: pageViews,
      totalFrameworkUsage: frameworkUsage,
      totalSimulatorUsage: simulatorUsage,
      totalUpgradeAttempts: upgradeAttempts,
      averagePageViewsPerSession: sessions.size > 0 ? (pageViews / sessions.size).toFixed(2) : 0
    };
  }

  async clearAnalytics() {
    try {
      // Clear from Supabase if available
      if (supabase) {
        const { error } = await supabase
          .from('analytics_events')
          .delete()
          .neq('id', 0); // Delete all records

        if (error) {
          console.error('Failed to clear analytics from Supabase:', error);
        } else {
          console.log('Analytics data cleared from Supabase');
        }
      }

      // Clear from localStorage
      localStorage.removeItem('pm_guide_analytics');
      this.events = [];
      console.log('Analytics data cleared from localStorage');
    } catch (error) {
      console.error('Failed to clear analytics:', error);
    }
  }

  // Method to check if Supabase is available
  isSupabaseAvailable() {
    return !!supabase;
  }
}

// Create singleton instance
const analytics = new Analytics();

export default analytics;
