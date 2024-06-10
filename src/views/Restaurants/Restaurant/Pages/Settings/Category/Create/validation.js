import * as yup from "yup";
export const Validation = () => {
  return yup.object().shape({
    title: yup.string().required("Обязательное поле"),
  });
};
