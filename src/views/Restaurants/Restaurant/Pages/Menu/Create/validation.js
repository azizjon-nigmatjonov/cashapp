import * as yup from "yup";
export const validation = () => {
  return yup.object().shape({
    title: yup
      .string()
      .required("Обязательное поле"),
    organization_id: yup
      .string()
      .required("Обязательное поле")
  });
};
