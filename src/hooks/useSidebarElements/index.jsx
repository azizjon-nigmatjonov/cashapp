import { useMemo } from "react";
import { useSelector } from "react-redux";
import { elements } from "./elements";

const useSidebarElements = () => {
  const computedElements = useMemo(() => {
    const computedConstructorElements = elements?.map((el) => ({
      ...el,
      path: `/object/${el.path}`,
      children: el?.children?.map((child) => ({
        ...child,
        path: `/object/${el.path}` + `/child/${child.path}`,
      })),
    }));
    return [...computedConstructorElements];
  }, []);

  return { elements: computedElements ?? [] };
};

export default useSidebarElements;
