import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import {
  createUser,
  findUserByEmail,
  findUserByVerificationCode,
  markEmailAsVerified,
} from '../models/userModel.js';

const SALT_ROUNDS = 12;
const EMAIL_CODE_VALID_MINUTES = 15;

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateToken(payload, secret, expiresIn) {
  return jwt.sign(payload, secret, { expiresIn });
}

export async function registerUser({ nome, email, senha, telefone }) {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    const error = new Error('Já existe um usuário cadastrado com este e-mail.');
    error.code = 'USER_ALREADY_EXISTS';
    throw error;
  }

  const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
  const verificationCode = generateVerificationCode();
  const expiresAt = new Date(Date.now() + EMAIL_CODE_VALID_MINUTES * 60 * 1000);

  const user = await createUser({
    id: uuidv4(),
    nome: nome.trim(),
    email: normalizedEmail,
    senha_hash: senhaHash,
    telefone: telefone ? telefone.trim() : null,
    email_verificado: false,
    nivel_viajante: 'iniciante',
    saldo_recompensas: 0,
    dois_fa_ativo: false,
    dois_fa_metodo: null,
    email_verification_code: verificationCode,
    email_verification_code_expires_at: expiresAt,
    created_at: new Date(),
    updated_at: new Date(),
  });

  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    emailVerificationCode: verificationCode,
  };
}

export async function verifyEmail({ email, code }) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await findUserByVerificationCode(normalizedEmail, code);

  if (!user) {
    const error = new Error('Código de verificação inválido ou expirado.');
    error.code = 'INVALID_VERIFICATION_CODE';
    throw error;
  }

  await markEmailAsVerified(user.id);
  return { id: user.id, email: user.email, emailVerificado: true };
}

export async function loginUser({ email, senha }) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await findUserByEmail(normalizedEmail);

  if (!user) {
    const error = new Error('E-mail ou senha incorretos.');
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  const isValidPassword = await bcrypt.compare(senha, user.senha_hash);
  if (!isValidPassword) {
    const error = new Error('E-mail ou senha incorretos.');
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  if (!user.email_verificado) {
    const error = new Error('E-mail não verificado.');
    error.code = 'EMAIL_NOT_VERIFIED';
    throw error;
  }

  const accessToken = generateToken(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    process.env.JWT_EXPIRES_IN || '1h'
  );

  const refreshToken = generateToken(
    { userId: user.id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    process.env.REFRESH_TOKEN_EXPIRES_IN || '30d'
  );

  return {
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
      avatar: user.avatar,
      nivelViajante: user.nivel_viajante,
      saldoRecompensas: user.saldo_recompensas,
      emailVerificado: user.email_verificado,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
  };
}
