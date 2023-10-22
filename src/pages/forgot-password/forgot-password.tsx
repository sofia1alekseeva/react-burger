import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./forgot-password.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { forgotPasswordThunk } from "../../services/reducers/profile/forgot-password";
import { useAppDispatch } from "../../hooks";

type TType = "email";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname, state } = useLocation();
  const [value, setValue] = useState<Record<TType, string>>({ email: "" });

  const onChange = (e: ChangeEvent<HTMLInputElement>, type: TType) => {
    e.preventDefault();
    setValue((prevState) => ({ ...prevState, [type]: e.target.value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(forgotPasswordThunk(value));
    navigate("/reset-password", { state: { ...state, from: pathname } });
  };

  return (
    <form className={styles.mainBlock} onSubmit={onSubmit}>
      <h1 className={`${styles.title} text text_type_main-medium`}>
        Восстановление пароля
      </h1>
      <Input
        value={value?.email}
        placeholder="Укажите e-mail"
        type="email"
        onChange={(e) => onChange(e, "email")}
      />
      <Button type="primary" htmlType="submit">
        Восстановить
      </Button>
      <div className={styles.bottomBlock}>
        <span
          className={`text text_type_main-default text_color_inactive mr-2`}
        >
          Вспомнили пароль?
        </span>
        <Link
          to="/login"
          className={`${styles.bottomLink} text text_type_main-default`}
        >
          Войти
        </Link>
      </div>
    </form>
  );
};
export default ForgotPasswordPage;
