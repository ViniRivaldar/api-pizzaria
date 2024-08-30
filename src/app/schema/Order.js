import mongoose, { trusted } from "mongoose";

const AddressSchema = {
    district:{
        type:String,
        required: true
    },
    street:{
        type:String,
        required: true
    },
    number:{
        type:Number,
        required: true
    },
    reference_point:{
        type:String,
        required: true
    }
}

const OrderSchema = new mongoose.Schema({
    user:{
        name:{
            type:String,
            required: true,
        },
        phone:{
            type:String,
            required: true,
        },
        address:[AddressSchema]
    },
    products:[{
        name:{
            type: String,
            required:true
        },
        price:{
            type:Number,
            required: true
        },
        offer:{
            type: Boolean,
            default: false
        },
        restrition:{
            type: String,
        },
        quantity:{
            type: Number,
            required: true,
        }
    }],
    status:{
        type:String,
        required: true,
        default: 'Pedido Recebido'
    }
})

export default mongoose.model('Order',OrderSchema)