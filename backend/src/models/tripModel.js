import { query } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

const TRIP_COLUMNS = [
  'id',
  'usuario_id',
  'titulo',
  'descricao',
  'destino',
  'tipo_viagem',
  'custo_total',
  'data_inicio',
  'data_fim',
  'fotos',
  'curtidas',
  'status',
  'created_at',
  'updated_at',
].join(', ');

export async function createTrip(trip) {
  const sql = `INSERT INTO trips (
      id,
      usuario_id,
      titulo,
      descricao,
      destino,
      tipo_viagem,
      custo_total,
      data_inicio,
      data_fim,
      fotos,
      curtidas,
      status,
      created_at,
      updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING ${TRIP_COLUMNS}`;

  const params = [
    trip.id,
    trip.usuario_id,
    trip.titulo,
    trip.descricao || null,
    trip.destino,
    trip.tipo_viagem,
    trip.custo_total,
    trip.data_inicio || null,
    trip.data_fim || null,
    trip.fotos,
    trip.curtidas ?? 0,
    trip.status || 'rascunho',
    trip.created_at,
    trip.updated_at,
  ];

  const result = await query(sql, params);
  return result.rows[0];
}

export async function findTrips({ limit, offset }) {
  const result = await query(
    `SELECT ${TRIP_COLUMNS}
     FROM trips
     ORDER BY created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return result.rows;
}

export async function countTrips() {
  const result = await query(`SELECT count(*)::int AS total FROM trips`, []);
  return result.rows[0].total;
}

export async function findTripById(id) {
  const result = await query(
    `SELECT ${TRIP_COLUMNS}
     FROM trips
     WHERE id = $1
     LIMIT 1`,
    [id]
  );
  return result.rows[0] || null;
}

export async function updateTrip(id, fields) {
  const setClauses = [];
  const values = [];
  let index = 1;

  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = $${index}`);
    values.push(value);
    index += 1;
  }

  values.push(id);
  const sql = `UPDATE trips SET ${setClauses.join(', ')}, updated_at = now() WHERE id = $${index} RETURNING ${TRIP_COLUMNS}`;
  const result = await query(sql, values);
  return result.rows[0] || null;
}

export async function isTripOwner(tripId, userId) {
  const result = await query(
    `SELECT 1 FROM trips WHERE id = $1 AND usuario_id = $2 LIMIT 1`,
    [tripId, userId]
  );
  return result.rows.length > 0;
}

export async function hasUserLikedTrip(tripId, userId) {
  const result = await query(
    `SELECT 1 FROM trip_likes WHERE trip_id = $1 AND usuario_id = $2 LIMIT 1`,
    [tripId, userId]
  );
  return result.rows.length > 0;
}

export async function addTripLike(tripId, userId) {
  const likeId = uuidv4();
  await query(
    `INSERT INTO trip_likes (id, trip_id, usuario_id) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
    [likeId, tripId, userId]
  );
  await query(`UPDATE trips SET curtidas = curtidas + 1 WHERE id = $1`, [tripId]);
}

export async function removeTripLike(tripId, userId) {
  const result = await query(
    `DELETE FROM trip_likes WHERE trip_id = $1 AND usuario_id = $2`,
    [tripId, userId]
  );

  if (result.rowCount > 0) {
    await query(`UPDATE trips SET curtidas = GREATEST(curtidas - 1, 0) WHERE id = $1`, [tripId]);
  }
}
