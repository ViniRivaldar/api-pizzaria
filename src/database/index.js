import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

import app from "../app.js";

class Database{
    constructor(){
        this.init()
    }

    init(){
        this.connection = mongoose.connect(process.env.CONNECTIONSTRING)
        .then(()=>{
            app.emit('pronto')
        })
        .catch(e=>{
            console.log('erro de ' + e)
        })
    }
}

export default new Database()