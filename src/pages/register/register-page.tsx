import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./register-page.module.css";
import { registerThunk } from "../../services/reducers/auth/register";
import { useAppDispatch } from "../../hooks";

type TPassword = "password" | "text";

type TType = "password" | "email" | "name";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [typePassword, setTypePassword] = useState<TPassword>("password");

  const linkToLoginPage = () => {
    navigate("/login");
  };

  const [value, setValue] = useState<Record<TType, string>>({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>, type: TType) => {
    e.preventDefault();
    setValue((prevState) => ({ ...prevState, [type]: e.target.value }));
  };

  const onSubmit = async () => {
    dispatch(registerThunk(value));
    navigate("/");
  };

  const onIconClick = () => {
    setTypePassword((prevState) =>
      prevState === "password" ? "text" : "password"
    );
  };

  return (
    <form className={styles.mainBlock} onSubmit={onSubmit}>
      <h1 className={`${styles.title} text text_type_main-medium`}>
        Регистрация
      </h1>
      <Input
        placeholder="Имя"
        value={value?.name}
        onChange={(e) => onChange(e, "name")}
      />
      <Input
        placeholder="E-mail"
        type="email"
        value={value?.email}
        onChange={(e) => onChange(e, "email")}
      />
      <Input
        placeholder="Пароль"
        type={typePassword}
        icon={typePassword === "password" ? "ShowIcon" : "HideIcon"}
        value={value?.password}
        onChange={(e) => onChange(e, "password")}
        onIconClick={onIconClick}
      />
      <Button type="primary" htmlType="submit">
        Зарегистрироваться
      </Button>
      <div className={styles.bottomBlock}>
        <span
          className={`text text_type_main-default text_color_inactive mr-2`}
        >
          Уже зарегистрированы?
        </span>
        <Button
          htmlType="button"
          type="secondary"
          onClick={linkToLoginPage}
          extraClass={styles.loginButton}
        >
          Войти
        </Button>
      </div>
    </form>
  );
};
export default RegisterPage;
