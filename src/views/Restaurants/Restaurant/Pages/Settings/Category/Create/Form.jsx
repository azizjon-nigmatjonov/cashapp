import { useQuery } from "react-query";
import HFSelect from "../../../../../../../components/FormElements/HFSelect";
import HFTextField from "../../../../../../../components/FormElements/HFTextField";
import HForm from "../../../../../../../components/HForm";
import cls from "./style.module.scss";
import menuService from "../../../../../../../services/menuService";
import { useMemo } from "react";
import HFRSwitch from "../../../../../../../components/FormElements/HFRSwitch";

export default function CategoryForm({
  control,
  formRef,
  category,
  handleSubmit,
  onSubmit,
  setValue,
}) {
  const { data: menus } = useQuery(["GET_MENUS_FOR_CATEGORY"], () => {
    return menuService.getList({ offset: 0, limit: 100 });
  });

  const MenuOptions = useMemo(() => {
    if (!menus?.menus) return [];
    return menus.menus.map((item) => ({
      value: item.id,
      label: item.title,
    }));
  }, [menus]);

  return (
    <HForm formRef={formRef} handleSubmit={handleSubmit} onSubmit={onSubmit}>
      <HFRSwitch
        name="active"
        control={control}
        label="Активный"
        defaultValue={category?.active}
        setValue={setValue}
      />
      <div className={cls.grid}>
        <HFTextField
          name="title"
          control={control}
          placeholder="Наименование"
          label="Наименование"
          required={true}
          defaultValue={category?.title}
          setValue={setValue}
        />
        <HFSelect
          name="menu_id"
          control={control}
          label="Меню"
          required={true}
          options={MenuOptions}
          defaultValue={category?.menu_id}
          setValue={setValue}
        />
      </div>
    </HForm>
  );
}
