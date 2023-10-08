import styles from './app-header-link.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AppHeaderLink = ({ isActive, onClick, text, icon, to }) => {

  return (
    <nav className={`${isActive ? styles.active : styles.notActive} ${styles.navBlock} p-4`}
      onClick={onClick}
    >
      <span className={`${styles.logo} pl-2`}>{icon}</span>
      <Link to={to} className='pl-2'>{text}</Link>
    </nav >
  )
}

AppHeaderLink.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
};

export default AppHeaderLink;