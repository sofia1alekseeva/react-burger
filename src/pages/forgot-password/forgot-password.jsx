import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import styles from "./forgot-password.module.css"
import { useDispatch } from "react-redux";
import { useState } from "react";
import { forgotPasswordThunk } from "../../services/reducers/profile";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [value, setValue] = useState({email: ""});

    const onChange = (e, type) => {
        setValue((prevState) => ({...prevState, [type]: e.target.value}))
        console.log("value", value)
    }

    const linkToLoginPage = () => {
        navigate("/login")
    }

    const onSubmit = async () => {
        dispatch(forgotPasswordThunk(value))
        navigate("/reset-password")
    }

    return (<form className={styles.mainBlock} onSubmit={onSubmit}>
        <h1 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h1>
        <Input placeholder="Укажите e-mail" type="email" onChange={(e) => onChange(e, "email")}/>
        <Button type="primary" htmlType="submit">Восстановить</Button>
        <div className={styles.bottomBlock}>
        <span className={`text text_type_main-default text_color_inactive mr-2`}>Вспомнили пароль?</span>
        <Button type="secondary" onClick={linkToLoginPage} extraClass={styles.bottomButton}>Войти</Button>
        </div>

    </form>
    )
}
export default ForgotPasswordPage