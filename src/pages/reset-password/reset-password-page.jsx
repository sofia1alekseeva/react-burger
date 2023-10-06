import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./reset-password.module.css"
import { clearProfileError, resetPasswordThunk } from "../../services/reducers/profile";
import { error, loading } from "../../services/reducers/profile/selectors";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tokenError = useSelector(error)
    const tokenLoading = useSelector(loading);
    const {state} = useLocation();

    const [value, setValue] = useState({password: "", token: ""});

    useEffect(() => {
        if(state?.from !== "/forgot-password") {
            navigate("/forgot-password");
        }
    }, [])
    
    useEffect(() => {
        if(tokenLoading === 'succeeded') {
            navigate("/");
            dispatch(clearProfileError());
        }
    }, [tokenLoading])

    const onChange = (e, type) => {
        setValue((prevState) => ({...prevState, [type]: e.target.value}))
    }

    const linkToLoginPage = () => {
        navigate("/login")
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(resetPasswordThunk(value))
    }

    return (<form className={styles.mainBlock} onSubmit={onSubmit}>
        <div className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</div>
        <Input value={value?.password} placeholder="Введите новый пароль" type="password" icon="ShowIcon" onChange={(e) => onChange(e, "password")}/>
        <Input value={value?.token} placeholder="Введите код из письма" type="text" onChange={(e) => onChange(e, "token")} />
        {tokenError === "Incorrect reset token" && <span className={`${styles.errorMessage} text text_type_main-small`}>Неверный код из письма</span>}
        <Button type="primary" htmlType="submit">Сохранить</Button>
        <div className={styles.bottomBlock}>
        <span className={`text text_type_main-default text_color_inactive mr-2`}>Вспомнили пароль?</span>
        <Button htmlType="button" type="secondary" onClick={linkToLoginPage} extraClass={styles.bottomButton}>Войти</Button>
        </div>

    </form>
    )
}
export default ResetPasswordPage