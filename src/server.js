import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'

app.on('pronto', ()=>{
    app.listen(process.env.PORT,()=>{
        console.log()
        console.log(`Aplicação rodando na porta ${process.env.PORT}`)
        console.log()
    })
})