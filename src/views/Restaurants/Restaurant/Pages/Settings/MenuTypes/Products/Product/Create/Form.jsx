import HFTextField from "../../../../../../../../../components/FormElements/HFTextField";
import cls from "./style.module.scss";
import HForm from "../../../../../../../../../components/HForm";
import HFSelect from "../../../../../../../../../components/FormElements/HFSelect";
import { useQuery } from "react-query";
import { useMemo } from "react";
import menuService from "../../../../../../../../../services/menuService";
import categoryService from "../../../../../../../../../services/categoryService";
import HFTextareaAutosize from "../../../../../../../../../components/FormElements/HFTextareaAutosize";
import HFImageUpload from "../../../../../../../../../components/FormElements/HFImageUpload";
import ProductImages from "./Images";
import HFRSwitch from "../../../../../../../../../components/FormElements/HFRSwitch";
import { useParams } from "react-router-dom";
import FormCard from "../../../../../../../../../components/FormCard";

export default function ProductForm({
  control,
  errors,
  onSubmit,
  handleSubmit,
  formRef,
  product = {},
  setValue = () => {},
}) {
  const { menu_id } = useParams();
  const { data: menus } = useQuery(["GET_MENU_LIST_FOR_PRODUCT"], () => {
    return menuService.getList({ offset: 0, limit: 100 });
  });

  const { data: categories } = useQuery(
    ["GET_CATEGORY_LIST_FOR_PRODUCT"],
    () => {
      return categoryService.getList({ offset: 0, limit: 100 });
    }
  );

  const MenuOptions = useMemo(() => {
    if (!menus?.menus) return [];
    return menus.menus.map((item) => ({
      value: item.id,
      label: item.title,
    }));
  }, [menus]);

  const CategoryOptions = useMemo(() => {
    if (!categories?.categories) return [];
    return categories.categories.map((item) => ({
      value: item.id,
      label: item.title,
    }));
  }, [categories]);

  return (
    <HForm onSubmit={onSubmit} handleSubmit={handleSubmit} formRef={formRef}>
      <FormCard minHeight="auto">
        <HFRSwitch
          name="active"
          control={control}
          label="Активный"
          defaultValue={product?.active}
          setValue={setValue}
        />
        <div style={{ paddingTop: "25px" }}>
          <HFImageUpload
            name="image"
            control={control}
            label="Главное фото"
            errors={errors}
            required={true}
            defaultValue={product?.image}
            setValue={setValue}
          />
        </div>

        <div className={cls.formGrid}>
          <HFTextField
            name="title"
            control={control}
            placeholder="Название"
            label="Название блюда"
            required={true}
            defaultValue={product?.title}
            setValue={setValue}
          />
          <HFTextField
            name="weight"
            control={control}
            placeholder="Вес"
            label="Вес блюда"
            required={true}
            type="number"
            defaultValue={product?.weight}
            setValue={setValue}
          />
          <HFTextField
            name="price"
            control={control}
            placeholder="Цена"
            label="Цена блюда"
            required={true}
            type="number"
            defaultValue={product?.price}
            setValue={setValue}
          />
          <HFSelect
            name="menu_id"
            control={control}
            label="Меню"
            required={true}
            options={MenuOptions}
            defaultValue={product?.menu_id ?? menu_id}
            setValue={setValue}
            disabled={true}
          />
          <HFSelect
            name="category_id"
            control={control}
            label="Категория"
            required={true}
            options={CategoryOptions}
            defaultValue={product?.category_id}
            setValue={setValue}
          />
        </div>
        <div className={cls.gridDescription}>
          <div className={cls.first}>
            <HFTextareaAutosize
              name="description"
              control={control}
              placeholder="Напишите здесь"
              label="Описание"
              rows={4}
              errors={errors}
              required={true}
              defaultValue={product?.description}
              setValue={setValue}
            />
          </div>
          <div className={cls.second}>
            <HFTextareaAutosize
              name="short_description"
              control={control}
              placeholder="Напишите здесь"
              label="Краткое описание"
              rows={4}
              errors={errors}
              required={true}
              defaultValue={product?.short_description}
              setValue={setValue}
            />
          </div>
        </div>
      </FormCard>

      <FormCard minHeight="auto" padding="0 20px 40px 20px">
        <div className={cls.gridImages}>
          <ProductImages
            control={control}
            name="gallery"
            product={product}
            setValue={setValue}
          />
        </div>
      </FormCard>
    </HForm>
  );
}
