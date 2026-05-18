CREATE TABLE IF NOT EXISTS trips (
  id VARCHAR(36) PRIMARY KEY,
  usuario_id VARCHAR(36) NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  destino TEXT NOT NULL,
  tipo_viagem TEXT NOT NULL,
  custo_total NUMERIC NOT NULL,
  data_inicio DATE,
  data_fim DATE,
  fotos TEXT[] NOT NULL,
  curtidas INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'rascunho',
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_trip_usuario FOREIGN KEY (usuario_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tourist_spots (
  id VARCHAR(36) PRIMARY KEY,
  trip_id VARCHAR(36) NOT NULL,
  nome TEXT NOT NULL,
  cidade TEXT,
  pais TEXT,
  descricao TEXT,
  categoria TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_tourist_spot_trip FOREIGN KEY (trip_id) REFERENCES trips (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS trip_likes (
  id VARCHAR(36) PRIMARY KEY,
  trip_id VARCHAR(36) NOT NULL,
  usuario_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_trip_like_trip FOREIGN KEY (trip_id) REFERENCES trips (id) ON DELETE CASCADE,
  CONSTRAINT fk_trip_like_user FOREIGN KEY (usuario_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT unique_trip_like UNIQUE (trip_id, usuario_id)
);
