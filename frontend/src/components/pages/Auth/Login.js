import Input from "../../form/Input"
import styles from './Login.module.css'
import { useState, useContext } from 'react'
import { Context } from '../../../context/UserContext'



function Login() {

    const [user, setUser] = useState({})
    const { login } = useContext(Context)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e){
        e.preventDefault()
        login(user)
    }

    return (

        <section className={styles.formLogin}>

            <p>Faça seu login</p>

            <form onSubmit={handleSubmit}>
                
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o e-mail"
                    handleOnChange={handleChange}
                    
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a senha"
                    handleOnChange={handleChange}
                    
                />
                <input className={styles.inputButton} type="submit" value="Entrar" />
            </form>

        </section>

    )
}

export default Login