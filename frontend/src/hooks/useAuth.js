import api from '../utils/api'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useAuth() {

    const [authenticated, setAuthenticated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {

        //variável guarda o valor que está no token do LocalStorage
        const token = localStorage.getItem('token')

        //verificar se retornou algo do token
        if (token) {

            //guarda o token no cabeçalho
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`//backend ira receber a authorization toda vez q a api for solicitada 

            //muda o status de authenticated
            setAuthenticated(true)
        }
    }, [])

    //---------------------------------------------------------------------------------------//
    //---------------------------------------------------------------------------------------//

    //Função que faz a autentificação do usuario no browser
    async function authUser(data) {

        //muda o status de authenticated
        setAuthenticated(true)

        //salva o token no localStorage do navegador
        localStorage.setItem('token', JSON.stringify(data.token))

        //redireciona para a pag '/'
        navigate('/dashboard')
    }
    //---------------------------------------------------------------------------------------//
    //---------------------------------------------------------------------------------------//

    //Função que faz o registro de um novo usuário

    async function register(user) {

        //definindo text e tipo da flash message em caso de sucesso
        // let msgText = "Cadastro realizado com sucesso!"
        // let msgType = 'success'


        try {

            //Registrar usuário  -- fazendo uma requisição para a api através da rota de registro e retornando resposta da api
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })

            //Função para autenticar usuário no browser se o registro for feito com sucesso
            await authUser(data)

        } catch (error) {

            //definindo text e tipo da flash message em caso de error
            // msgText = error.response.data.message
            // msgType = 'error'
        }

        // //definindo valor da flash message
        // setFlashMessage(msgText, msgType)
    }

    //---------------------------------------------------------------------------------------//
    //---------------------------------------------------------------------------------------//

    async function login(user) {

        // //definindo text e tipo da flash message em caso de sucesso
        // let msgText = "Login realizado com sucesso!"
        // let msgType = 'success'

        try {

            //Registrar usuário  -- fazendo uma requisição para a api através da rota de registro e retornando resposta da api
            const data = await api.post('/users/login', user).then((response) => {
                return response.data
            })

            //Função para autenticar usuário no browser se o registro for feito com sucesso
            await authUser(data)
            navigate('/dashboard')

        } catch (error) {

            // //definindo text e tipo da flash message em caso de error
            // msgText = error.response.data.message
            // msgType = 'error'
        }

        // //definindo valor da flash message
        // setFlashMessage(msgText, msgType)

    }




    return { authenticated, register,login }

}