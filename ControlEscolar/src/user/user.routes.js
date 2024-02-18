'use strict'

import { registerStudent, login, registerTeacher, deleteUser, updateUser } from './user.controller.js'
import express from 'express'
import { isUser, validateJwt} from '../middlewares/validate-jwt.js'

const api = express.Router()

api.post('/registerStudent', registerStudent)
api.post('/registerTeacher', registerTeacher)
api.post('/login', login)
api.delete('/deleteUser/:id', [validateJwt, isUser] , deleteUser)
api.put('/updateUser/:id', [validateJwt, isUser], updateUser)

export default api