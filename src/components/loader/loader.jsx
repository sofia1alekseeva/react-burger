import { Oval } from 'react-loader-spinner';
import styles from "./loader.module.css";
import PropTypes from 'prop-types';

const Loader = ({extraClass}) => {
    return (<div className={`${styles.mainBlock} ${extraClass ? extraClass : ""}`}>
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

Loader.propTypes = {
    extraClass: PropTypes.string
  };