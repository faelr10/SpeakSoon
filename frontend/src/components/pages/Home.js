import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import styles from './Home.module.css'

function Home() {
    return (

        <section>
            <div className={styles.containerAcess}>
               
                <div className={styles.containerLogin}>
                    <Login />
                </div>

                <div className={styles.containerOu}>
                    <p>Ou</p>
                </div>

                <div className={styles.containerRegister}>
                    <Register />
                </div>

            </div>
        </section>

    )
}

export default Home