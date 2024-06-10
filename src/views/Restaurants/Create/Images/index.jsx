import { useEffect, useState } from "react";
import cls from "./style.module.scss";
import { AddBoxRounded } from "@mui/icons-material";
import ImageUpload from "../../../../components/Upload/ImageUpload";
import CLabel from "../../../../components/CElements/CLabel";
import { GetImageId } from "../../../../utils/GetImageId";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "../../../../utils/applyDrag";

export default function RestaurantImages({ name, setValue, branch }) {
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

  const [dropdownsList, setdropdownsList] = useState([
    { name: "a" },
    { name: "b" },
    { name: "c" },
  ]);
  const onDrop = (dropResult) => {
    const result = applyDrag(imagesList, dropResult);
    setImagesList(result);
    console.log("result", result);
  };

  useEffect(() => {
    if (branch?.photos?.length) {
      branch.photos.forEach((element, index) => {
        const imgObj = {
          index: index + 1,
          url: element,
          id: GetImageId(element),
        };
        setImagesList((prev) => [...prev, imgObj]);
      });
    }
  }, [branch]);

  useEffect(() => {
    if (!branch?.photos?.length || !name || !setValue) return;
    const ids = branch.photos.map((item) => GetImageId(item));
    setValue(name, ids);
  }, [branch, setValue, name]);

  return (
    <div className={cls.wrapper}>
      <CLabel title="Фото" />
      <div className={cls.grid}>
        <div>
          <Container groupName="1" onDrop={onDrop} orientation="horizontal">
            {imagesList?.map((item) => (
              <Draggable key={item.id}>
                <div className={cls.imageBox}>
                  <ImageUpload
                    onChange={(val) => onChange(val, item)}
                    imageUrl={item?.url ?? ""}
                  />
                </div>
              </Draggable>
            ))}
          </Container>
        </div>
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
