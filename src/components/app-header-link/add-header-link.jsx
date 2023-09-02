import appHeaderLink from './app-header-link.module.css';
import PropTypes from 'prop-types';

const AppHeaderLink = ({ isActive, onClick, text, icon }) => {

    return (
      <nav className={`${isActive ? appHeaderLink.active : appHeaderLink.notActive} ${appHeaderLink.navBlock} p-4`}
        onClick={onClick}
      >
        <span className={`${appHeaderLink.logo} pl-2`}>{icon}</span>
        <a className='pl-2'>{text}</a>
      </nav >
    )
  }
  
  AppHeaderLink.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
  };
  
  export default AppHeaderLink;