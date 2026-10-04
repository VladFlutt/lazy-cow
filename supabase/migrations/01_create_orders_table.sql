-- Create orders table for Lazy Cow Studio
CREATE TABLE orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  product VARCHAR(255) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  color VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending'
);

-- Create index on email for faster lookups
CREATE INDEX idx_orders_email ON orders(email);

-- Create index on created_at for sorting
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (orders can be created by anyone)
CREATE POLICY "Allow public inserts" ON orders
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reading own orders
CREATE POLICY "Allow reading own orders" ON orders
  FOR SELECT USING (auth.email() = email);
