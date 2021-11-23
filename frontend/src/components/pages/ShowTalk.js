import api from '../../utils/api'
import styles from './ShowTalk.module.css'
import { useState, useEffect, useContext } from 'react'
import Conversa from './Conversa'
import { Context } from '../../context/UserContext'
import Input from '../form/Input'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'




function ShowTalk({ idTalk }) {

    //importando função de criar ou exibir conversa
    const { newTalk } = useContext(Context)
    //Função newMessage
    const { newMessage } = useContext(Context)

    //TOKEN
    const [token] = useState(localStorage.getItem('token') || '')

    //variavel para ser alterada td vez que uma nova mensagem for enviada/ server como parametro do useEffect
    const [alter, setAlter] = useState({})

    //value input redefinir valor do input após envia da mensagem
    const [value, setValue] = useState()

    //varivavel para armazenar as mensagens vindas do banco
    const [messages, setMessage] = useState({ message: [''] })

    //variavel para armazenar nova mensagem
    const [newMsg, setNewMsg] = useState({})

    //variavel com o id do usuário q está enviando a msg
    const idUser = messages.userId

    //pegar valor que está sendo passado pela url
    const id = useParams()

    const [newIdTalk, setNewIdTalk] = useState({})


    //criando array com mensagem e usuário para enviar
    const mensagemNew = {
        message: newMsg.message,
        idUser
    }


    //--------------------------------------------------------------------------------------    
    //Realizar consulta na api, sempre que alter ou token for setados
    useEffect(() => {

        api
            .get(`/talk/showmessage/${id.id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            .then((response) => {
                setMessage(response.data)
            })

    })




    //--------------------------------------------------------------------------------------    

    //setar novo valor ao newMsg sempre que handleChange for acionado
    function handleChange(e) {
        setNewMsg({ ...newMsg, [e.target.name]: e.target.value })
        setValue(e.target.value)
        setNewIdTalk({ ...newIdTalk, [e.target.name]: e.target.id })
    }

    //executar função de inserir msg no banco e setar alteração na variavel alter para realizar nova consulta de mensagens
    function handleSubmit(e) {
        e.preventDefault()
        console.log(id.id)
        newMessage(mensagemNew, id.id)
        setAlter({ ...alter, [e.target.name]: e.target.value })
        setValue('')
    }

    function handleClick(e) {
        e.preventDefault()
        newTalk(newIdTalk.newIdTalk)
    }


    return (

        <div>

            <li>
                <Link to="/dashboard">Voltar ao menu principal</Link>
            </li>

            <div className={styles.containerLayout}>

                <div className={styles.containerLeft}>

                    <div className={styles.leftLogo}>

                        <h1>SpeakSoon</h1>

                    </div>

                    <div className={styles.leftUser}>

                        <div className={styles.leftUserPhoto}></div>
                        <div className={styles.leftUserName}>Rafael</div>
                        <div className={styles.leftUserStatus}>Dev FullStack</div>

                    </div>

                    <div className={styles.leftContacts}>

                        <div className={styles.leftTitle}>Meus amigos</div>

                        <div className={styles.leftContactsContainer}>
                            <div className={styles.leftContactsPhoto}></div>
                            <button onClick={handleClick} onMouseMove={handleChange} name="newIdTalk" id="3198296471631982964716" > Rafael </button><br />

                        </div>
                        <div className={styles.leftContactsContainer}>
                            <div className={styles.leftContactsPhoto}></div>
                            <button onClick={handleClick} onMouseMove={handleChange} name="newIdTalk" id="319829647163134530769" > Shara Brito </button><br />
                        </div>
                        <div className={styles.leftContactsContainer}>
                            <div className={styles.leftContactsPhoto}></div>
                            <div className={styles.leftContactsName}>Adriano Ferreira</div>
                        </div>
                        <div className={styles.leftContactsContainer}>
                            <div className={styles.leftContactsPhoto}></div>
                            <div className={styles.leftContactsName}>Flávio Gregório</div>
                        </div>
                        <div className={styles.leftContactsContainer}>
                            <div className={styles.leftContactsPhoto}></div>
                            <div className={styles.leftContactsName}>Flávio Gregório</div>
                        </div>
                        <div className={styles.leftContactsContainer}>
                            <div className={styles.leftContactsPhoto}></div>
                            <div className={styles.leftContactsName}>Flávio Gregório</div>
                        </div>
                        <div className={styles.leftContactsContainer}>
                            <div className={styles.leftContactsPhoto}></div>
                            <div className={styles.leftContactsName}>Flávio Gregório</div>
                        </div><div className={styles.leftContactsContainer}>
                            <div className={styles.leftContactsPhoto}></div>
                            <div className={styles.leftContactsName}>Flávio Gregório</div>
                        </div><div className={styles.leftContactsContainer}>
                            <div className={styles.leftContactsPhoto}></div>
                            <div className={styles.leftContactsName}>Flávio Gregório</div>
                        </div>

                    </div>

                </div>

                <div className={styles.containerRight}>

                    <div className={styles.containerRightMensagens}>
                        <Conversa mensagens={messages.message} />
                    </div>

                    <form autoComplete="off" onSubmit={handleSubmit}>

                        <Input

                            text="Nova mensagem"
                            type="text"
                            name="message"
                            placeholder="Nova mensagem"
                            handleOnChange={handleChange}
                            value={value}
                        />

                    </form>

                </div>

            </div>


            {/* <button onClick={handleClick} onMouseMove={handleChange} name="newIdTalk" value="3134530769" > Shara Brito </button><br />
            <button onClick={handleClick} onMouseMove={handleChange} name="newIdTalk" value="31982964717" > Adriano </button><br />
            <button onClick={handleClick} onMouseMove={handleChange} name="newIdTalk" value="3198296471631982964716" > Rafael </button><br />  */}
        </div>









    )
}

export default ShowTalk