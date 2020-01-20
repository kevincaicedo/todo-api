'use strict'

import http from 'http'
import cors from 'cors'
import chalk from 'chalk'
import express from 'express'
import auth from 'express-jwt'
import bodyParser from 'body-parser'
import logger from 'morgan'
import fs from 'fs'
import path from 'path'

import routeUser from './api/routes/user'
import routeTask from './api/routes/task'

const port = process.env.PORT || 8000

import mongooseLoader from './loaders/mongoose'
mongooseLoader()

const app = express()
const server = http.createServer(app)
const secret = fs.readFileSync(
  path.join(__dirname, './credentials/private.key'),
  'utf8'
)

app.use(logger('combined'))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cors())

app.use('/api/user', routeUser)
app.use('/api/tasks', auth({ secret }), routeTask)

// Express Error Handler
app.use((err, req, res, next) => {
  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

function handleFatalError(err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
}

if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  server.listen(port, async () => {
    console.log(`${chalk.green('[todo:api]')} server listening on port ${port}`)
  })
}

export default server
