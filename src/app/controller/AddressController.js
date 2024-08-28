import * as yup from 'yup'

import User from '../schema/User.js'


class AddressController{
    async store(req,res){
        const schema = yup.object().shape({
            district: yup.string().required(),
            street: yup.string().required(),
            number: yup.number().required(),
            reference_point: yup.string().required(),
        })

        try {
            await schema.validateSync(req.body, {abortEarly:true})
        } catch (err) {
            console.log(err)
            return res.status(400).json({error:err.errors})
        }

        const { district, street, number, reference_point } = req.body;
        const userId = req.userId

        try {
            
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            user.address.push({
                district,
                street,
                number,
                reference_point,
            });

            await user.save();

            return res.status(201).json({
                userId: user._id,
                address: user.address[user.address.length - 1],
            });

        } catch (err) {
            console.log(err)
            return res.status(400).json({error:err.errors})
        }
    }
    async show(req, res) {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Usuário não autenticado' });
        }

        try {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            return res.status(200).json({address: user.address,});
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao recuperar endereços' });
        }
    }
    async update(req,res){
        const schema = yup.object().shape({
            addressId: yup.string().required(), 
            district: yup.string().required(),
            street: yup.string().required(),
            number: yup.number().required(),
            reference_point: yup.string().required(),
        });
    
        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ error: err.errors });
        }
    
        const { addressId, district, street, number, reference_point } = req.body;
        const userId  = req.userId;
    
        if (!userId) {
            return res.status(401).json({ error: 'Usuário não autenticado' });
        }
    
        try {
            
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
    
            
            const address = user.address.id(addressId);
    
            if (!address) {
                return res.status(404).json({ error: 'Endereço não encontrado' });
            }
    
            
            address.district = district;
            address.street = street;
            address.number = number;
            address.reference_point = reference_point;
    
            await user.save();
    
            return res.status(200).json({
                message: 'Endereço atualizado com sucesso',
                address
            });
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erro ao atualizar o endereço' });
        }
    }
    async delete(req,res){
        const schema = yup.object().shape({
            index: yup.number().required(), 
        });

        try {
           
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ error: err.errors });
        }

        const { index } = req.body;
        const { userId } = req;

        if (!userId) {
            return res.status(401).json({ error: 'Usuário não autenticado' });
        }

        try {
            
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            
            if (index < 0 || index >= user.address.length) {
                return res.status(404).json({ error: 'Endereço não encontrado' });
            }

            
            user.address.splice(index, 1);

            await user.save();

            return res.status(200).json({ message: 'Endereço excluído com sucesso' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao excluir o endereço' });
        }

    }
}

export default new AddressController()