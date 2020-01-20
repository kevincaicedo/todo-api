'use strict'

import express from 'express'
import {
  createTask,
  updateTask,
  deleteTask,
  getAllTaskByUser
} from '../controllers/task'

const route = express.Router()

route.post('/', createTask)
route.put('/', updateTask)
route.delete('/:id', deleteTask)
route.get('/', getAllTaskByUser)

export default route
