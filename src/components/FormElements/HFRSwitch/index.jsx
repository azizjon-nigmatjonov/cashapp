import "./style.scss";
import RcSwitch from "rc-switch";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import CLabel from "../../CElements/CLabel";

export default function HFRSwitch({
  name,
  control,
  style,
  label,
  defaultValue = "",
  setValue = () => {},
  ...props
}) {
  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);
  return (
    <div>
      {label && <CLabel title={label} required={props.required} />}
      <Controller
        name={name}
        control={control}
        // defaultValue={defaultValue}
        // rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <RcSwitch
            {...props}
            onChange={onChange}
            onBlur={onBlur}
            checked={value}
            ref={ref}
          />
        )}
      />
    </div>
  );
}
