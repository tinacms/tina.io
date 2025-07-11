import { sql, type VercelPoolClient } from '@vercel/postgres';
import { type NextRequest, NextResponse } from 'next/server';

// create table analytics_search (timestamp bigint, vercel_env varchar(255), session_id varchar(255), search_query text);
export async function POST(request: NextRequest) {
  const { VERCEL_ENV = 'local' } = process.env;

  try {
    const body = await request.json();
    const { timestamp, id, query } = body;

    let client: VercelPoolClient | undefined;

    try {
      client = await sql.connect();
      await client.sql`INSERT INTO analytics_search
                       VALUES (${timestamp}, ${VERCEL_ENV}, ${id}, ${query});`;

      return NextResponse.json({ message: 'ok' }, { status: 200 });
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { message: 'internal server error' },
        { status: 500 },
      );
    } finally {
      client?.release();
    }
  } catch (e) {
    return NextResponse.json(
      { message: 'invalid request body' },
      { status: 400 },
    );
  }
}
