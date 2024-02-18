'use strict'
import { Schema , model } from 'mongoose'

const cursoSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    teacher:{
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }
})

export default model('curso', cursoSchema)