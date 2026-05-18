import { query } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export async function createTouristSpots(tripId, spots) {
  if (!Array.isArray(spots) || spots.length === 0) {
    return [];
  }

  const values = spots.map((spot) => [
    uuidv4(),
    tripId,
    spot.nome,
    spot.cidade || null,
    spot.pais || null,
    spot.descricao || null,
    spot.categoria || null,
    spot.latitude ?? null,
    spot.longitude ?? null,
    new Date(),
    new Date(),
  ]);

  const flatValues = values.flat();
  const placeholders = values
    .map(
      (_, index) => `($${index * 11 + 1}, $${index * 11 + 2}, $${index * 11 + 3}, $${index * 11 + 4}, $${index * 11 + 5}, $${index * 11 + 6}, $${index * 11 + 7}, $${index * 11 + 8}, $${index * 11 + 9}, $${index * 11 + 10}, $${index * 11 + 11})`
    )
    .join(', ');

  const sql = `INSERT INTO tourist_spots (
    id,
    trip_id,
    nome,
    cidade,
    pais,
    descricao,
    categoria,
    latitude,
    longitude,
    created_at,
    updated_at
  ) VALUES ${placeholders}`;

  await query(sql, flatValues);
  return spots.map((spot, index) => ({
    id: values[index][0],
    trip_id: tripId,
    ...spot,
    created_at: values[index][9],
    updated_at: values[index][10],
  }));
}

export async function findTouristSpotsByTripId(tripId) {
  const result = await query(
    `SELECT id, trip_id, nome, cidade, pais, descricao, categoria, latitude, longitude, created_at, updated_at
     FROM tourist_spots
     WHERE trip_id = $1
     ORDER BY created_at ASC`,
    [tripId]
  );
  return result.rows;
}

export async function deleteTouristSpotsByTripId(tripId) {
  await query(`DELETE FROM tourist_spots WHERE trip_id = $1`, [tripId]);
}
