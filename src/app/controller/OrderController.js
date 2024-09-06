import * as yup from 'yup'

import Order from '../schema/Order.js'
import Product from '../schema/Product.js'
import User from '../schema/User.js'

class OrderController{
    async store(req, res) {
        const schema = yup.object().shape({
            products: yup.array().required().of(
                yup.object().shape({
                    id: yup.string().required(),
                    quantity: yup.number().required(),
                    restrition: yup.string(), 
                })
            ),
            total: yup.number().required()
        });

        try {
            await schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const productsId = req.body.products.map((product) => product.id);

        const updateProducts = await Product.find({
            _id: { $in: productsId },
        }).select('name price offer');

        const editedProduct = updateProducts.map((product, index) => {
            return {
                name: product.name,
                price: product.price,
                offer: product.offer,
                restrition: req.body.products[index].restrition, 
                quantity: req.body.products[index].quantity,
            };
        });

        const user = await User.findById(req.userId).select('name phone address');

        const order = {
            user: {
                name: user.name,
                phone: user.phone,
                address: user.address,
            },
            products: editedProduct,
            status: 'Pedido Recebido',
        };

        const orderResponse = await Order.create(order);

        return res.status(201).json(orderResponse);
    }

    async update(req, res) {
        const schema = yup.object().shape({
            status: yup.string().required()
        });

        try {
            await schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { id } = req.params;
        const { status } = req.body;

        try {
            await Order.updateOne({ _id: id }, { status });

        } catch (err) {
            return res.status(400).json({ error: err.message });
        }

        return res.status(200).json({ message: 'Status atualizado com sucesso', status });
    }

    async index(req,res){
        const orders = await Order.find()
        return res.json(orders)
    }

    async show(req, res) {
        const { id } = req.params;

        try {
            const order = await Order.findById(id);
            if (!order) {
                return res.status(404).json({ error: 'Pedido não encontrado' });
            }
            return res.json(order);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async delete(req, res) {
        const { id } = req.params;

        try {
            const order = await Order.findByIdAndDelete(id);
            if (!order) {
                return res.status(404).json({ error: 'Pedido não encontrado' });
            }
            return res.status(200).json({ message: 'Pedido deletado com sucesso' });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export default new OrderController()
