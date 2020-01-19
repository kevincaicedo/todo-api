import { createUser, userAuthenticate } from '../../src/services/user'

describe('user service', () => {
  test('it should create valided user', async done => {
    const user = {
      email: `htest${Date.now()}@gmail.com`,
      name: 'Kevin Caicedo',
      password: 'test 1232'
    }
    const reponse = await createUser(user)

    expect(reponse.status).toEqual(200)
    expect(reponse.error).toBeUndefined()
    expect(reponse.data.token).toBeTruthy()
    done()
  })

  test('it should not save user already registered', async done => {
    const user = {
      email: `htest${Date.now()}@gmail.com`,
      name: 'Kevin Caicedo',
      password: 'test 1232'
    }
    await createUser(user)

    const reponse = await createUser(user)
    expect(reponse.status).toEqual(401)
    expect(reponse.error).toBeTruthy()
    done()
  })

  test('it should not save user with empty field', async done => {
    const user = {
      email: `htest${Date.now()}@gmail.com`,
      password: 'test 1232'
    }

    const reponse = await createUser(user)
    expect(reponse.status).toEqual(400)
    expect(reponse.error).toBeTruthy()
    done()
  })

  test('it should auth valided user', async done => {
    const user = {
      email: `htest${Date.now()}@gmail.com`,
      name: 'Kevin Caicedo',
      password: 'test 1232'
    }
    await createUser(user)

    const reponse = await userAuthenticate(user)

    expect(reponse.status).toEqual(200)
    expect(reponse.error).toBeUndefined()
    expect(reponse.data.token).toBeTruthy()
    done()
  })
})
