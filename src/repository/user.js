import { UserModel } from '../models/user'

export const saveUser = async user => {
  const userSaved = await UserModel.create(user)
  return userSaved
}

export const findUserById = async userId => {
  const userSaved = await UserModel.findById(userId)
  return userSaved
}

export const findUserByEmailAndPassword = async (email, password) => {
  const userFound = await UserModel.findOne({
    email: email,
    password: password
  }).exec()
  return userFound
}
