import { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import styles from "./modal-overlay.module.css";

interface IPortalProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

export const ModalOverlay: FC<PropsWithChildren<IPortalProps>> = ({
  active,
  setActive,
  children,
}) => {
  return (
    <div
      className={active ? styles.mainBlockActive : styles.mainBlock}
      onClick={() => setActive(false)}
    >
      {children}
    </div>
  );
};
