import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export const ModalOverlay = ({ active, setActive, children }) => {

    return (
        <div className={active ? styles.mainBlockActive : styles.mainBlock} onClick={()=> setActive(false)}>
            {children}
        </div>
    )

}

ModalOverlay.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    active: PropTypes.bool,
    setActive: PropTypes.func
};