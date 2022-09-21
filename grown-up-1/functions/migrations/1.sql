CREATE TABLE goals (
  id uuid PRIMARY KEY DEFAULT uuid(),
  description TEXT NOT NULL,
  new_field TEXT NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL, -- TODO: create users table
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);

