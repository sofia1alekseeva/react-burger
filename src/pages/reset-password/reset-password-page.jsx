import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import styles from "./reset-password.module.css"
import { resetPasswordThunk } from "../../services/reducers/profile";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [value, setValue] = useState({password: "", token: ""});

    const onChange = (e, type) => {
        setValue((prevState) => ({...prevState, [type]: e.target.value}))
        console.log("value", value)
    }

    const linkToLoginPage = () => {
        navigate("/login")
    }

    const onSubmit = async () => {
        dispatch(resetPasswordThunk(value))
        navigate("/")
    }

    return (<form className={styles.mainBlock} onSubmit={onSubmit}>
        <div className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</div>
        <Input placeholder="Введите новый пароль" type="password" icon="ShowIcon" onChange={(e) => onChange(e, "password")}/>
        <Input placeholder="Введите код из письма" type="text" onChange={(e) => onChange(e, "token")} />
        <Button type="primary" htmlType="submit">Сохранить</Button>
        <div className={styles.bottomBlock}>
        <span className={`text text_type_main-default text_color_inactive mr-2`}>Вспомнили пароль?</span>
        <Button type="secondary" onClick={linkToLoginPage} extraClass={styles.bottomButton}>Войти</Button>
        </div>

    </form>
    )
}
export default ResetPasswordPage