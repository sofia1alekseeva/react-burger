import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import Portal from "../portal/portal";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
} from "react";
import { ModalOverlay } from "../modal-overlay/modal-overlay";

interface IModelProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  title?: string;
  onClose?: Function;
}

export const Modal: FC<PropsWithChildren<IModelProps>> = ({
  active,
  setActive,
  title,
  children,
  onClose,
}) => {
  useEffect(() => {
    if (!active) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("keydown", close);
    };
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
            <p className={`${styles.title} text text_type_main-large`}>
              {title}
            </p>
            <div className={styles.closeIcon}>
              <CloseIcon type="primary" onClick={closeModal} />
            </div>
          </div>
          {children}
        </div>
      </ModalOverlay>
    </Portal>
  );
};
