const express = require('express')
const cors = require('cors')
const { Router } = require('express')

const app = express()


//Configurando response JSON
app.use(express.json())

//Configurando Cors
app.use(cors({credentials:true, origin: 'http://localhost:3000'}))

//Definindo pasta public
app.use(express.static('public'))


//Routes
const UserRoutes = require('./routes/UserRouter')
app.use('/users',UserRoutes)





app.listen(5000,()=>{
    console.log('Servidor rodando com sucesso!')
})