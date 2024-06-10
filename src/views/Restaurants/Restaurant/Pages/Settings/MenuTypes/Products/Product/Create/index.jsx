import { useDispatch } from "react-redux";
import CBreadcrumbs from "../../../../../../../../../components/CElements/CBreadcrumbs";
import FormCard from "../../../../../../../../../components/FormCard";
import Header from "../../../../../../../../../components/Header";
import { useMemo, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "./validation";
import { useForm } from "react-hook-form";
import ProductForm from "./Form";
import productService from "../../../../../../../../../services/productService";
import usePageRouter from "../../../../../../../../../hooks/useObjectRouter";
import { showAlert } from "../../../../../../../../../store/alert/alert.thunk";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

export default function ProductCreate() {
  const { product_id } = useParams();
  const { progmatic } = usePageRouter();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const schema = validation();

  const { data: product } = useQuery(
    ["GET_PRODUCT", product_id],
    () => {
      return productService.getElement(product_id);
    },
    {
      enabled: !!product_id,
    }
  );

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    setLoading(true);
    data.price = parseFloat(data.price);
    data.weight = parseFloat(data.weight);

    if (product_id) {
      data.id = product_id;
      productService
        .updateElement(data)
        .then((res) => {
          dispatch(
            showAlert({
              title: "Продукт успешно обновлен",
              type: "success",
            })
          );
          reset();
          progmatic();
        })
        .finally(() => setLoading(false));
    } else {
      productService
        .creaCategory(data)
        .then((res) => {
          dispatch(
            showAlert({
              title: "Новый продукт успешно создан",
              type: "success",
            })
          );
          reset();
          progmatic();
        })
        .finally(() => setLoading(false));
    }
  }

  function handleClick(evt) {
    if (evt === "cancel") {
      progmatic();
      return;
    }
    formRef.current.submitForm();
  }

  const breadCrumbItems = useMemo(() => {
    return [
      {
        label: "Список продуктов",
        link: -1,
      },
      {
        label: product_id ? "Редактировать продукт" : "Добавить продукт",
      },
    ];
  }, [product_id]);

  return (
    <>
      <Header
        title="Добавление блюд"
        extraButtons={{ type: "submit", loading }}
        handleExtraButtons={handleClick}
      >
        <CBreadcrumbs items={breadCrumbItems} progmatic={true} type="link" />
      </Header>

      <ProductForm
        control={control}
        formRef={formRef}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        setValue={setValue}
        errors={errors}
        product={product}
      />
    </>
  );
}
