import {sql, VercelPoolClient} from '@vercel/postgres'

// create table analytics_search (timestamp bigint, vercel_env varchar(255), session_id varchar(255), search_query text);
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'method not allowed' });
    return;
  }
  const { VERCEL_ENV = 'local'} = process.env;
  const {
    timestamp,
    id,
    query,
  } = req.body;
  let client: VercelPoolClient | undefined
  try {
    client = await sql.connect();
    await client.sql`INSERT INTO analytics_search
                     VALUES (${timestamp}, ${VERCEL_ENV}, ${id}, ${query});`;
    res.status(200).json({message: 'ok'});
  } catch (e) {
    console.error(e);
    res.status(500).json({message: 'internal server error'});
  } finally {
    client?.release();
  }
}
