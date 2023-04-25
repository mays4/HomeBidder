DROP TABLE IF EXISTS bids CASCADE;

CREATE TABLE bids (
  id SERIAL PRIMARY KEY NOT NULL,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  base_price_in_cents NUMERIC  NOT NULL,
  increment_price_per_bid INTEGER DEFAULT 100000,
  bid_start_date DATE NOT NULL,
  bid_end_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);