import { UserModel } from '../../src/models/user'
import {
  saveUser,
  findUserByEmailAndPassword,
  findUserById
} from '../../src/repository/user'

describe('crud operation repository user', () => {
  test('it should saved one user', async done => {
    let user = UserModel({
      name: 'Kevin',
      email: `kevin${Date.now()}@gmail.com`,
      password: '12345'
    })
    user = await saveUser(user)
    expect(user).toBeTruthy()
    done()
  })

  test('it should not create one user without required fields', async done => {
    const user = UserModel({
      email: `kevin${Date.now()}@gmail.com`,
      password: '12345'
    })
    try {
      await saveUser(user)
    } catch (error) {
      expect(error).toEqual(
        new Error('User validation failed: name: Path `name` is required.')
      )
    }
    done()
  })

  test('it should saved one user', async done => {
    let user = UserModel({
      name: 'Kevin',
      email: `kevin${Date.now()}@gmail.com`,
      password: '12345'
    })
    user = await saveUser(user)
    const userFound = await findUserByEmailAndPassword(
      user.email,
      user.password
    )
    expect(userFound.name).toEqual(user.name)
    done()
  })

  test('it should saved one user', async done => {
    let user = UserModel({
      name: 'Kevin',
      email: `kevin${Date.now()}@gmail.com`,
      password: '12345'
    })
    user = await saveUser(user)
    const userFound = await findUserById(user._id)
    expect(userFound.name).toEqual(user.name)
    done()
  })
})
