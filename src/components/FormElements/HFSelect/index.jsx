import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";
import CLabel from "../../CElements/CLabel";
import "../style.scss";
import { useEffect } from "react";

const HFSelect = ({
  control,
  name,
  label,
  width = "100%",
  options = [],
  disabledHelperText,
  placeholder,
  required = false,
  rules = {},
  setValue = () => {},
  defaultValue = "",
  ...props
}) => {
  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);
  return (
    <div className="HFInput HFSelect">
      {label && <CLabel title={label} required={required} />}
      <Controller
        control={control}
        name={name}
        rules={{
          required: required ? "This is required field" : false,
          ...rules,
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl style={{ width }}>
            <Select
              value={value || ""}
              size="small"
              error={error}
              inputProps={{ placeholder }}
              fullWidth
              onChange={(e) => {
                onChange(e.target.value);
              }}
              {...props}
            >
              {options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {!disabledHelperText && (
              <FormHelperText error>{error?.message ?? " "}</FormHelperText>
            )}
          </FormControl>
        )}
      ></Controller>
    </div>
  );
};

export default HFSelect;
