import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./login-page.module.css"
import { clearLoginError, loginThunk } from "../../services/reducers/auth/login";
import { error, loading } from "../../services/reducers/auth/login/selectors";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginError = useSelector(error)
  const loginLoading = useSelector(loading)
  const [value, setValue] = useState({ email: "", password: "" });
  const [typePassword, setTypePassword] = useState("password")


  const onChange = (e, type) => {
    setValue((prevState) => ({ ...prevState, [type]: e.target.value }))
  }

  useEffect(() => {
    if (loginLoading === 'succeeded') {
      navigate("/");
      dispatch(clearLoginError());
    }
  }, [loginLoading])

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk(value));
  }

  const onIconClick = () => {
    setTypePassword(prevState => prevState === "password" ? "text" : "password");
  }

  return (<form className={styles.mainBlock} onSubmit={onSubmit}>
    <h1 className={`${styles.title} text text_type_main-medium`}>Вход</h1>
    <Input value={value?.email} placeholder="E-mail" type="email" onChange={(e) => onChange(e, "email")} />
    <Input value={value?.password} placeholder="Пароль" type={typePassword} icon={typePassword === "password" ? "ShowIcon" : "HideIcon"} onIconClick={onIconClick} onChange={(e) => onChange(e, "password")} />
    {loginError === "email or password are incorrect" && <span className={`${styles.errorMessage} text text_type_main-small`}>Неверный e-mail или пароль</span>}
    <Button type="primary" htmlType="submit">Войти</Button>
    <div className={styles.bottomBlock}>
      <div className={styles.bottomBlockActions}>
        <span className={`text text_type_main-default text_color_inactive mr-2`}>Вы — новый пользователь?</span>
        <Link to="/register" className={`${styles.bottomLink} text text_type_main-default`}>Зарегистрироваться</Link>
      </div>
      <div className={styles.bottomBlockActions}>
        <span className={`text text_type_main-default text_color_inactive mr-2`} >Забыли пароль?</span>
        <Link to="/forgot-password" className={`${styles.bottomLink} text text_type_main-default`}>Восстановить пароль</Link>
      </div>
    </div>

  </form>
  )
}

export default LoginPage