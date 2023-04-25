-- Drop and recreate Users table
DROP TABLE IF EXISTS properties CASCADE;

CREATE TABLE properties (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  number_of_bathrooms INTEGER  NOT NULL DEFAULT 0,
  number_of_bedrooms INTEGER  NOT NULL DEFAULT 0,
  parking_spaces INTEGER  NOT NULL DEFAULT 0,

  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  post_code VARCHAR(255) NOT NULL,
  square_footage NUMERIC NOT NULL,
  property_type VARCHAR(255) NOT NULL,
  year_built INTEGER NOT NULL,
  
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_approved BOOLEAN NOT NULL DEFAULT FALSE
);