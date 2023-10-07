import { Outlet } from "react-router-dom";
import styles from "./profile-menu.module.css"
import { useDispatch } from "react-redux";
import { logoutThunk } from "../../services/reducers/auth/logout";
import { useEffect, useState } from "react";
import { resetUser } from "../../services/reducers/profile";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
    const dispatch = useDispatch();
    const location = useLocation();


    const [active, setActive] = useState('/profile');

    const logout = () => {
        dispatch(logoutThunk())
        dispatch(resetUser())
        localStorage.removeItem("bun");
        localStorage.removeItem("main");
    }

    useEffect(() => {
        if (location.pathname) {
            setActive(location.pathname)
        }
    }, [location.pathname])


    return (
        <div className={`${styles.mainBlock} mt-30`}>
            <div className={styles.column}>
                <Link to="/profile" className={`${styles.link} ${(active === "/profile" ? styles.active : "")} text text_type_main-medium`}>Профиль</Link>
                <Link to="orders" className={`${styles.link} ${active === "/profile/orders" ? styles.active : ""} text text_type_main-medium`}>История заказов</Link>
                <Link to="/login" onClick={logout} className={`${styles.link} text text_type_main-medium`}>Выход</Link>
                <p className={`${styles.description} mt-20 text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <div className={styles.secondBlock}>
                <Outlet />
            </div>
        </div>
    )
}

export default ProfileMenu;