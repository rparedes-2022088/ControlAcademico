import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'
import Curso from '../curso/curso.model.js'

export const validateJwt = async(req, res, next)=>{
    try{
        //Obtener la llave de acceso al token
        let secretKey = process.env.SECRET_KEY
        //Obtener el token de los headers
        let { token } = req.headers
        //Verificar si viene el token
        if(!token) return res.status(401).send({message: 'Unauthorized'})
        //Obtener el uid que envió el token
        let { uid } = jwt.verify(token, secretKey)
        //Validar si el usuario aún existe en la DB
        let user = await User.findOne({_id: uid})
        if(!user) return res.status(404).send({message: 'User not found - Unauthorized'})
        //Ok al Middleware
        req.user = user
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Invalid token or expired'})
    }
}

export const isTeacher = async(req, res, next)=>{
    try{
        let { role, username } = req.user
        if(!role || role !== 'TEACHER') res.status(403).send({message: `You dont have access | username ${username}`})
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Unauthorized role'})
    }
}

export const isStudent = async(req, res, next)=>{
    try{
        let { role, username } = req.user
        if(!role || role !== 'STUDENT') res.status(403).send({message: `You dont have access | username ${username}`})
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Unauthorized role'})
    }
}

export const isUser = async(req, res, next)=>{
    try{
        let { id } = req.params
        let { _id } = req.user
        if(id != _id) return res.status(403).send({message: 'You are not the modified user'})
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Unauthorized'})
    }
}

export const isInChargeTeacher = async(req, res, next)=>{
    try{
        let { id } = req.params //id del curso
        let { _id } = req.user
        let { teacher } = await Curso.findOne({_id: id})
        if(teacher != _id) return res.status(403).send({message: 'You are not the teacher in charge of the course'})
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Unauthorized'})
    }
}