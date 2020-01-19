'use strict'
import { connect } from 'mongoose'
import Chalk from 'chalk'

const { DB_USER, DB_PASSWD, DB_HOST, DB_PORT } = process.env
const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}`
let dbConnection

export default async () => {
  if(dbConnection) return dbConnection  
  dbConnection = await connect(mongoUrl, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
  })

  dbConnection.connection.on('connected', (_) => console.log(Chalk.green('Connected')))

  dbConnection.connection.on('error', err => {
    console.log(Chalk.bgRed('Mongoose default connection has occured ' + err + ' error'))
  })

  dbConnection.connection.on('disconnected', () => {
    console.log(Chalk.yellow('Mongoose default connection is disconnected'))
  })

  process.on('SIGINT', () => {
    dbConnection.connection.close(() => {
      process.exit(0)
    })
  })

  return dbConnection
}
