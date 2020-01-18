'use-strict'

import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
})

export const UserModel = model('User', userSchema)
