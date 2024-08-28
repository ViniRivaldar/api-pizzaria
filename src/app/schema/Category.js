import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name:{},
    originalname:{},
    filename:{},
    imageUrl:{}
},{timestamps:true})

export default mongoose.model('Category', CategorySchema)