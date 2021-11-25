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

    const [friends, setFriends] = useState([''])
    const [user, setUser] = useState([''])
    const [newIdTalk, setNewIdTalk] = useState()

    const [status, setStatus] = useState(false)

    //criando array com mensagem e usuário para enviar
    const mensagemNew = {
        message: newMsg.message,
        idUser
    }

    let otheridTalk

    if (user.phone > newIdTalk) {
        otheridTalk = user.phone + newIdTalk
    } else {
        otheridTalk = newIdTalk + user.phone
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
                setFriends(response.data.friends)
                setUser(response.data.user)
                setStatus(false)
            })

    }, [ id.id,status, token])



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
        setStatus(true)
    }

    function handleChangeTalk(e) {
        setNewIdTalk(e.target.id)
    }

    function handleClick(e) {
        e.preventDefault()
        newTalk(otheridTalk)
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

                        <div className={styles.leftUserPhoto}><img src={`${process.env.REACT_APP_API}/images/users/${user.image}`} alt="" /></div>
                        <div className={styles.leftUserName}>{user.name}</div>
                        <div className={styles.leftUserStatus}>Dev FullStack</div>

                    </div>

                    <div className={styles.leftContacts}>

                        <div className={styles.leftContacts}>

                            <div className={styles.leftTitle}> Meus amigos</div>

                            {
                                friends.map((itens, index) => (
                                    <div key={index} className={styles.leftContactsContainer}  >
                                        <div className={styles.leftContactsPhoto}><img src={`${process.env.REACT_APP_API}/images/users/${itens[2]}`} alt="" /></div>
                                        <div className={styles.leftContactsName} key={index} onMouseMove={handleChangeTalk} onClick={handleClick} name="newIdTalk" id={itens[1]} > {itens[0]} </div><br />
                                    </div>
                                ))
                            }

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

        </div>









    )
}

export default ShowTalk