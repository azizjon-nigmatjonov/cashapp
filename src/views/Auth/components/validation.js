import * as yup from "yup";
export const validationLogin = () => {
  return yup.object().shape({
    login: yup
      .string()
      .required("Обязательное поле")
      .min(4, "Введите минимум 4 символа"),
    password: yup
      .string()
      .required("Обязательное поле")
      .min(4, "Введите минимум 4 символа"),
  });
};
