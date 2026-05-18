import { query } from '../config/db.js';

const USER_COLUMNS = [
  'id',
  'nome',
  'email',
  'senha_hash',
  'avatar',
  'bio',
  'nivel_viajante',
  'saldo_recompensas',
  'email_verificado',
  'telefone',
  'dois_fa_ativo',
  'dois_fa_metodo',
  'email_verification_code',
  'email_verification_code_expires_at',
  'created_at',
  'updated_at',
].join(', ');

export async function createUser(user) {
  const sql = `INSERT INTO users (
      id,
      nome,
      email,
      senha_hash,
      avatar,
      bio,
      nivel_viajante,
      saldo_recompensas,
      email_verificado,
      telefone,
      dois_fa_ativo,
      dois_fa_metodo,
      email_verification_code,
      email_verification_code_expires_at,
      created_at,
      updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    RETURNING ${USER_COLUMNS}`;

  const params = [
    user.id,
    user.nome,
    user.email,
    user.senha_hash,
    user.avatar || null,
    user.bio || null,
    user.nivel_viajante || 'iniciante',
    user.saldo_recompensas ?? 0,
    user.email_verificado ?? false,
    user.telefone || null,
    user.dois_fa_ativo ?? false,
    user.dois_fa_metodo || null,
    user.email_verification_code,
    user.email_verification_code_expires_at,
    user.created_at,
    user.updated_at,
  ];

  const result = await query(sql, params);
  return result.rows[0];
}

export async function findUserByEmail(email) {
  const result = await query(
    `SELECT ${USER_COLUMNS} FROM users WHERE email = $1 LIMIT 1`,
    [email.trim().toLowerCase()]
  );
  return result.rows[0] || null;
}

export async function findUserById(id) {
  const result = await query(
    `SELECT ${USER_COLUMNS} FROM users WHERE id = $1 LIMIT 1`,
    [id]
  );
  return result.rows[0] || null;
}

export async function findUserByVerificationCode(email, code) {
  const result = await query(
    `SELECT ${USER_COLUMNS} FROM users
     WHERE email = $1
       AND email_verification_code = $2
       AND email_verification_code_expires_at >= now()
     LIMIT 1`,
    [email.trim().toLowerCase(), code]
  );
  return result.rows[0] || null;
}

export async function markEmailAsVerified(userId) {
  const result = await query(
    `UPDATE users
     SET email_verificado = true,
         email_verification_code = NULL,
         email_verification_code_expires_at = NULL,
         updated_at = now()
     WHERE id = $1
     RETURNING ${USER_COLUMNS}`,
    [userId]
  );
  return result.rows[0] || null;
}
