import request from 'supertest'
import app from '../../src/index'

describe('user api', () => {
  it('should create a new user', async done => {
    const user = {
      email: `htest${Date.now()}@gmail.com`,
      name: 'Kevin Caicedo',
      password: 'test 1232'
    }

    const res = await request(app)
      .post('/api/user/create')
      .send(user)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('token')
    done()
  })

  it('should auth valid user', async done => {
    const user = {
      email: `htest${Date.now()}@gmail.com`,
      name: 'Kevin Caicedo',
      password: 'test 1232'
    }

    const res = await request(app)
      .post('/api/user/create')
      .send(user)

    const resAuth = await request(app)
      .post('/api/user/auth')
      .send(user)

    expect(resAuth.statusCode).toEqual(200)
    expect(res.name).toEqual(resAuth.name)
    expect(resAuth.body).toHaveProperty('token')
    done()
  })
})
