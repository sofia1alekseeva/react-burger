import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import AppHeaderLink from "../app-header-link/add-header-link";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { user } from "../../services/reducers/profile/selectors";
import { useAppSelector } from "../../hooks";

export const AppHeader = () => {
  const [active, setActive] = useState<string>("/");
  const userData = useAppSelector(user);
  const location = useLocation();
  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname) {
      setActive(location.pathname);
    }
  }, [location]);

  useEffect(() => {
    if (userData) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [userData]);

  return (
    <header className={styles.header}>
      <div className={`${styles.wrapper}`}>
        <AppHeaderLink
          to="/"
          isActive={active === "/"}
          text="Конструктор"
          icon={<BurgerIcon type="primary" />}
        />
        <AppHeaderLink
          to="/"
          isActive={active === "/lenta"}
          text="Лента Заказов"
          icon={<ListIcon type="primary" />}
        />
        <div className={styles.logo}>
          <Logo />
        </div>
        {isUser ? (
          <AppHeaderLink
            to="/profile"
            isActive={active.includes("/profile")}
            text="Личный кабинет"
            icon={<ProfileIcon type="primary" />}
          />
        ) : (
          <AppHeaderLink
            to="login"
            isActive={active === "/login"}
            text="Войти"
            icon={<ProfileIcon type="primary" />}
          />
        )}
      </div>
    </header>
  );
};
