import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import CLabel from "../../CElements/CLabel";
import "../style.scss";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useEffect } from "react";

const HFTextField = ({
  control,
  name = "",
  required = false,
  rules = {},
  label,
  disabled = false,
  password = false,
  defaultValue = "",
  setPassword = () => {},
  setValue = () => {},
  ...props
}) => {
  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  return (
    <div className="HFInput">
      {label && <CLabel title={label} required={required} />}
      <Controller
        control={control}
        name={name}
        defaultValue=""
        rules={{
          required: required ? "This is required field" : false,
          ...rules,
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            size="small"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            name={name}
            error={error}
            helperText={error?.message}
            {...props}
            type={props.type || "text"}
            disabled={disabled}
          />
        )}
      ></Controller>
      {password && (
        <span
          className="visibility"
          onClick={() => setPassword((prev) => !prev)}
        >
          {props.type === "password" ? <VisibilityOff /> : <Visibility />}
        </span>
      )}
    </div>
  );
};

export default HFTextField;
