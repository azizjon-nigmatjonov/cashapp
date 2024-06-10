import * as yup from "yup";
export const Validation = () => {
  return yup.object().shape({
    name: yup.string().required("Обязательное поле"),
    phone_number: yup.string()
    .matches(
      /^(\+998)\s(9[0-9])\s([0-9]{3})\s([0-9]{2})\s([0-9]{2})$/,
      "Введите действительный номер телефона"
    )
    .required("Обязательное поле"),
    // logo: yup.string().required("Обязательное поле"),
  });
};
