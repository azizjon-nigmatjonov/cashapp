import * as yup from "yup";
export const validation = () => {
  return yup.object().shape({
    title: yup
      .string()
      .required("Обязательное поле"),
      image: yup
      .string()
      .required("Обязательное поле") ,
    weight: yup
      .string()
      .required("Обязательное поле"),
      price: yup
      .string()
      .required("Обязательное поле"),
      menu_id: yup
      .string()
      .required("Обязательное поле"),
      category_id: yup
      .string()
      .required("Обязательное поле"),
      description: yup
      .string()
      .required("Обязательное поле"),
      short_description: yup
      .string()
      .required("Обязательное поле"),
  });
};
