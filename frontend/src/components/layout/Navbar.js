import styles from './Navbar.module.css'
import { Context } from '../../context/UserContext'
import { useContext } from 'react'



function Navbar() {

    const { authenticated ,logout } = useContext(Context)




    return (

        <nav className={styles.navbar}>

            <h1>SpeakSoon</h1>

            {authenticated ? (
          <>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            
          </>
        )}
            
        </nav >

    )
}
export default Navbar