-- Drop and recreate Users table
DROP TABLE IF EXISTS property_images CASCADE;

CREATE TABLE property_images (
  id SERIAL PRIMARY KEY NOT NULL,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL
);