import { TextareaAutosize } from "@mui/material";
import { Controller } from "react-hook-form";
import CLabel from "../../CElements/CLabel";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

export default function HFTextareaAutosize({
  control,
  name = "",
  required = false,
  rules = {},
  label,
  disabled = false,
  password = false,
  errors = {},
  defaultValue = "",
  setPassword = () => {},
  setValue = () => {},
  ...props
}) {
  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  return (
    <div className="HFTextareaAutosize">
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
          <textarea
            size="small"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            name={name}
            error={error}
            helperText={error?.message}
            {...props}
            type={props.type || "text"}
            disabled={disabled}
          />
        )}
      ></Controller>
      {errors[name]?.message && <p className="error">{errors[name].message}</p>}
    </div>
  );
}
