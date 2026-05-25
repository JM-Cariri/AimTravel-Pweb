import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import { errorResponse } from './utils/response.js';

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

app.use((req, res) => {
  return errorResponse(res, 404, 'NOT_FOUND', 'Rota não encontrada');
});

app.use((err, req, res, next) => {
  console.error(err);
  return errorResponse(res, 500, 'INTERNAL_SERVER_ERROR', 'Erro interno do servidor');
});

export default app;
