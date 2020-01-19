import mongooseLoader from '../src/loaders/mongoose'

let connection

beforeAll(async done => {
  connection = await mongooseLoader()
  done()
})

afterAll(async done => {
  await connection.connection.close()
  done()
})
