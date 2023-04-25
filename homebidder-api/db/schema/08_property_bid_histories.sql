DROP TABLE IF EXISTS property_bid_histories CASCADE;

CREATE TABLE property_bid_histories (
  id SERIAL PRIMARY KEY NOT NULL,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  bid_amount INTEGER  NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  seller_response VARCHAR(255) NOT NULL DEFAULT 'Pending',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);