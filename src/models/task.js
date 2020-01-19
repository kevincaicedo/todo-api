'use-strict'

import { Schema, model } from 'mongoose'

const taskSchema = new Schema({
  name: { type: String, required: true },
  priority: { type: String, required: true },
  state: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fecha: { type: Date, default: Date.now }
})

export const TaskModel = model('Task', taskSchema)
