-- Analytics Events Table Schema for PM Guide App
-- Run this in your Supabase SQL Editor

-- Create the analytics_events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGSERIAL PRIMARY KEY,
  event_name TEXT NOT NULL,
  event_data JSONB NOT NULL,
  session_id TEXT,
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);

-- Create a function to clean old analytics data (optional)
CREATE OR REPLACE FUNCTION clean_old_analytics_data(days_to_keep INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM analytics_events 
  WHERE created_at < NOW() - INTERVAL '1 day' * days_to_keep;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS) for the analytics table
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (since this is analytics data)
-- You can modify this based on your security requirements
CREATE POLICY "Allow all operations on analytics_events" ON analytics_events
  FOR ALL USING (true);

-- Create a view for common analytics queries
CREATE OR REPLACE VIEW analytics_summary AS
SELECT 
  COUNT(*) as total_events,
  COUNT(DISTINCT session_id) as total_sessions,
  COUNT(CASE WHEN event_name = 'page_view' THEN 1 END) as page_views,
  COUNT(CASE WHEN event_name = 'framework_usage' THEN 1 END) as framework_usage,
  COUNT(CASE WHEN event_name = 'simulator_usage' THEN 1 END) as simulator_usage,
  MIN(created_at) as first_event,
  MAX(created_at) as last_event
FROM analytics_events;

-- Create a view for framework usage statistics
CREATE OR REPLACE VIEW framework_usage_stats AS
SELECT 
  event_data->>'frameworkId' as framework_id,
  COUNT(*) as views,
  COUNT(CASE WHEN event_data->>'action' = 'click' THEN 1 END) as clicks,
  COUNT(CASE WHEN event_data->>'action' = 'view' THEN 1 END) as views_only,
  COUNT(CASE WHEN event_data->>'action' = 'view_case_studies' THEN 1 END) as case_study_views
FROM analytics_events 
WHERE event_name = 'framework_usage'
GROUP BY event_data->>'frameworkId'
ORDER BY views DESC;

-- Create a view for simulator usage statistics
CREATE OR REPLACE VIEW simulator_usage_stats AS
SELECT 
  event_data->>'simulatorId' as simulator_id,
  COUNT(*) as views,
  COUNT(CASE WHEN event_data->>'action' = 'view' THEN 1 END) as views_only,
  COUNT(CASE WHEN event_data->>'action' = 'interaction' THEN 1 END) as interactions
FROM analytics_events 
WHERE event_name = 'simulator_usage'
GROUP BY event_data->>'simulatorId'
ORDER BY views DESC;

-- Create a view for session statistics
CREATE OR REPLACE VIEW session_stats AS
SELECT 
  session_id,
  COUNT(*) as event_count,
  COUNT(CASE WHEN event_name = 'page_view' THEN 1 END) as page_views,
  COUNT(CASE WHEN event_name = 'framework_usage' THEN 1 END) as framework_interactions,
  COUNT(CASE WHEN event_name = 'simulator_usage' THEN 1 END) as simulator_interactions,
  MIN(created_at) as session_start,
  MAX(created_at) as session_end,
  EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at))) as session_duration_seconds
FROM analytics_events 
WHERE session_id IS NOT NULL
GROUP BY session_id
ORDER BY session_start DESC;

-- Grant necessary permissions (adjust based on your Supabase setup)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON analytics_events TO authenticated;
-- GRANT SELECT ON analytics_summary TO authenticated;
-- GRANT SELECT ON framework_usage_stats TO authenticated;
-- GRANT SELECT ON simulator_usage_stats TO authenticated;
-- GRANT SELECT ON session_stats TO authenticated;

-- Optional: Create a function to get analytics data for a specific date range
CREATE OR REPLACE FUNCTION get_analytics_for_date_range(
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ
)
RETURNS TABLE (
  event_name TEXT,
  event_count BIGINT,
  unique_sessions BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ae.event_name,
    COUNT(*) as event_count,
    COUNT(DISTINCT ae.session_id) as unique_sessions
  FROM analytics_events ae
  WHERE ae.created_at BETWEEN start_date AND end_date
  GROUP BY ae.event_name
  ORDER BY event_count DESC;
END;
$$ LANGUAGE plpgsql;
