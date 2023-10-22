import styles from "./app-header-link.module.css";
import { Link } from "react-router-dom";
import { FC, ReactNode } from "react";

interface IAppHeaderLinkProps {
  isActive: boolean;
  text: string;
  icon: ReactNode;
  to: string;
}

const AppHeaderLink: FC<IAppHeaderLinkProps> = ({
  isActive,
  text,
  icon,
  to,
}) => {
  return (
    <nav
      className={`${isActive ? styles.active : styles.notActive} ${
        styles.navBlock
      } p-4`}
    >
      <span className={`${styles.logo} pl-2`}>{icon}</span>
      <Link to={to} className="pl-2">
        {text}
      </Link>
    </nav>
  );
};

export default AppHeaderLink;
