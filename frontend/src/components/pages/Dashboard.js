import api from '../../utils/api'
import styles from './Dashboard.module.css'
import Input from "../form/Input"


import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { Context } from '../../context/UserContext'


function Dashboard() {
    const { authenticated, logout,addFriend,newTalk } = useContext(Context)

    const [user, setUser] = useState({ message: [''] })
    const [token] = useState(localStorage.getItem('token') || '')
    const [newIdTalk, setNewIdTalk] = useState()
    const [friends, setFriends] = useState([''])
    const [newPhone, setNewPhone] = useState({ message: [''] })
    const [search, setSearch] = useState({ message: [''] })
    const [consulta, setConsulta] = useState('true')
    const [status, setStatus] = useState(false)
    

    let idTalk

    if (user.phone > newIdTalk) {
        idTalk = user.phone + newIdTalk
    } else {
        idTalk = newIdTalk + user.phone
    }

    useEffect(() => {
        api
            .get('/users/dashboard', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            .then((response) => {
                setUser(response.data)
                setFriends(response.data.friends)
                setConsulta(false)
                setStatus(true)
            })
    }, [consulta,token])


    useEffect(() => {
        api
            .get(`/users/searchUser/${newPhone.idFriend}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            .then((response) => {
                setSearch(response.data)
            })

    }, [status,newPhone.idFriend, token])


    function handleChange(e) {
        setNewIdTalk(e.target.id)
    }

    function handleClick(e) {
        e.preventDefault()
        newTalk(idTalk)
    }

    function handleChangePhone(e) {
        e.preventDefault()
        setNewPhone({ ...newPhone, [e.target.name]: e.target.value })
    }

    async function handleNewFriend(e){
        e.preventDefault()
        console.log(search)
        addFriend(search,token)
        setConsulta(true)
    }

    return (

        <div>

            {authenticated ? (
                <>
                    <li onClick={logout}>Sair</li>
                </>
            ) : (
                <>

                </>
            )}

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

                        <div className={styles.leftTitle}> Meus amigos</div>

                        {
                            friends.map((itens, index) => (
                                <div key={index} className={styles.leftContactsContainer}  >
                                    <div className={styles.leftContactsPhoto}><img src={`${process.env.REACT_APP_API}/images/users/${itens[2]}`} alt="" /></div>
                                    <div className={styles.leftContactsName} key={index} onMouseMove={handleChange} onClick={handleClick} name="newIdTalk" id={itens[1]} > {itens[0]} </div><br />
                                </div>
                            ))
                        }



                    </div>

                </div>

                <div className={styles.containerRight}>

                    <div className={styles.containerRightPhotoUser}>

                        <img src={`${process.env.REACT_APP_API}/images/users/${user.image}`} alt="" />

                    </div>

                    <div className={styles.containerRightTitle}>

                        <h1>Seja bem-vindo {user.name}</h1>

                    </div>

                    <div className={styles.containerRightSearch}>

                        <h1>Encontre novos amigos:</h1>
                        <form autoComplete="off" action="">
                        <Input
                            text="Telephone"
                            type="text"
                            name="idFriend"
                            placeholder="Digite o telefone..."
                            handleOnChange={handleChangePhone}
                        />
                        </form>


                    </div>

                    <div className={styles.containerRightResult}>
                        {search
                            ? <div className={styles.cardSearch}>
                                <img src={`${process.env.REACT_APP_API}/images/users/${search.image}`} alt="" />
                                <p>{search.name}</p>
                                <p>{search.phone}</p>
                                <input onClick={handleNewFriend} type="submit" value="Adicionar" />
                            </div>

                            : <p>Nenhum usuário encontrado!</p>
                        }

                        

                    </div>



                </div>

            </div>


        </div>

    )


}

export default Dashboard