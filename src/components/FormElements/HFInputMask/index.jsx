import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import CLabel from "../../CElements/CLabel";
import "../style.scss";
import { useEffect } from "react";

const HFInputMask = ({
  control,
  name = "",
  disabledHelperText = false,
  required = false,
  rules = {},
  mask,
  label,
  defaultValue = "",
  handleChange = () => {},
  setValue = () => {},
  alwaysShowMask,
  maskChar = "_",
  ...props
}) => {
  useEffect(() => {
    if (defaultValue) setValue(name, defaultValue);
  }, [setValue, defaultValue, name]);

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
          <InputMask
            mask={mask}
            maskChar={maskChar}
            value={value ?? undefined}
            alwaysShowMask
            onChange={(e) => {
              onChange(e.target.value);
              handleChange(e.target.value);
            }}
          >
            {(inputProps) => (
              <TextField
                size="small"
                name={name}
                error={error}
                helperText={!disabledHelperText && (error?.message ?? " ")}
                {...inputProps}
                {...props}
              />
            )}
          </InputMask>
        )}
      ></Controller>
    </div>
  );
};

export default HFInputMask;
