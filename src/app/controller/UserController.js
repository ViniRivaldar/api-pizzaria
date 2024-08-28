import * as yup from 'yup'

import User from '../schema/User.js'

class UserController{
    async store(req,res){
        const schema = yup.object().shape({
            name: yup.string().required(),
            phone: yup.string().required().min(11),
            email: yup.string().required().email(),
            password: yup.string().required().min(6)
        })

        try {
            await schema.validateSync(req.body,{abortEarly:false})
        } catch (err) {
            console.log(err)
            return res.status(401).json({error: err.errors})
        }

        const{name, phone, email, password, admin } = req.body

        
        try {
            const emailExist = await User.findOne({email})
    
            if (emailExist) {
                return res.status(400).json({ error: 'E-mail já cadastrado' });
            }
            
            const newUser =new User({
                name, 
                phone, 
                email, 
                password, 
                admin 
            })

            await newUser.save()

            return res.status(201).json({name, email, admin})
            
        } catch (err) {
            console.error(err)
            return res.status(400).json({error:err.errors})
        }


        
    }
    async update(req,res){
        const schema = yup.object().shape({
            name: yup.string().required(),
            phone: yup.string().required().min(11),
            email:yup.string().required().email(),
            password: yup.string().required().min(6)
        })

        try {
            await schema.validateSync(req.body,{abortEarly: false})
        } catch (err) {
            return res.status(400).json({error:err.error})
        }

        const userId = req.userId;

        const { name, phone, email, password } = req.body;

        if (!userId) {
            return res.status(401).json({ error: 'Ação não permitida' });
        }

        try {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            if (name) user.name = name;
            if (phone) user.phone = phone;
            if (email) user.email = email;
            if (password) user.password = password

            await user.save();

            return res.status(200).json({ 
                _id: user._id, 
                name: user.name, 
                email: user.email, 
                phone: user.phone,
                admin: user.admin 
            });

        } catch (err) {
            console.log(err)
            return res.status(400).json({error: err.errors})
        }
    }
    async delete(req,res){
        const userId = req.userId

        if (!userId) {
            return res.status(401).json({ error: 'Ação não permitida' });
        }

        try {
            const user = await User.findById(userId);

            if(!user){
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            await User.findByIdAndDelete(userId);

            return res.status(200).json('apagado')

        } catch (err) {
            console.log(err)
            return res.status(400).json({error:err.errors})
        }

    }
}

export default new UserController()