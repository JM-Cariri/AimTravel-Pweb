import express from 'express';
import { body } from 'express-validator';
import { handleRegister, handleVerifyEmail, handleLogin, handleProtected } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
    body('email').trim().isEmail().withMessage('E-mail inválido'),
    body('senha').isLength({ min: 8 }).withMessage('Senha precisa ter ao menos 8 caracteres'),
    body('telefone')
      .optional()
      .trim()
      .isLength({ min: 8 })
      .withMessage('Telefone inválido'),
  ],
  handleRegister
);

router.post(
  '/verify-email',
  [
    body('email').trim().isEmail().withMessage('E-mail inválido'),
    body('code')
      .trim()
      .isLength({ min: 6, max: 6 })
      .withMessage('Código deve ter 6 dígitos'),
  ],
  handleVerifyEmail
);

router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('E-mail inválido'),
    body('senha').notEmpty().withMessage('Senha é obrigatória'),
  ],
  handleLogin
);

router.get('/me', authMiddleware, handleProtected);

export default router;
