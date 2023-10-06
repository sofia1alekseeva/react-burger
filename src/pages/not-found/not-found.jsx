import { Link } from 'react-router-dom';
import styles from './not-found.module.css'

const NotFound = () => {
    return (<div className={styles.mainBlock}>
        <h1 className={`${styles.title} text text_type_digits-large`}>404</h1>
        <h2 className={`${styles.title} text text_type_main-medium`}>Страница не найдена</h2>
        <p className='text text_type_main-default text_color_inactive'> Проверьте адрес или вернитесь на главную страницу по этой <Link to='/' className={styles.link}>ссылке</Link></p>
    </div>)
}

export default NotFound