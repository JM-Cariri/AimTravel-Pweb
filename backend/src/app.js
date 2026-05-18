import express from 'express';
import authRoutes from './routes/authRoutes.js';
import { errorResponse } from './utils/response.js';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

app.use((req, res) => {
  return errorResponse(res, 404, 'NOT_FOUND', 'Rota não encontrada');
});

app.use((err, req, res, next) => {
  console.error(err);
  return errorResponse(res, 500, 'INTERNAL_SERVER_ERROR', 'Erro interno do servidor');
});

export default app;
