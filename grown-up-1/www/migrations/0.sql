CREATE TABLE nodes (
  id uuid PRIMARY KEY DEFAULT uuid(),
  data JSONB NOT NULL,
  node_type TEXT NOT NULL
);

CREATE TABLE edges (
  src_node_id UUID REFERENCES nodes(id) NOT NULL,
  dst_node_id UUID REFERENCES nodes(id) NOT NULL,
  name TEXT NOT NULL
);