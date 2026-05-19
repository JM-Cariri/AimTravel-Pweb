import { v4 as uuidv4 } from 'uuid';
import {
  createTrip,
  findTrips,
  countTrips,
  findTripById,
  updateTrip,
  isTripOwner,
  hasUserLikedTrip,
  addTripLike,
  removeTripLike,
} from '../models/tripModel.js';
import {
  createTouristSpots,
  findTouristSpotsByTripId,
  deleteTouristSpotsByTripId,
} from '../models/touristSpotModel.js';

const VALID_TRIP_TYPES = ['aerea', 'terrestre', 'maritima'];

function normalizePhotos(fotos) {
  return Array.isArray(fotos) ? fotos.map((photo) => photo.trim()).filter(Boolean) : [];
}

export async function createTripEntry(userId, payload) {
  const fotos = normalizePhotos(payload.fotos);
  if (!fotos.length) {
    const error = new Error('É necessário enviar pelo menos 1 foto.');
    error.code = 'VALIDATION_ERROR';
    throw error;
  }

  if (payload.custo_total == null || Number(payload.custo_total) <= 0) {
    const error = new Error('Custo total deve ser maior que zero.');
    error.code = 'VALIDATION_ERROR';
    throw error;
  }

  if (!VALID_TRIP_TYPES.includes(payload.tipo_viagem)) {
    const error = new Error('Tipo de viagem inválido.');
    error.code = 'VALIDATION_ERROR';
    throw error;
  }

  const trip = await createTrip({
    id: uuidv4(),
    usuario_id: userId,
    titulo: payload.titulo.trim(),
    descricao: payload.descricao?.trim() || null,
    destino: payload.destino.trim(),
    tipo_viagem: payload.tipo_viagem,
    custo_total: payload.custo_total,
    data_inicio: payload.data_inicio || null,
    data_fim: payload.data_fim || null,
    fotos,
    status: payload.status || 'publicado',
    created_at: new Date(),
    updated_at: new Date(),
  });

  const spots = await createTouristSpots(trip.id, payload.pontos_turisticos || []);
  return {
    ...trip,
    pontos_turisticos: spots,
  };
}

export async function listTrips({ page = 1, limit = 10 }) {
  const parsedPage = Math.max(Number(page) || 1, 1);
  const parsedLimit = Math.min(Math.max(Number(limit) || 10, 1), 50);
  const offset = (parsedPage - 1) * parsedLimit;

  const [trips, total] = await Promise.all([
    findTrips({ limit: parsedLimit, offset }),
    countTrips(),
  ]);

  return {
    trips,
    meta: {
      page: parsedPage,
      limit: parsedLimit,
      total,
      totalPages: Math.ceil(total / parsedLimit),
    },
  };
}

export async function getTripById(tripId) {
  const trip = await findTripById(tripId);
  if (!trip) {
    const error = new Error('Relato não encontrado.');
    error.code = 'NOT_FOUND';
    throw error;
  }

  const pontos_turisticos = await findTouristSpotsByTripId(tripId);
  return {
    ...trip,
    pontos_turisticos,
  };
}

export async function updateTripEntry(tripId, userId, payload) {
  const isOwner = await isTripOwner(tripId, userId);
  if (!isOwner) {
    const error = new Error('Somente o autor pode editar este relato.');
    error.code = 'FORBIDDEN';
    throw error;
  }

  const fields = {};
  if (payload.titulo) fields.titulo = payload.titulo.trim();
  if (payload.descricao !== undefined) fields.descricao = payload.descricao.trim();
  if (payload.destino) fields.destino = payload.destino.trim();
  if (payload.tipo_viagem) {
    if (!VALID_TRIP_TYPES.includes(payload.tipo_viagem)) {
      const error = new Error('Tipo de viagem inválido.');
      error.code = 'VALIDATION_ERROR';
      throw error;
    }
    fields.tipo_viagem = payload.tipo_viagem;
  }
  if (payload.custo_total !== undefined) {
    if (Number(payload.custo_total) <= 0) {
      const error = new Error('Custo total deve ser maior que zero.');
      error.code = 'VALIDATION_ERROR';
      throw error;
    }
    fields.custo_total = payload.custo_total;
  }
  if (payload.data_inicio !== undefined) fields.data_inicio = payload.data_inicio || null;
  if (payload.data_fim !== undefined) fields.data_fim = payload.data_fim || null;
  if (payload.fotos !== undefined) {
    const fotos = normalizePhotos(payload.fotos);
    if (!fotos.length) {
      const error = new Error('É necessário enviar pelo menos 1 foto.');
      error.code = 'VALIDATION_ERROR';
      throw error;
    }
    fields.fotos = fotos;
  }
  if (payload.status) fields.status = payload.status;

  if (!Object.keys(fields).length && payload.pontos_turisticos === undefined) {
    const error = new Error('Nenhum campo para atualizar.');
    error.code = 'VALIDATION_ERROR';
    throw error;
  }

  let trip = null;
  if (Object.keys(fields).length) {
    trip = await updateTrip(tripId, fields);
  } else {
    trip = await findTripById(tripId);
  }

  if (payload.pontos_turisticos !== undefined) {
    await deleteTouristSpotsByTripId(tripId);
    await createTouristSpots(tripId, payload.pontos_turisticos || []);
  }

  const pontos_turisticos = await findTouristSpotsByTripId(tripId);
  return {
    ...trip,
    pontos_turisticos,
  };
}

export async function toggleTripLike(tripId, userId) {
  const trip = await findTripById(tripId);
  if (!trip) {
    const error = new Error('Relato não encontrado.');
    error.code = 'NOT_FOUND';
    throw error;
  }

  const alreadyLiked = await hasUserLikedTrip(tripId, userId);
  if (alreadyLiked) {
    await removeTripLike(tripId, userId);
    return { liked: false };
  }

  await addTripLike(tripId, userId);
  return { liked: true };
}
