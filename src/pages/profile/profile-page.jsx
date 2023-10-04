import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './profile-page.module.css'
import { user } from "../../services/reducers/profile/selectors";
import { resetPasswordThunk, updateUserThunk } from "../../services/reducers/profile";
import { sendResetPasswordData } from "../../utils/burger-api";

const initialDisabledState = { email: true, password: true, name: true };

const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(user);
    const inputRef = useRef({});
    const [value, setValue] = useState({ email: userData?.email || "", password: "", name: userData?.name || "" });
    const [showButton, setShowButton] = useState(false);
    const [isDisabled, setIsDisabled] = useState(initialDisabledState);
    const [isPasswordFocus, setIsPasswordFocus] = useState(false)
    const [typePassword, setTypePassword] = useState("password");
    const [passwordIcon, setPasswordIcon] = useState("EditIcon")

    useEffect(() => {
        if (userData) {
            setValue({ email: userData?.email, password: "", name: userData?.name })
        }
    }, [userData])

    useEffect(() => {
        if (isPasswordFocus) {
            if (typePassword === "password") {
                setPasswordIcon("ShowIcon")
            } else { 
                setPasswordIcon("HideIcon") 
            }
        } else {
            setPasswordIcon("EditIcon")
        }
    }, [isPasswordFocus, typePassword])

    const onIconClick = (e, type) => {
        e.preventDefault();
        e.stopPropagation();
        if (type === "password" && !!isPasswordFocus) {
            setTypePassword(prevState => prevState === "password" ? "text" : "password");
        }
        setIsDisabled(() => ({ ...initialDisabledState, [type]: false }));
        setShowButton(true);
        setTimeout(() => {
            inputRef.current[type].focus();
        })
        console.log("e", e)
        // console.log("disabled", isDisabled)

    }

    const onChange = (e, type) => {
        setValue((prevState) => ({ ...prevState, [type]: e.target.value }))
        console.log("value", value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserThunk({ email: value.email, name: value.name, password: value.password }));
        setShowButton(false);
        setIsDisabled(initialDisabledState);
        setPasswordIcon("EditIcon")
    }

    const onReset = (e) => {
        e.preventDefault();
        setValue({ email: userData?.email, password: "", name: userData?.name });
        setShowButton(false);
        setIsDisabled(initialDisabledState);
        setPasswordIcon("EditIcon")
    }

    return (
        <form className={`${styles.column} ${styles.inputs}`} onSubmit={onSubmit} onReset={onReset}>
            <Input
                placeholder="Имя"
                type="text"
                icon="EditIcon"
                disabled={isDisabled.name}
                onIconClick={(e) => onIconClick(e, "name")}
                name={'name'} value={value.name}
                onChange={(e) => onChange(e, "name")}
                ref={el => inputRef.current["name"] = el}
            />
            <Input
                placeholder="Логин"
                type="email"
                icon="EditIcon"
                disabled={isDisabled.email}
                onIconClick={(e) => onIconClick(e, "email")}
                name={'login'}
                value={value?.email}
                onChange={(e) => onChange(e, "email")}
                ref={el => inputRef.current["email"] = el}
            />
            <Input
                placeholder="Пароль"
                type={typePassword}
                icon={passwordIcon}
                disabled={isDisabled.password}
                onIconClick={(e) => onIconClick(e, "password")}
                name={'password'}
                value={value.password}
                onChange={(e) => onChange(e, "password")}
                ref={el => inputRef.current["password"] = el}
                onFocus={() => setIsPasswordFocus(true)}
            />
            {showButton && <div className={styles.buttonsBlock}>
                <Button type="primary" htmlType="reset" extraClass={styles.button}>Отменить</Button>
                <Button type="primary" htmlType="submit" extraClass={styles.button}>Сохранить</Button>
            </div>}
        </form>
    )
}

export default ProfilePage