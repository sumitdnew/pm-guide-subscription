-- Subscribers Table Schema for PM Guide App
-- Run this in your Supabase SQL Editor

-- Create the subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status VARCHAR DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_subscribed_at ON subscribers(subscribed_at);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_subscribers_updated_at 
    BEFORE UPDATE ON subscribers 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for the subscribers table
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (since this is subscription data)
CREATE POLICY "Allow all operations on subscribers" ON subscribers
  FOR ALL USING (true);

-- Create a view for subscriber statistics
CREATE OR REPLACE VIEW subscriber_stats AS
SELECT 
  COUNT(*) as total_subscribers,
  COUNT(CASE WHEN status = 'active' THEN 1 END) as active_subscribers,
  COUNT(CASE WHEN status = 'unsubscribed' THEN 1 END) as unsubscribed_count,
  MIN(subscribed_at) as first_subscription,
  MAX(subscribed_at) as last_subscription,
  COUNT(CASE WHEN subscribed_at >= NOW() - INTERVAL '7 days' THEN 1 END) as new_this_week,
  COUNT(CASE WHEN subscribed_at >= NOW() - INTERVAL '30 days' THEN 1 END) as new_this_month
FROM subscribers;

-- Create a function to get subscribers by date range
CREATE OR REPLACE FUNCTION get_subscribers_by_date_range(
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ
)
RETURNS TABLE (
  email VARCHAR,
  subscribed_at TIMESTAMPTZ,
  status VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.email,
    s.subscribed_at,
    s.status
  FROM subscribers s
  WHERE s.subscribed_at BETWEEN start_date AND end_date
  ORDER BY s.subscribed_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions (adjust based on your Supabase setup)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON subscribers TO authenticated;
-- GRANT SELECT ON subscriber_stats TO authenticated;

-- Optional: Create a function to clean old unsubscribed records (older than 1 year)
CREATE OR REPLACE FUNCTION clean_old_unsubscribed_records()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM subscribers 
  WHERE status = 'unsubscribed' 
  AND updated_at < NOW() - INTERVAL '1 year';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;
