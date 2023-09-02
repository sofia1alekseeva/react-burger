import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./app-header.module.css"
import AppHeaderLink from '../app-header-link/add-header-link';
import { useState } from 'react';

export const AppHeader = () => {
    const [active, setActive] = useState('Конструктор');
  
    return (
      <header className={styles.header} >
        <div className={`${styles.wrapper}`}>
          <AppHeaderLink
            onClick={() => setActive("Конструктор")}
            isActive={active === "Конструктор"}
            text="Конструктор"
            icon={<BurgerIcon />} />
          <AppHeaderLink
            onClick={() => setActive("Лента Заказов")}
            isActive={active === "Лента Заказов"}
            text="Лента Заказов"
            icon={<ListIcon />} />
          <div className={styles.logo}>
            <Logo />
          </div>
          <AppHeaderLink
            onClick={() => setActive("Личный кабинет")}
            isActive={active === "Личный кабинет"}
            text="Личный кабинет"
            icon={<ProfileIcon />} />
        </div>
      </header >
    );
  }
  