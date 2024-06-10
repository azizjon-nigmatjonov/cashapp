import { useEffect, useState } from "react";
import cls from "./style.module.scss";
export default function RestaurantBanner({ branch }) {
  const [currentImage, setCurrentImage] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!branch?.photos?.length) return;
    const interval = setInterval(() => {
      if (branch.photos.length === 1) return;

      if (index < branch.photos.length - 1) {
        setIndex((prev) => prev + 1);
      } else setIndex((prev) => prev - 1);
    }, 7000);
    return () => {
      clearInterval(interval);
    };
  }, [branch, index]);

  useEffect(() => {
    if (!branch.photos?.length) return;

    setCurrentImage(branch.photos[index]);
  }, [index, branch]);

  return (
    <div className={cls.wrapper}>
      {currentImage ? <img src={currentImage} alt="banner img" /> : ""}
      <div className={cls.content}>
        <h1 className={cls.title}>{branch?.name}</h1>
      </div>
    </div>
  );
}
