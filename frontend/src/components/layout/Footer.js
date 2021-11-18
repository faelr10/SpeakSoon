import styles from './Footer.module.css'


function Footer(){
    return(
        <footer className={styles.footer}>
            <p>
                <span className="bold">SpeakSoon</span>&copy;2021
            </p>
        </footer>
    )
}
export default Footer