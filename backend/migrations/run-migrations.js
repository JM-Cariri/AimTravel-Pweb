import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = path.resolve(__dirname);
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.sql'))
    .sort();

  if (!files.length) {
    console.log('Nenhuma migration encontrada.');
    process.exit(0);
  }

  const client = await pool.connect();

  try {
    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf-8');
      console.log(`Executando migration ${file}...`);
      await client.query(sql);
    }
    console.log('Migrations executadas com sucesso.');
  } catch (err) {
    console.error('Falha ao executar migrations:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
