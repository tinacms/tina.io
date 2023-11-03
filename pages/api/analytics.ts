import { sql } from '@vercel/postgres'

// create table analytics_search (timestamp bigint, vercel_env varchar(255), session_id varchar(255), search_query text);
export default async function handler(req, res) {
  const { VERCEL_ENV = 'local'} = process.env;
  const {
    timestamp,
    id,
    query,
  } = req.body;
  const client = await sql.connect();
  await client.sql`INSERT INTO analytics_search VALUES (${timestamp}, ${VERCEL_ENV}, ${id}, ${query});`;
  client.release();
  res.status(200).json({ message: 'ok' });
}
