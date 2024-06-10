import { useEffect, useState } from "react";
import cls from "./style.module.scss";
import { AddBoxRounded } from "@mui/icons-material";
import ImageUpload from "../../../../../../../../../../components/Upload/ImageUpload";
import CLabel from "../../../../../../../../../../components/CElements/CLabel";
import { GetImageId } from "../../../../../../../../../../utils/GetImageId";

export default function ProductImages({ name, setValue, product }) {
  const [imagesList, setImagesList] = useState([]);
  function addImage(props) {
    const imgObj = {
      index: props.index,
      url: props.url,
      id: props.id,
    };
    setImagesList((prev) => [...prev, imgObj]);
  }

  function onChange(val, element) {
    element.id = val;
    const ids = imagesList.map((item) => item.id);
    setValue(name, ids ? ids : []);
  }

  useEffect(() => {
    if (product?.gallery?.length) {
      product.gallery.forEach((element, index) => {
        const imgObj = {
          index: index + 1,
          url: element,
          id: GetImageId(element),
        };
        setImagesList((prev) => [...prev, imgObj]);
      });
    }
  }, [product]);

  useEffect(() => {
    if (!product?.gallery?.length || !name || !setValue) return;
    const ids = product.gallery.map((item) => GetImageId(item));
    setValue(name, ids);
  }, [product, setValue, name]);

  return (
    <div className={cls.wrapper}>
      <CLabel title="Фото" />
      <div className={cls.grid}>
        {imagesList?.map((item) => (
          <ImageUpload
            key={item.index}
            onChange={(val) => onChange(val, item)}
            imageUrl={item?.url ?? ""}
          />
        ))}
        <div className={cls.addBtn}>
          <AddBoxRounded
            onClick={() =>
              addImage({ index: imagesList?.length + 1, url: "", id: "" })
            }
            style={{ fontSize: "50px" }}
          />
        </div>
      </div>
    </div>
  );
}
