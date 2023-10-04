import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./login-page.module.css"
import { loginThunk } from "../../services/reducers/auth";
import { getUserData } from "../../utils/burger-api";
import { getUserThunk } from "../../services/reducers/profile";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [value, setValue] = useState({email: "", password: ""});
    const [typePassword, setTypePassword] = useState("password")


    const linkToRegistrationPage = () => {
        navigate("/register")
    }

    const linkToForgotPasswordPage = () => {
        navigate("/forgot-password")
    }


    const onChange = (e, type) => {
        setValue((prevState) => ({...prevState, [type]: e.target.value}))
        console.log("value", value)
    }

    const onSubmit = async () => {
        dispatch(loginThunk(value));
        navigate("/")
    }

    const onIconClick = () => {
        setTypePassword(prevState => prevState === "password" ? "text" : "password");

    }

    return (<form className={styles.mainBlock} onSubmit={onSubmit}>
        <h1 className={`${styles.title} text text_type_main-medium`}>Вход</h1>
        <Input placeholder="E-mail" type="email" onChange={(e) => onChange(e, "email")}/>
        <Input placeholder="Пароль" type={typePassword} icon={typePassword === "password" ? "ShowIcon" : "HideIcon"} onIconClick={onIconClick} onChange={(e) => onChange(e, "password")}/>
        <Button type="primary" htmlType="submit">Войти</Button>
        <div className={styles.bottomBlock}>
        <div className={styles.bottomBlockActions}>
        <span className={`text text_type_main-default text_color_inactive mr-2`}>Вы — новый пользователь?</span>
        <Button type="secondary" onClick={linkToRegistrationPage} extraClass={styles.bottomButton}>Зарегистрироваться</Button>
        </div>
        <div className={styles.bottomBlockActions}>
        <span className={`text text_type_main-default text_color_inactive mr-2`} >Забыли пароль?</span>
        <Button type="secondary" onClick={linkToForgotPasswordPage} extraClass={styles.bottomButton}>Восстановить пароль</Button>
        </div>
        </div>

    </form>
    )
}

export default LoginPage