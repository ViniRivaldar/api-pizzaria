import mongoose from "mongoose";

const AddressSchema = mongoose.Schema({
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
}, { _id: false })

const OrderSchema = mongoose.Schema({
    user:{
        name:{
            type: String,
            required: true
        },
        phone:{
            type: String,
            required: true
        },
        address:[AddressSchema]
    },
    product:[{
        name:{
            type: String,
            required:true
        },
        restrition:{
            type: String,
        },
        price:{
            type: Number,
            required:true
        },
        offer:{
            type: Boolean,
            default:false
        },
    },{ _id: false }],
    quantity:{
        type: Number,
        default: 1
    },
    total:{
        type:Number,
    },
    status:{
        type: String,
        default: 'pedido recebido'
    }

},{timestamps: true})

export default mongoose.model('Order', OrderSchema)