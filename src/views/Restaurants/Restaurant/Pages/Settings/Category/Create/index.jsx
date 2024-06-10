import FormCard from "../../../../../../../components/FormCard";
import Header from "../../../../../../../components/Header";
import CBreadcrumbs from "../../../../../../../components/CElements/CBreadcrumbs";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../../../../components/FormElements/HFTextField";
import usePageRouter from "../../../../../../../hooks/useObjectRouter";
import { useMemo, useRef, useState } from "react";
import HForm from "../../../../../../../components/HForm";
import { Validation } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../../../../store/alert/alert.thunk";
import HFSwitch from "../../../../../../../components/FormElements/HFSwitch";
import HFSelect from "../../../../../../../components/FormElements/HFSelect";
import categoryService from "../../../../../../../services/categoryService";
import { useQuery } from "react-query";
import menuService from "../../../../../../../services/menuService";
import CategoryForm from "./Form";
import { useParams } from "react-router-dom";
const breadCrumbItems = [
  {
    label: "Назад",
    link: -1,
  },
];
export default function CategoryCreate() {
  const { progmatic } = usePageRouter();
  const formRef = useRef();
  const schema = Validation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  const { control, handleSubmit, reset, setValue } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { data: category } = useQuery(
    ["GET_CATEGORY_FOR_SETTINGS", categoryId],
    () => {
      return categoryService.getElement(categoryId);
    },
    {
      enabled: !!categoryId,
    }
  );

  function onSubmit(data) {
    setLoading(true);
    if (category?.id) {
      data.id = categoryId;
      categoryService
        .updateElement(data)
        .then((res) => {
          dispatch(
            showAlert({
              title: "Категория успешно обновлена",
              type: "success",
            })
          );
          reset();
          progmatic();
        })
        .finally(() => setLoading(false));
      return;
    }
    categoryService
      .creaCategory(data)
      .then((res) => {
        dispatch(
          showAlert({
            title: "Новая категория успешно создана",
            type: "success",
          })
        );
        reset();
        progmatic();
      })
      .finally(() => setLoading(false));
  }

  function handleClick(evt) {
    if (evt === "cancel") {
      progmatic();
      return;
    }
    formRef.current.submitForm();
  }

  return (
    <>
      <Header
        title={categoryId ? "Обновление категории" : "Добавление категории"}
        extraButtons={{ type: "submit", loading }}
        handleExtraButtons={handleClick}
      >
        <CBreadcrumbs items={breadCrumbItems} progmatic={true} type="link" />
      </Header>
      <FormCard minHeight="auto">
        <CategoryForm
          control={control}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          formRef={formRef}
          setValue={setValue}
          category={category}
        />
      </FormCard>
    </>
  );
}
