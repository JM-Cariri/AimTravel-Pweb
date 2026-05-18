import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/response.js';

export default function authMiddleware(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return errorResponse(res, 401, 'AUTH_REQUIRED', 'Token de autenticação não informado.');
  }

  const parts = authorizationHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return errorResponse(res, 401, 'INVALID_AUTH_HEADER', 'Cabeçalho de autenticação inválido.');
  }

  const token = parts[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: payload.userId,
      email: payload.email,
    };
    return next();
  } catch (err) {
    return errorResponse(res, 401, 'INVALID_TOKEN', 'Token de autenticação inválido ou expirado.');
  }
}
