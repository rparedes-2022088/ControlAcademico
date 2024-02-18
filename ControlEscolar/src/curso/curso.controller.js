'use strict'
import Curso from '../curso/curso.model.js'
import User from '../user/user.model.js'
import jwt from 'jsonwebtoken'
import Detalle from '../detalleUsCur/detalleUsCur.model.js'

export const test = (req, res)=>{
    return res.send({message: 'Function test is running | Curso'})
}

export const newCurso = async(req, res)=>{
    try{
        let data = req.body
        let teacher = await User.findOne({_id: data.teacher})
        if(!teacher || teacher.role === 'STUDENT') return res.status(404).send({message: 'Teacher not found, or not are a teacher'})
        let curso = new Curso(data)
        await curso.save()
        return res.send({message: 'Course saved succesfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saving course', err})
    }
}

export const deleteCurso = async(req, res)=>{
    try{
        let { id } = req.params
        let deletedCurso = await Curso.findOneAndDelete({_id: id})
        if(!deletedCurso) return res.status(404).send({message: 'Curso not found and not deleted'})
        let eliminarAsignacion = await Detalle.findOneAndDelete({curso: id})
        return res.send({message: `Curso ${deletedCurso.name} deleted`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting course'})
    }
}

export const editarCurso = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let updatedCourse = await Curso.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedCourse) return res.status(401).send({message: 'Course not found and not updated'})
        return res.send({message: 'Updated course', updatedCourse})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating course'})
    }
}

//Ver las clases que creo el profesor
export const verMisClases = async(req, res)=>{
    try{
        let secretKey = process.env.SECRET_KEY
        let { token } = req.headers
        if(!token) return res.status(401).send({message: 'Unauthorized'})
        let { uid } = jwt.verify(token, secretKey)
        let cursos = await Curso.find({teacher: uid})
        if(!cursos) return res.status(404).send({message: 'El profesor no tiene cursos a cargo'})
        return res.send({ cursos })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error viewing courses'})
    }
}