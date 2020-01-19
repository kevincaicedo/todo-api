'use strict'

import http from 'http'
import cors from 'cors'
import chalk from 'chalk'
import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'

import routeUser from './api/routes/user'

const port = process.env.PORT || 8000

import mongooseLoader from './loaders/mongoose'
mongooseLoader()

const app = express()
const server = http.createServer(app)

app.use(logger('combined'))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cors())

app.use('/api/user', routeUser)

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
