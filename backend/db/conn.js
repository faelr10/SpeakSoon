const mongoose = require('mongoose')


async function main(){
    await mongoose.connect('mongodb://localhost:27017/speaksoon')
    console.log("Conectado com sucesso!")
}

main().catch((err)=>console.log(err))

module.exports=mongoose