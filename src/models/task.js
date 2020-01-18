'use-strict'

import { Schema, model } from 'mongoose'

const taskSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  priority: String,
  state: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  fecha: { type: Date, default: Date.now }
})

export const TaskModel = model('Task', taskSchema)
