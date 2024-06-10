import { FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import ImageUpload from "../../Upload/ImageUpload";
import CError from "../../CElements/CError";
import "./style.scss";
import CLabel from "../../CElements/CLabel";
import { useEffect } from "react";
import { GetImageId } from "../../../utils/GetImageId";

const HFImageUpload = ({
  control,
  name,
  required,
  rules,
  label = "",
  errors,
  disabledHelperText = false,
  defaultValue = "",
  setValue = () => {},
  ...props
}) => {
  useEffect(() => {
    if (!defaultValue) return;
    if (GetImageId(defaultValue) === "images") return;
    const imageId = GetImageId(defaultValue);
    setValue(name, imageId);
  }, [defaultValue, name, setValue]);
  return (
    <div className="HFImageUpload">
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
          <>
            <ImageUpload
              name={name}
              imageUrl={defaultValue}
              onChange={onChange}
              {...props}
            />
            {!disabledHelperText && (
              <FormHelperText error>{error?.message ?? " "}</FormHelperText>
            )}
          </>
        )}
      ></Controller>
      <CError errors={errors} name={name} styles={{ bottom: "-20px" }} />
    </div>
  );
};

export default HFImageUpload;
