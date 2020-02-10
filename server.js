const express = require('express')
const next = require('next')
const cors = require('cors')
const gitApi = require('@tinacms/api-git')
const cookieParser = require('cookie-parser')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const githubForkRouter = require('./open-authoring/github/githubForkRouter')
const githubAuthRouter = require('./open-authoring/github/githubAuthRouter')

app.prepare().then(() => {
  const server = express()

  server.use(cookieParser())
  if (process.env.USE_CONTENT_API) {
    server.use(githubAuthRouter())
    server.use(githubForkRouter())
  }

  server.use(cors())
  server.use('/___tina', gitApi.router())

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
