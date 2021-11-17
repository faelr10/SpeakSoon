const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

const checkToken = (req,res,next)=>{

    //Validando se veio algum valor no authorization
    if(!req.headers.authorization){
        return res.status(401).json({message:'Acesso Negado 1!'})
    }

    //guardando valor do token na variavel token
    const token = getToken(req)

    //Validando se veio algum valor no token
    if(!token){
        return res.status(401).json({message:'Acesso Negado 2!'})
    }

    //Validando se o token existe
    try {
        const verified = jwt.verify(token,'nossosecret')
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).json({message:'Token inválido!'})
    }


}

module.exports = checkToken