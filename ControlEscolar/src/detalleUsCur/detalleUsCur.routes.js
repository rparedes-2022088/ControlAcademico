'use strict'

import { asignarCurso, cursosAsignados } from './detalleUsCur.controller.js'
import express from 'express'

const api = express.Router()

api.post('/asignarCurso', asignarCurso)
api.get('/cursosAsignados', cursosAsignados)


export default api