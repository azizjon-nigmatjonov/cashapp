import { useForm } from "react-hook-form";
import FormCard from "../../../../../../components/FormCard";
import MenuForm from "./Form";
import Header from "../../../../../../components/Header";
import CBreadcrumbs from "../../../../../../components/CElements/CBreadcrumbs";
import { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "./validation";
import menuService from "../../../../../../services/menuService";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../../../store/alert/alert.thunk";
import { useQuery } from "react-query";
import usePageRouter from "../../../../../../hooks/useObjectRouter";

export default function RestaurantMenuCreate() {
  const { menuId } = useParams();
  const schema = validation();
  const { progmatic } = usePageRouter();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  function handleClick(evt) {
    if (evt === "cancel") {
      progmatic();
      return;
    }
    formRef.current.submitForm();
  }

  const { data: menu } = useQuery(
    ["GET_MENU_FOR_SETTINGS", menuId],
    () => {
      return menuService.getElement(menuId);
    },
    {
      enabled: !!menuId,
    }
  );

  function onSubmit(data) {
    setLoading(true);
    if (menu?.id) {
      data.id = menu.id;
      menuService
        .updateElement(data)
        .then((res) => {
          dispatch(
            showAlert({ title: "Меню успешно обновлено", type: "success" })
          );
          progmatic();
        })
        .finally(() => {
          setLoading(false);
        });
      return;
    }
    menuService
      .createElement(data)
      .then((res) => {
        dispatch(
          showAlert({ title: "Новое меню успешно создан", type: "success" })
        );
      })
      .finally(() => {
        reset();
        setLoading(false);
        progmatic();
      });
  }

  const breadCrumbItems = useMemo(() => {
    return [
      {
        label: "Меню",
        link: -1,
      },
      {
        label: menu?.title || "Добавить меню",
      },
    ];
  }, [menu]);

  return (
    <div>
      <Header
        title="Добавление меню"
        extraButtons={{ type: "submit", loading }}
        handleExtraButtons={handleClick}
      >
        <CBreadcrumbs items={breadCrumbItems} progmatic={true} type="link" />
      </Header>
      <FormCard minHeight="120px">
        <MenuForm
          control={control}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          formRef={formRef}
          errors={errors}
          menu={menu}
          setValue={setValue}
        />
      </FormCard>
    </div>
  );
}
