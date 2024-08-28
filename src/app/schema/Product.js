import mongoose, { mongo } from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    offer:{
        type: Boolean,
        default:false
    },
    originalname:{
        type:String,
    },
    filename:{
        type:String,
    },
    imageUrl: { 
        type: String,
    },
    category:[{
        name:{},
        originalname:{},
        filename:{}
    }],
},{timestamps:true})

export default mongoose.model('Product', ProductSchema)