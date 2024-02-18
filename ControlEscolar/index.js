import { initServer } from './configs/app.js'
import { connect } from './configs/mongo.js'
import { encrypt } from './src/utils/validator.js'
import User from './src/user/user.model.js'

const profeDefecto = async()=>{
    try{
        const data = {
            name: 'Josue',
            surname: 'Noj',
            username: 'jnoj',
            password: await encrypt('12345678'),
            phone: '12345678',
            address: 'Fundación kinal',
            role: 'TEACHER'
        }
        let user = new User(data)
        await user.save()
    }catch(err){
        console.error(err)
        console.log('El profesor por defecto ya esta creado')
    }
}

initServer()
connect()
profeDefecto()

