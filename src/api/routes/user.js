'use strict'

import express from 'express'
import { authenticate, create } from '../controllers/user'

const route = express.Router()

route.post('/auth', authenticate)
route.post('/create', create)

export default route
