import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import * as yup from 'yup'

import User from '../schema/User.js'

class LoginController{
    async store(req,res){
        const schema = yup.object().shape({
            email: yup.string().required().email(),
            password: yup.string().required().min(6)
        })

        try {
            await schema.validateSync(req.body,{abortEarly: false})
        } catch (err) {
            console.error(err)
            return res.status(400).json({error:err.errors})
        }

        const{email, password} = req.body

        

        if(!email||!password){
            return res.status(401).json({error:'credenciais invalidas'})
        }

        try {
            const user = await User.findOne({email})

            if (!user) {
                return res.status(401).json({ error: 'Usuário não encontrado' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Senha ou Email incorretos' });
            }

            const { _id, name, phone, admin } = user;

            const token = jwt.sign({ _id, name, email,admin}, process.env.TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRATION,
            })
            
            return res.status(200).json({token, user:{_id, name, phone, email, admin}})

        } catch (err) {
            
        }
    }
}

export default new LoginController()
