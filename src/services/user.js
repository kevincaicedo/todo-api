'use strict'

import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import auth from './token'

import bcrypt from 'bcrypt'

import { signOptions } from '../config/sing'
import { findUserByEmail, saveUser } from '../repository/user'
import { UserModel } from '../models/user'

const secret = fs.readFileSync(
  path.join(__dirname, '../credentials/private.key'),
  'utf8'
)

const saltRounds = 13

export const userAuthenticate = async ({ email, password }) => {
  const userPassword = password

  try {
    const user = await findUserByEmail(email)

    if (!user || !bcrypt.compareSync(userPassword, user.password))
      return {
        status: 401,
        error: 'Credenciales no valida'
      }

    const { password, __v, ...userWithoutHash } = user.toJSON()
    const token = auth.sign({ ...userWithoutHash }, secret, signOptions)
    return {
      status: 200,
      data: {
        ...userWithoutHash,
        token
      }
    }
  } catch (error) {
    console.log(`${chalk.red('[kevincaicedo:api:token:generate]')} ${e}`)
    return {
      status: 500,
      error: 'Ocurrio un error validando la autenticacion'
    }
  }
}

export const createUser = async ({ name, email, password }) => {
  const userPassword = password
  if (!password || !email || !name)
    return {
      status: 400,
      error: 'Hay campos vacios'
    }

  try {
    const user = await findUserByEmail(email)
    if (user) return { status: 401, error: 'Usuario ya registrado' }

    const hashPassword = bcrypt.hashSync(userPassword, saltRounds)
    const userSaved = await saveUser(
      UserModel({ name, email, password: hashPassword })
    )

    if (!userSaved)
      return {
        status: 400,
        error: 'Usuario no registrado valida los campos'
      }

    const { password, __v, ...userWithoutHash } = userSaved.toJSON()
    const token = auth.sign({ ...userWithoutHash }, secret, signOptions)
    return {
      status: 200,
      data: {
        ...userWithoutHash,
        token
      }
    }
  } catch (error) {
    console.log(`${chalk.red('[kevincaicedo:api:token:generate]')} ${error}`)
    return {
      status: 500,
      error: 'Ocurrio un error creando al usuario'
    }
  }
}
