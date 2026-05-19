import { validationResult } from 'express-validator';
import {
  createTripEntry,
  listTrips,
  getTripById,
  updateTripEntry,
  toggleTripLike,
} from '../services/tripService.js';
import { successResponse, errorResponse } from '../utils/response.js';

function buildValidationErrors(result) {
  return result.array().map((item) => `${item.param}: ${item.msg}`).join(', ');
}

export async function handleCreateTrip(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, 'VALIDATION_ERROR', buildValidationErrors(errors));
  }

  try {
    const payload = await createTripEntry(req.user.id, req.body);
    return successResponse(res, payload, 'Relato criado com sucesso.');
  } catch (err) {
    const status = err.code === 'VALIDATION_ERROR' ? 400 : 500;
    const code = err.code || 'CREATE_TRIP_ERROR';
    return errorResponse(res, status, code, err.message);
  }
}

export async function handleListTrips(req, res) {
  try {
    const result = await listTrips({ page: req.query.page, limit: req.query.limit });
    return successResponse(res, result, 'Lista de relatos carregada com sucesso.');
  } catch (err) {
    return errorResponse(res, 500, 'LIST_TRIPS_ERROR', err.message);
  }
}

export async function handleGetTripById(req, res) {
  try {
    const result = await getTripById(req.params.id);
    return successResponse(res, result, 'Relato carregado com sucesso.');
  } catch (err) {
    const status = err.code === 'NOT_FOUND' ? 404 : 500;
    const code = err.code || 'GET_TRIP_ERROR';
    return errorResponse(res, status, code, err.message);
  }
}

export async function handleUpdateTrip(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, 'VALIDATION_ERROR', buildValidationErrors(errors));
  }

  try {
    const result = await updateTripEntry(req.params.id, req.user.id, req.body);
    return successResponse(res, result, 'Relato atualizado com sucesso.');
  } catch (err) {
    const status = err.code === 'FORBIDDEN' ? 403 : err.code === 'NOT_FOUND' ? 404 : err.code === 'VALIDATION_ERROR' ? 400 : 500;
    const code = err.code || 'UPDATE_TRIP_ERROR';
    return errorResponse(res, status, code, err.message);
  }
}

export async function handleToggleLike(req, res) {
  try {
    const result = await toggleTripLike(req.params.id, req.user.id);
    return successResponse(res, result, result.liked ? 'Relato curtido.' : 'Curtida removida.');
  } catch (err) {
    const status = err.code === 'NOT_FOUND' ? 404 : 500;
    const code = err.code || 'TOGGLE_LIKE_ERROR';
    return errorResponse(res, status, code, err.message);
  }
}
