import * as yup from 'yup'
import multer from 'multer';

import Product from "../schema/Product.js"
import User from '../schema/User.js'
import uploadImage from '../../services/Firebase.js';
import multerConfig from '../../config/multerConfig.js';

const uploads = multer(multerConfig).single('foto');

class ProductController{
    async store(req, res) {
        // Primeiro, usa o middleware de upload do Multer
        uploads(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            // Agora, usa o middleware para upload no Firebase
            uploadImage(req, res, async () => {
                const schema = yup.object().shape({
                    name: yup.string().required(),
                    description: yup.string().required(),
                    price: yup.number().required(),
                    offer: yup.boolean()
                });

                try {
                    await schema.validateSync(req.body, { abortEarly: false });
                } catch (err) {
                    console.log(err);
                    return res.status(400).json({ error: err.errors });
                }

                try {
                    const { userId } = req;
                    const user = await User.findById(userId);

                    if (!user || !user.admin) {
                        return res.status(403).json({ error: "Access denied. Admins only." });
                    }

                    const { name, description, price, offer } = req.body;
                    const { firebaseUrl } = req.file || {}; // Obtém a URL da imagem do Firebase

                    const product = await Product.create({
                        name,
                        description,
                        price,
                        offer,
                        filename: req.file?.filename,
                        originalname: req.file?.originalname,
                        imageUrl: firebaseUrl
                    });

                    const { _id } = product;

                    return res.status(201).json({ _id, name, description, price, offer, imageUrl: firebaseUrl });

                } catch (err) {
                    return res.status(500).json({ error: "Error creating product." });
                }
            });
        });
    }
    async index(req,res){
        try {
            const products = await Product.find(); 
      
            return res.status(200).json(products); 
        } catch (err) {
            console.error("Error fetching products:", err);
            return res.status(500).json({ error: "Error fetching products." }); 
        }
    }
    async show(req,res){
        try {
            const { id } = req.params; 

      
            const product = await Product.findById(id); 
      
            if (!product) {
              return res.status(404).json({ error: "Product not found." }); 
            }
      
            return res.status(200).json(product); 
        } catch (err) {
            console.error("Error fetching product:", err); 
            return res.status(500).json({ error: "Error fetching product." }); 
        }
    }
    async update(req,res){
        const schema = yup.object().shape({
            name: yup.string(),
            description: yup.string(),
            price: yup.number(),
            offer: yup.boolean()
        });

        try {
            await schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: err.errors });
        }

        try {
            const { userId } = req;
            const user = await User.findById(userId);

            if (!user || !user.admin) {
                return res.status(403).json({ error: "Access denied. Admins only." });
            }

            const { id } = req.params;
            const { name, description, price, offer } = req.body;

            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).json({ error: "Product not found." });
            }

            
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.offer = offer !== undefined ? offer : product.offer;

            await product.save();

            return res.status(200).json(product);
        } catch (err) {
            console.error("Error updating product:", err);
            return res.status(500).json({ error: "Error updating product." });
        }
    }
    async delete(req,res){
        try {
            const { userId } = req;
            const user = await User.findById(userId);

            if (!user || !user.admin) {
                return res.status(403).json({ error: "Access denied. Admins only." });
            }

            const { id } = req.params;
            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).json({ error: "Product not found." });
            }

            await Product.findByIdAndDelete(id);

            return res.status(200).json({ message: "Product deleted successfully." });

        } catch (err) {
            console.error("Error deleting product:", err);
            return res.status(500).json({ error: "Error deleting product." });
        }
    }
    
}

export default new ProductController()