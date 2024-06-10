import { useDispatch } from "react-redux";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../../components/Buttons/SecondaryButton";
import { authActions } from "../../../store/auth/auth.slice";
import classes from "../style.module.scss";
import HFTextField from "../../../components/FormElements/HFTextField";
import { useForm } from "react-hook-form";
import { validationLogin } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../../services/auth/useAuth";
import { useState } from "react";

const LoginForm = ({ navigateToRegistrationForm }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState(true);
  const schema = validationLogin();
  const { login } = useAuth({
    loginProps: {
      onSuccess: (value) => {
        const states = {
          user: value.user,
          token: value.token,
          sessions: value.sessions,
        };
        dispatch(authActions.login(states));
      },
    },
  });

  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    // dispatch(authActions.login());
    login.mutate(data);
    // console.log("data", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <div className={classes.formArea}>
        <div className={classes.formRow}>
          <HFTextField
            label="Логин"
            name="login"
            control={control}
            placeholder="Введите логин"
          />
        </div>
        <div className={classes.formRow}>
          <HFTextField
            label="Пароль"
            name="password"
            control={control}
            placeholder="Введите пароль"
            password={true}
            setPassword={setPassword}
            type={password ? "password" : "text"}
          />
        </div>
      </div>

      <div className={classes.buttonsArea}>
        <PrimaryButton>Войти</PrimaryButton>
        <SecondaryButton type="button" onClick={navigateToRegistrationForm}>
          Зарегистрироваться
        </SecondaryButton>
      </div>
    </form>
  );
};

export default LoginForm;
