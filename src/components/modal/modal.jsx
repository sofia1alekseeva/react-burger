import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css'
import Portal from "../portal/portal"
import { useEffect } from "react";
import { ModalOverlay } from "../modal-overlay/modal-overlay"
import PropTypes from 'prop-types';

export const Modal = ({ active, setActive, title, children, onClose }) => {
    useEffect(() => {
        if (!active) return;
        const close = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        }
        document.addEventListener('keydown', close)
        return () => {
            document.removeEventListener('keydown', close)
        }
    }, [active]);

    const closeModal = () => {
        setActive(false);
        onClose && onClose();
    };

    return (
        <Portal>
            <ModalOverlay active={active} setActive={setActive}>
                <div className={styles.mainBlock} onClick={(e) => e.stopPropagation()}>
                    <div className={`${styles.wrapper}`}>
                        <p className={`${styles.title} text text_type_main-large`}>{title}</p>
                        <div className={styles.closeIcon}>
                            <CloseIcon type="primary" onClick={closeModal} />
                        </div>
                    </div>
                    {children}
                </div>
            </ModalOverlay>
        </Portal>
    )

}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    active: PropTypes.bool,
    setActive: PropTypes.func,
    title: PropTypes.string,
    onClose: PropTypes.func
};
