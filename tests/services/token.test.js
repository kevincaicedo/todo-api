import { UserModel } from '../../src/models/user'
import { saveUser } from '../../src/repository/user'

import fs from 'fs'
import path from 'path'
import auth from '../../src/services/token'

import { signOptions } from '../../src/config/sing'

const secret = fs.readFileSync(
  path.join(__dirname, '../../src/credentials/private.key'),
  'utf8'
)

describe('generate token', () => {
  test('it should generate valid token', async done => {
    let user = UserModel({
      name: 'Kevin',
      email: `kevin${Date.now()}@gmail.com`,
      password: '12345'
    })
    user = await saveUser(user)

    const { password, __v, ...userWithoutHash } = user.toJSON()
    const token = auth.sign({ ...userWithoutHash }, secret, signOptions)

    expect(token).toBeTruthy()

    const payload = auth.verify(token, secret, signOptions)
    expect(payload.email).toEqual(user.email)
    done()
  })
})
