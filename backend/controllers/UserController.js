const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports = class UserController {

    static async register(req,res){

        const {name,email,password,confirmpassword} = req.body

        //Validação dos campos do formulário
        if(!name){
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }

        if(!email){
            res.status(422).json({ message: 'O email é obrigatório!' })
            return
        }

        if(!password){
            res.status(422).json({ message: 'A senha é obrigatório!' })
            return
        }

        if(!confirmpassword){
            res.status(422).json({ message: 'A confirmação da senha é obrigatório!' })
            return
        }

        //Validação da senha e confirmação de senha
        if(password !== confirmpassword){
            res.status(422).json({ message: 'As senhas não podem ser diferentes!' })
            return
        }

        //Validação se já existe email cadastrado
        const existEmail = await User.findOne({email: email})

        if(existEmail){
            res.status(422).json({ message: 'Email já cadastrado!' })
            return
        }

        //Criptografando senha
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //criando objeto que será inserido no banco
        const user = new User({
            name,
            email,
            password: passwordHash
        })

        try {
            const newUser = await user.save()
            res.status(200).json({ message: newUser })

        } catch (error) {
            res.status(500).json({message:error})
            return
        }

    }

}