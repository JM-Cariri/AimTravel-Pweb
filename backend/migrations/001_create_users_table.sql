CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha_hash TEXT NOT NULL,
  avatar TEXT,
  bio TEXT,
  nivel_viajante TEXT NOT NULL DEFAULT 'iniciante',
  saldo_recompensas INTEGER NOT NULL DEFAULT 0,
  email_verificado BOOLEAN NOT NULL DEFAULT false,
  telefone TEXT,
  dois_fa_ativo BOOLEAN NOT NULL DEFAULT false,
  dois_fa_metodo TEXT,
  email_verification_code VARCHAR(6),
  email_verification_code_expires_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);
