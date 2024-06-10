import { useMemo } from "react";

export const HeadColumns = () => {
  const headColumns = useMemo(() => {
    return [
      {
        id: "index",
        width: 50,
        textAlign: "center",
      },
      {
        title: "ФИО",
        width: 300,
        id: "full_name",
      },
      {
        title: "Номер телефона",
        id: "phone",
      },
      {
        title: "Уровень гостя (% кешбека)",
        id: "degree_guest",
      },
      {
        title: "Доступный кешбек",
        id: "cashback_still",
      },
      {
        title: "Общий счет",
        id: "overal_money",
      },
    ];
  }, []);

  return headColumns;
};
