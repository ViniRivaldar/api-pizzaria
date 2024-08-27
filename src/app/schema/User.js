import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    admin:{
        type:Boolean,
        default: false,
    },
    address:[{
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
    }]

},{timestamps: true})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(8);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

export default mongoose.model('User', UserSchema)