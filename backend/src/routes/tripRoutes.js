import express from 'express';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  handleCreateTrip,
  handleListTrips,
  handleGetTripById,
  handleUpdateTrip,
  handleToggleLike,
} from '../controllers/tripController.js';

const router = express.Router();

router.get('/', handleListTrips);
router.get('/:id', handleGetTripById);

router.post(
  '/',
  authMiddleware,
  [
    body('titulo').trim().notEmpty().withMessage('Título é obrigatório'),
    body('destino').trim().notEmpty().withMessage('Destino é obrigatório'),
    body('tipo_viagem').trim().notEmpty().withMessage('Tipo de viagem é obrigatório'),
    body('custo_total').isFloat({ gt: 0 }).withMessage('Custo total deve ser maior que zero'),
    body('fotos').isArray({ min: 1 }).withMessage('Pelo menos uma foto é necessária'),
  ],
  handleCreateTrip
);

router.put(
  '/:id',
  authMiddleware,
  [
    body('titulo').optional().trim().notEmpty().withMessage('Título não pode ser vazio'),
    body('destino').optional().trim().notEmpty().withMessage('Destino não pode ser vazio'),
    body('tipo_viagem').optional().trim().notEmpty().withMessage('Tipo de viagem não pode ser vazio'),
    body('custo_total')
      .optional()
      .isFloat({ gt: 0 })
      .withMessage('Custo total deve ser maior que zero'),
    body('fotos').optional().isArray({ min: 1 }).withMessage('Pelo menos uma foto é necessária'),
  ],
  handleUpdateTrip
);

router.post('/:id/like', authMiddleware, handleToggleLike);

export default router;
