require('dotenv').config()
require('isomorphic-fetch')

const { sql } = require('@vercel/postgres')

// iife to allow async/await
;(async () => {
  // get row count
  const { rows: rowCount } = await sql`
    SELECT COUNT(*) FROM analytics_search where vercel_env = 'production';
  `
  // print csv header
  console.log('timestamp,formatted_timestamp,session_id,search_query')

  // get results in pages of 1000
  const pages = Math.ceil(rowCount[0].count / 1000)
  for (let i = 0; i < pages; i++) {
    const { rows } = await sql`
      SELECT timestamp, session_id, search_query FROM analytics_search where vercel_env = 'production' LIMIT 1000 OFFSET ${i * 1000};
    `
    rows.forEach(row => {
      const formattedDate = new Date(Number(row.timestamp)).toISOString()
      console.log(`${row.timestamp},"${formattedDate}","${row.session_id}","${row.search_query.replace(/"/g, '\"')}"`)
    })
  }
})()
