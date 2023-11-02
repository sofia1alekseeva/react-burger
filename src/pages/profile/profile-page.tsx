import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
  MouseEvent,
} from "react";
import styles from "./profile-page.module.css";
import { user } from "../../services/reducers/profile/selectors";
import { updateUserThunk } from "../../services/reducers/profile";
import { useAppDispatch, useAppSelector } from "../../hooks";

const initialDisabledState = { email: true, password: true, name: true };
type TType = "email" | "password" | "name";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(user);
  const inputRef = useRef<Record<TType, HTMLInputElement | null>>({
    email: null,
    password: null,
    name: null,
  });
  const [value, setValue] = useState<Record<TType, string>>({
    email: userData?.email || "",
    password: "",
    name: userData?.name || "",
  });
  const [showButton, setShowButton] = useState(false);
  const [isDisabled, setIsDisabled] = useState(initialDisabledState);
  const [isPasswordFocus, setIsPasswordFocus] = useState<boolean>(false);
  const [typePassword, setTypePassword] = useState<"password" | "text">(
    "password"
  );
  const [passwordIcon, setPasswordIcon] = useState<
    "EditIcon" | "ShowIcon" | "HideIcon"
  >("EditIcon");

  useEffect(() => {
    if (userData) {
      setValue({ email: userData?.email, password: "", name: userData?.name });
    }
  }, [userData]);

  useEffect(() => {
    if (isPasswordFocus) {
      if (typePassword === "password") {
        setPasswordIcon("ShowIcon");
      } else {
        setPasswordIcon("HideIcon");
      }
    } else {
      setPasswordIcon("EditIcon");
    }
  }, [isPasswordFocus, typePassword]);

  const onIconClick = (e: MouseEvent<HTMLDivElement>, type: TType) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === "password" && !!isPasswordFocus) {
      setTypePassword((prevState) =>
        prevState === "password" ? "text" : "password"
      );
    }
    setIsDisabled(() => ({ ...initialDisabledState, [type]: false }));
    setShowButton(true);
    setTimeout(() => {
      inputRef.current && inputRef.current[type]?.focus();
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>, type: TType) => {
    setValue((prevState) => ({ ...prevState, [type]: e.target.value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      updateUserThunk({
        email: value.email,
        name: value.name,
        password: value.password,
      })
    );
    setShowButton(false);
    setIsDisabled(initialDisabledState);
    setPasswordIcon("EditIcon");
  };

  const onReset = (e: FormEvent) => {
    e.preventDefault();
    setValue({
      email: userData?.email || "",
      password: "",
      name: userData?.name || "",
    });
    setShowButton(false);
    setIsDisabled(initialDisabledState);
    setPasswordIcon("EditIcon");
  };

  return (
    <form
      className={`${styles.column} ${styles.inputs}`}
      onSubmit={onSubmit}
      onReset={onReset}
    >
      <Input
        placeholder="Имя"
        type="text"
        icon="EditIcon"
        disabled={isDisabled.name}
        onIconClick={(e) => onIconClick(e, "name")}
        name={"name"}
        value={value?.name}
        onChange={(e) => onChange(e, "name")}
        ref={(el) => (inputRef.current["name"] = el)}
      />
      <Input
        placeholder="Логин"
        type="email"
        icon="EditIcon"
        disabled={isDisabled.email}
        onIconClick={(e) => onIconClick(e, "email")}
        name={"login"}
        value={value?.email}
        onChange={(e) => onChange(e, "email")}
        ref={(el) => (inputRef.current["email"] = el)}
      />
      <Input
        placeholder="Пароль"
        type={typePassword}
        icon={passwordIcon}
        disabled={isDisabled.password}
        onIconClick={(e) => onIconClick(e, "password")}
        name={"password"}
        value={value?.password}
        onChange={(e) => onChange(e, "password")}
        ref={(el) => (inputRef.current["password"] = el)}
        onFocus={() => setIsPasswordFocus(true)}
      />
      {showButton && (
        <div className={styles.buttonsBlock}>
          <Button type="primary" htmlType="reset" extraClass={styles.button}>
            Отменить
          </Button>
          <Button type="primary" htmlType="submit" extraClass={styles.button}>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfilePage;
