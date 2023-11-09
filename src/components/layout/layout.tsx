import { FC } from "react";
import { AppHeader } from "../app-header/app-header";
import { Outlet } from "react-router-dom";
import styles from "./layout.module.css";

const Layout: FC = () => {
  return (
    <div>
      <AppHeader />
      <div className={styles.mainBlock}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
