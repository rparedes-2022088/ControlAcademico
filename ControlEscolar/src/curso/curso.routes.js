'use strict'

import { Router } from 'express'
import { test, newCurso, deleteCurso, editarCurso, verMisClases } from './curso.controller.js'
import { validateJwt, isTeacher, isInChargeTeacher } from '../middlewares/validate-jwt.js'

const api = Router()

api.get('/test', test)
api.post('/newCurso', [validateJwt, isTeacher], newCurso)
api.delete('/deleteCurso/:id', [validateJwt, isTeacher /*isInChargeTeacher*/], deleteCurso)
api.put('/editarCurso/:id', [validateJwt, isTeacher /*isInChargeTeacher*/], editarCurso)
api.get('/verMisClases', [validateJwt, isTeacher], verMisClases)

export default api