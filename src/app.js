import express from 'express'

import './database/index.js'
import UserRouter from './app/routes/UserRoutes.js'
import LoginRouter from './app/routes/LoginRoutes.js'
import AddressRouter from './app/routes/AddressRoutes.js'

class App{
    constructor(){
        this.app = express()
        this.middleware()
        this.routes()
    }

    middleware(){
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(express.json())
    }

    routes(){
        this.app.use('/users/',UserRouter)
        this.app.use('/login/',LoginRouter)
        this.app.use('/address/',AddressRouter)
    }
}

export default new App().app