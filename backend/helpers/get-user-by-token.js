const jwt = require ('jsonwebtoken')
const User = require('../models/User')

const getUserByToken = async (token)=>{

    if(!token){
        return res.status(401).json({message:"Acesso Negado!"})
    }

    const decoded = jwt.verify(token,'nossosecret') //Decodifiquei o Token
    const UserId = decoded.id // Peguei o id q estava dentro do Token que foi passado
    const user = await User.findOne({_id:UserId}) // Pesquisei de quem era o id que foi passado no Token e guardei as informações dentro da variavel

    return user 
}

module.exports = getUserByToken