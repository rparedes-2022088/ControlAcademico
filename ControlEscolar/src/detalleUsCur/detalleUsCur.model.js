'use strict'

import { Schema, model } from 'mongoose'

const detalleUsCur = Schema({
    usuario: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    curso: {
        type: Schema.ObjectId,
        ref: 'curso',
        required: true
    }
})

export default model('detalle', detalleUsCur)