'use strict'

import Detalle from './detalleUsCur.model.js'
import User from '../user/user.model.js'
import Curso from '../curso/curso.model.js'
import jwt from 'jsonwebtoken'

//el unico dato que recibe es el id del curso al que se quiere asignar, el id del alumno lo obtiene a traves del token asignado al logearse
export const asignarCurso = async(req, res)=>{
    try{
        let data = req.body

        let usuario = await User.find({_id: data.usuario})
        let curso = await Curso.find({_id: data.curso})
        if(!usuario || usuario.role === 'TEACHER') return res.status(404).send({message: 'Student not found, not assigned'})
        if(!curso) return res.status(404).send({message: 'Curso no encontrado, no guardado'})

        let userCourses = await Detalle.find({_id: data.usuario})
        let alumnoCursos = await Detalle.findOne({usuario: data.usuario, curso: data.curso})
        if(userCourses.lenght >= 3){
            return res.status(400).send({message: 'Ya esta asignado a 3 cursos, no puede asignarse a más'});
        }
        if(alumnoCursos) return res.status(400).send({message: 'El alumno ya está asignado a ese curso'})

        let detalleCur = new Detalle(data)
        await detalleCur.save()
        return res.send({message: 'Alumno asignado satisfactoriamente'})

    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error assigning course'})
    }
}

//Ver cursos a los que esta asignado un alumno, por medio de id que se obtiene por el token de logeo
export const cursosAsignados = async(req, res)=>{
    try{
        let secretKey = process.env.SECRET_KEY
        let { token } = req.headers
        if(!token) return res.status(401).send({message: 'Unauthorized'})
        let { uid } = jwt.verify(token, secretKey)
        let user = await User.findOne({_id: uid})
        if(!user) return res.status(404).send({message: 'User not found - Unauthorized'})
        let cursos = await Detalle.find({usuario: uid})
        return res.send({ cursos })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error viewing courses'})
    }
}