import { Switch } from "@mui/material";
import { useEffect, useId } from "react";
import { Controller } from "react-hook-form";
import CLabel from "../CElements/CLabel";

const HFSwitch = ({
  control,
  name,
  label,
  disabledHelperText,
  labelProps,
  required = false,
  defaultValue = "",
  setValue = () => {},
  ...props
}) => {
  const id = useId();

  useEffect(() => {
    if (!defaultValue) return;
    setValue(name, defaultValue);
  }, [defaultValue, name, setValue]);

  return (
    <div className="CSwitch">
      {label && <CLabel title={label} required={required} />}
      <Controller
        control={control}
        name={name}
        defaultValue={false}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Switch
            id={`switch-${id}`}
            {...props}
            checked={value ?? false}
            onChange={(e, val) => onChange(val)}
          />
        )}
      ></Controller>
    </div>
  );
};

export default HFSwitch;
