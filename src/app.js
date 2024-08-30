import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotevn from 'dotenv';
dotevn.config()

import './database/index.js'
import UserRouter from './app/routes/UserRoutes.js'
import LoginRouter from './app/routes/LoginRoutes.js'
import AddressRouter from './app/routes/AddressRoutes.js'
import ProductRoutes from './app/routes/ProductRoutes.js'
import CategoryRoutes from './app/routes/CategoryRoutes.js'
import OrderRoutes from './app/routes/OrderRoutes.js'


class App{
    constructor(){
        this.app = express()
        this.middleware()
        this.routes()
    }

    middleware(){
        this.app.use(cors())
        this.app.use(helmet())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(express.json())
    }

    routes(){
        this.app.use('/users/',UserRouter)
        this.app.use('/login/',LoginRouter)
        this.app.use('/address/',AddressRouter)
        this.app.use('/product/',ProductRoutes)
        this.app.use('/category/',CategoryRoutes)
        this.app.use('/order/',OrderRoutes)
       
    }
}

export default new App().app