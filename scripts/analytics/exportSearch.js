require('dotenv').config()
require('isomorphic-fetch')

const { sql } = require('@vercel/postgres')

// iife to allow async/await
;(async () => {
  const { rows } = await sql`
    SELECT * FROM analytics_search;
  `
  console.log(JSON.stringify(rows, null, 2))
})()
