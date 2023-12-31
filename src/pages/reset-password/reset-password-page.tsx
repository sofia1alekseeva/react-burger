import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./reset-password.module.css";
import {
  clearResetPasswordError,
  resetPasswordThunk,
} from "../../services/reducers/profile/reset-password";
import {
  error,
  loading,
} from "../../services/reducers/profile/reset-password/selectors";
import { useAppDispatch, useAppSelector } from "../../hooks";

type TType = "password" | "token";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tokenError = useAppSelector(error);
  const tokenLoading = useAppSelector(loading);
  const { state } = useLocation();

  const [value, setValue] = useState<Record<TType, string>>({
    password: "",
    token: "",
  });

  useEffect(() => {
    if (state?.from !== "/forgot-password") {
      navigate("/forgot-password");
    }
  }, []);

  useEffect(() => {
    if (tokenLoading === "succeeded") {
      navigate("/");
      dispatch(clearResetPasswordError());
    }
  }, [tokenLoading]);

  const onChange = (e: ChangeEvent<HTMLInputElement>, type: TType) => {
    setValue((prevState) => ({ ...prevState, [type]: e.target.value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetPasswordThunk(value));
  };

  return (
    <form className={styles.mainBlock} onSubmit={onSubmit}>
      <div className={`${styles.title} text text_type_main-medium`}>
        Восстановление пароля
      </div>
      <Input
        value={value?.password}
        placeholder="Введите новый пароль"
        type="password"
        icon="ShowIcon"
        onChange={(e) => onChange(e, "password")}
      />
      <Input
        value={value?.token}
        placeholder="Введите код из письма"
        type="text"
        onChange={(e) => onChange(e, "token")}
      />
      {tokenError === "Incorrect reset token" && (
        <span className={`${styles.errorMessage} text text_type_main-small`}>
          Неверный код из письма
        </span>
      )}
      <Button type="primary" htmlType="submit">
        Сохранить
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
export default ResetPasswordPage;
