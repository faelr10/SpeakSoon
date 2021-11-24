import Input from "../../form/Input"
import styles from './Register.module.css'
import { useState, useContext } from 'react'
import { Context } from '../../../context/UserContext'




function Register() {

    const [user, setUser] = useState({})
    const { register } = useContext(Context)


    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function onFileChange(e) {
        setUser({ ...user, [e.target.name]: e.target.files[0] })
      }


    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData()
        const userFormData = await Object.keys(user).forEach((key)=>{
            formData.append(key,user[key])
        })

        register(formData)
    }

    console.log(user)

    return (

        <section className={styles.formRegister}>

            <p>Registre-se</p>

            <form enctype="multipart/form-data" id="meuForm" onSubmit={handleSubmit}>

                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}
                />

                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange}
                />

                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite seu número de telefone"
                    handleOnChange={handleChange}
                />

                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    handleOnChange={handleChange}
                />

                <Input
                    text="Confirmação de senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirme sua senha"
                    handleOnChange={handleChange}
                />


                <Input
                    text="Imagem"
                    type="file"
                    name="image"
                    handleOnChange={onFileChange}
                />

                <input className={styles.inputButton} type="submit" value="Cadastrar" />

            </form>

        </section>

    )
}

export default Register