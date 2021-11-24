const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')


module.exports = class UserController {

    static async register(req, res) {

        const { name, email, phone, password, confirmpassword } = req.body

        //Validação dos campos do formulário
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }

        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório!' })
            return
        }

        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatório!' })
            return
        }

        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatório!' })
            return
        }

        if (!confirmpassword) {
            res.status(422).json({ message: 'A confirmação da senha é obrigatório!' })
            return
        }

        //Validação da senha e confirmação de senha
        if (password !== confirmpassword) {
            res.status(422).json({ message: 'As senhas não podem ser diferentes!' })
            return
        }

        //Validação se já existe email cadastrado
        const existEmail = await User.findOne({ email: email })

        if (existEmail) {
            res.status(422).json({ message: 'Email já cadastrado!' })
            return
        }

        let image = ''

        if(req.file){
            image = req.file.filename
        }

        console.log(image)

        //Criptografando senha
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //criando objeto que será inserido no banco
        const user = new User({
            name,
            email,
            phone,
            image,
            password: passwordHash
        })

        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res)
            res.status(200).json({ message: newUser })

        } catch (error) {
            res.status(500).json({ message: error })
            return
        }

    }

    static async login(req, res) {
        const { email, password } = req.body

        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório!' })
            return
        }

        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatório!' })
            return
        }

        //Validação se já existe email cadastrado
        const user = await User.findOne({ email: email })

        if (!user) {
            res.status(422).json({ message: 'Email não existe!' })
            return
        }

        //validate password
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({ message: 'Senha incorreta!' })
            return
        }

        //validar se usuário já está logado
        const token = getToken(req)

        if (token) {
            const userToken = await getUserByToken(token)

            if (userToken && userToken.email !== email) {
                res.status(422).json({ message: 'Já existe um usuário logado! Faça logout antes de realizar novo login!' })
                return
            }

        }

        //Autenticando usuário por meio da criação do token
        try {
            await createUserToken(user, req, res)
        } catch (error) {
            res.status(500).json({ message: error })
            return
        }

    }


    static async acess(req, res) {

        //validar se usuário já está logado
        const token = getToken(req)

        if (token) {
            const userToken = await getUserByToken(token)

            if (userToken) {
                res.status(422).json({ message: `Usuário do id ${userToken._id} já está logado!` })
                return
            }

        }

    }

    static async dashboard(req, res) {


        const token = getToken(req)
        const userToken = await getUserByToken(token)

        res.status(200).json(userToken)
        return

    }


    static async newFriend(req, res) {

        const idFriend = req.body

        const token = getToken(req)
        const userToken = await getUserByToken(token)


        const userFriend = await User.findOne({ phone: idFriend.phone })

        if (userFriend) {
            userToken.friends.push([userFriend.name, userFriend.phone, userFriend.image])

            const updateUser = await User.findOneAndUpdate(
                { _id: userToken._id },
                { $set: userToken },
                { new: true },
            )

            res.status(200).json(updateUser.friends)
            return
        }

    }

    static async searchUser(req, res) {
        const phone = req.params

        const user = await User.findOne({ phone: phone.id })

        if (user) {
            res.status(200).json(user)
        } else {
            res.status(200).json()
        }




        return
    }



}