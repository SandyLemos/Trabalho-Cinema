import styles from "../../styles/not.found.module.css"

const NotFound = () => {
    return (
        <div className={styles.not_found_container}>
            <h1 className={styles.not_found_title}>404 - Página Não Encontrada</h1>
            <p className={styles.not_found_message}>A página que você está procurando não existe.</p>
        </div>
    );
};

export default NotFound;
