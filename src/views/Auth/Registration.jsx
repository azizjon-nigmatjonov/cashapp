import PrimaryButton from "../../components/Buttons/PrimaryButton";
import styles from "./style.module.scss";
import "./style.scss";
import HFTextField from "../../components/FormElements/HFTextField";
import HFInputMask from "../../components/FormElements/HFInputMask";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "../../services/auth/useAuth";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import { useNavigate } from "react-router";
import { useState } from "react";

const Registration = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState(true);
  const { signup } = useAuth({
    registerProps: {
      onSuccess: (value) => {
        console.log("value", value);
      },
    },
  });

  const schema = yup.object().shape({
    first_name: yup
      .string()
      .required("Обязательное поле")
      .min(3, "Введите минимум 3 символа"),
    last_name: yup
      .string()
      .required("Обязательное поле")
      .min(3, "Введите минимум 3 символа"),
    login: yup
      .string()
      .required("Обязательное поле")
      .min(4, "Введите минимум 4 символа"),
    password: yup
      .string()
      .required("Обязательное поле")
      .min(4, "Введите минимум 4 символа"),
    phone_number: yup
      .string()
      .matches(
        /^(\+998)\s(9[0-9])\s([0-9]{3})\s([0-9]{2})\s([0-9]{2})$/,
        "Введите действительный номер телефона"
      )
      .required("Обязательное поле"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });

  function onSubmit(data) {
    // data.tag = "";
    data.user_type = 1;
    data.phone_number = data.phone_number?.substring(1)?.replace(/\s+/g, "");
    signup.mutate(data);
  }

  return (
    <div className={`${styles.page} registration`}>
      <h1 className={styles.title}>Регистрация</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formArea}>
          <div className={styles.formRow}>
            <HFTextField
              name="first_name"
              Имя="Имя"
              required={true}
              control={control}
              placeholder="Введите имя"
            />
          </div>
          <div className={styles.formRow}>
            <HFTextField
              name="last_name"
              label="Фамилия"
              required={true}
              control={control}
              placeholder="Введите фамилия"
            />
          </div>
          <div className={styles.formRow}>
            <HFTextField
              name="login"
              label="Логин"
              required={true}
              control={control}
              placeholder="Введите логин"
            />
          </div>
          <div className={styles.formRow}>
            <HFTextField
              name="password"
              label="Пароль"
              control={control}
              required={true}
              password={true}
              setPassword={setPassword}
              type={password ? "password" : "text"}
              placeholder="Введите пароль"
            />
          </div>
          <div className={styles.formRow}>
            <HFInputMask
              control={control}
              label="Номер телефона"
              required={true}
              name="phone_number"
              placeholder="Введите номер телефона"
              mask={"+\\9\\9\\8 99 999 99 99"}
            />
          </div>
        </div>

        <div className={styles.buttonsArea}>
          <PrimaryButton>Продолжить</PrimaryButton>
        </div>
        <SecondaryButton type="button" onClick={() => navigate("/login")}>
          Авторизоваться
        </SecondaryButton>
      </form>
    </div>
  );
};

export default Registration;
