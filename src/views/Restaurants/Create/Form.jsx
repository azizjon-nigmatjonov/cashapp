import cls from "./style.module.scss";
import RestaurantImages from "./Images";
import RestaurantMapWrapper from "./Maps";
import organizationService from "../../../services/organizationService";
import RestaurantInputs from "./Inputs";
import FormCard from "../../../components/FormCard";
import { useImperativeHandle, useMemo } from "react";
import { useQuery } from "react-query";

export default function RestaurantCreateForm({
  errors,
  control,
  formRef,
  branch = {},
  handleSubmit = () => {},
  onSubmit = () => {},
  setValue = () => {},
}) {
  const { data: organizations } = useQuery(
    ["GET_ORGANIZATION_LIST_FOR_RESTAURANT"],
    () => {
      return organizationService.getList({ offset: 0, limit: 100 });
    }
  );

  useImperativeHandle(formRef, () => ({
    submitForm() {
      handleSubmit(onSubmit)();
    },
  }));

  const OrganizationOptions = useMemo(() => {
    if (!organizations?.organizations) return [];
    return organizations.organizations.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [organizations]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <FormCard>
        <div className={cls.inputs}>
          <RestaurantInputs
            control={control}
            errors={errors}
            organizations={OrganizationOptions ?? []}
            branch={branch}
            setValue={setValue}
          />
        </div>
      </FormCard>
      <FormCard minHeight="auto" padding="0 20px 20px 20px">
        <div className={cls.images}>
          <RestaurantImages
            control={control}
            name="photos"
            setValue={setValue}
            branch={branch}
          />
        </div>
      </FormCard>
      <FormCard padding="0 20px" styles={{ marginBottom: "20px" }}>
        <div className={cls.map}>
          <RestaurantMapWrapper
            errors={errors}
            setValue={setValue}
            branch={branch}
          />
        </div>
      </FormCard>
    </form>
  );
}
