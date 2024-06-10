import { useSelector } from "react-redux";
import FormCard from "../../../../components/FormCard";
import HFSwitch from "../../../../components/FormElements/HFSwitch";
import { useForm } from "react-hook-form";
import cls from "./style.module.scss";
import HFRSwitch from "../../../../components/FormElements/HFRSwitch";

export default function RoleList() {
  const { control } = useForm();
  const permissions = useSelector((state) => state.website.permissions);
  return (
    <FormCard padding="0 10px">
      <ul className={cls.permissionList}>
        {permissions?.list?.map((item) => (
          <li key={item.permission} className={cls.item}>
            <p className={cls.title}>{item.title}</p>
            <div className={cls.switch}>
              <HFRSwitch name={item.permission} control={control} />
              <p className={`${cls.status} ${cls.active}`}>Aктивный</p>
            </div>
          </li>
        ))}
      </ul>
    </FormCard>
  );
}
