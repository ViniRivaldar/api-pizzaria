import multer from 'multer';
import * as yup from 'yup'

import Category from '../schema/Category.js'
import User from '../schema/User.js'


class CategoryController{
    async store(req,res){
        const schema = yup.object().shape({
            name: yup.string().required()
        })

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

            const{name}= req.body
    

            const category = await Category.create({
                name,
            
            });

            const { _id } = category;

            return res.status(201).json({ _id, name });
        } catch (err) {
            console.log(err)
            return res.status(500).json({error:err.errors})
        }
    }
    async index(req,res){
        try {
            const category = await Category.find(); 
      
            return res.status(200).json(category); 
        } catch (err) {
            console.error("Error fetching category:", err);
            return res.status(500).json({ error: "Error fetching category." }); 
        }
    }
    async update(req, res) {
           
        const schema = yup.object().shape({
            name: yup.string(),
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
            const category = await Category.findById(id);

            if (!category) {
                return res.status(404).json({ error: "Category not found." });
            }

            const { name } = req.body;

            category.name = name;

            await category.save();

            return res.status(200).json(category);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
        
    }
    async delete(req, res) {
        try {
            const { userId } = req;
            const user = await User.findById(userId);
    
            if (!user || !user.admin) {
                return res.status(403).json({ error: "Access denied. Admins only." });
            }
    
            const { id } = req.params;
            const category = await Category.findById(id);
    
            if (!category) {
                return res.status(404).json({ error: "Category not found." });
            }
    
            await Category.findByIdAndDelete(id);
    
            return res.status(200).json({ message: "Category deleted successfully." });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
    }
    
}

export default new CategoryController()