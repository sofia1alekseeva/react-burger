import { Oval, ThreeDots } from 'react-loader-spinner';
import styles from "./loader.module.css"

const Loader = () => {
    return (<div className={styles.mainBlock}>
        <Oval
  height={100}
  width={100}
  color="#3C39EC"
  wrapperClass={styles.icon}
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#3C39EC"
  strokeWidth={4}
  strokeWidthSecondary={4}

/>
    </div>)
}

export default Loader;