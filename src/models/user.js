'use-strict'

import { Schema, model } from 'mongoose'
import { emailValidator } from '../validator/user'

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: email => emailValidator(email),
      message: 'Email validation failed'
    }
  },
  password: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now }
})

export const UserModel = model('User', userSchema)
