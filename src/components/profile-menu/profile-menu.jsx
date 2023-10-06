import { Outlet } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-menu.module.css"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../../services/reducers/auth/logout";
import { useEffect, useState } from "react";
import { resetUser } from "../../services/reducers/profile";
import { useLocation } from "react-router-dom";

const ProfileMenu = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();


    const [active, setActive] = useState('/profile');


    const linkToProfilePage = () => {
        navigate("/profile")
    }

    const linkToOrdersPage = () => {
        navigate("orders")
    }

    const logout = () => {
        dispatch(logoutThunk())
        dispatch(resetUser())
        navigate("/login")
    }

    useEffect(() => {
        if (location.pathname) {
            setActive(location.pathname)
        }
    }, [location.pathname])


    return (
        <div className={`${styles.mainBlock} mt-30`}>
            <div className={styles.column}>
                <Button htmlType="button" type="secondary" onClick={linkToProfilePage} extraClass={`${styles.button} ${(active == "/profile" ? styles.active : "")} text text_type_main-medium`}>Профиль</Button>
                <Button htmlType="button" type="secondary" onClick={linkToOrdersPage} extraClass={`${styles.button} ${active == "/profile/orders" ? styles.active : ""} text text_type_main-medium`}>История заказов</Button>
                <Button htmlType="button" type="secondary" onClick={logout} extraClass={`${styles.button} text text_type_main-medium`}>Выход</Button>
                <p className={`${styles.description} mt-20 text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <div className={styles.secondBlock}>
                <Outlet />
            </div>
        </div>
    )
}

export default ProfileMenu;