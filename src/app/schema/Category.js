import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:[
        {
            originalname:{
                type:String,
            },
            filename:{
                type:String
            },
            imageUrl:{
                type:String
            }
        }
    ]
},{timestamps:true})

export default mongoose.model('Category', CategorySchema)