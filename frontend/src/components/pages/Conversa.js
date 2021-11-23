import styles from './Conversa.module.css'


function Conversa({ mensagens }) {
    return (

        <div className={styles.msg}>

            {
                mensagens.map((mensagem,index) => (

                <p key={index}> <b> {mensagem[1]} </b><br/> {mensagem[0]}<br/><br/> </p>
                
                ))
            }

        </div>
    )
}

export default Conversa