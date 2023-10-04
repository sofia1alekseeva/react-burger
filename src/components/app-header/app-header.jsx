import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./app-header.module.css"
import AppHeaderLink from '../app-header-link/add-header-link';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { user } from '../../services/reducers/profile/selectors';

export const AppHeader = () => {
  const [active, setActive] = useState('/');
  const userData = useSelector(user);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname){
      setActive(location.pathname)
    }
  }, [location])

  return (
    <header className={styles.header} >
      <div className={`${styles.wrapper}`}>
        <AppHeaderLink
          to="/"
          isActive={active === "/"}
          text="Конструктор"
          icon={<BurgerIcon />} />
        <AppHeaderLink
          to="/"
          isActive={active === "/lenta"}
          text="Лента Заказов"
          icon={<ListIcon />} />
        <div className={styles.logo}>
          <Logo />
        </div>
        {userData ? <AppHeaderLink
          to="/profile"
          isActive={active.includes("/profile")}
          text="Личный кабинет"
          icon={<ProfileIcon />} />
          : <AppHeaderLink
            to="login"
            isActive={active === "/login"}
            text="Войти"
            icon={<ProfileIcon />} />}
      </div>
    </header >
  );
}
