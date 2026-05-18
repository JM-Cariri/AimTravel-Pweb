import { validationResult } from 'express-validator';
import { registerUser, verifyEmail, loginUser } from '../services/authService.js';
import { successResponse, errorResponse } from '../utils/response.js';

function buildValidationErrors(result) {
  return result.array().map((item) => `${item.param}: ${item.msg}`).join(', ');
}

export async function handleRegister(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, 'VALIDATION_ERROR', buildValidationErrors(errors));
  }

  try {
    const payload = await registerUser(req.body);
    return successResponse(res, payload, 'Usuário registrado com sucesso. Verifique seu e-mail para ativar a conta.');
  } catch (err) {
    const status = err.code === 'USER_ALREADY_EXISTS' ? 409 : 500;
    const code = err.code || 'REGISTER_ERROR';
    return errorResponse(res, status, code, err.message);
  }
}

export async function handleVerifyEmail(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, 'VALIDATION_ERROR', buildValidationErrors(errors));
  }

  try {
    const payload = await verifyEmail(req.body);
    return successResponse(res, payload, 'E-mail verificado com sucesso.');
  } catch (err) {
    const status = err.code === 'INVALID_VERIFICATION_CODE' ? 400 : 500;
    const code = err.code || 'VERIFY_EMAIL_ERROR';
    return errorResponse(res, status, code, err.message);
  }
}

export async function handleLogin(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, 'VALIDATION_ERROR', buildValidationErrors(errors));
  }

  try {
    const payload = await loginUser(req.body);
    return successResponse(res, payload, 'Login realizado com sucesso.');
  } catch (err) {
    const status = err.code === 'INVALID_CREDENTIALS' ? 401 : err.code === 'EMAIL_NOT_VERIFIED' ? 403 : 500;
    const code = err.code || 'LOGIN_ERROR';
    return errorResponse(res, status, code, err.message);
  }
}

export function handleProtected(req, res) {
  return successResponse(res, { user: req.user }, 'Rota protegida acessada com sucesso.');
}
