import { useDispatch } from "react-redux";
import ModalCard from "../../ModalCard";
import cls from "./style.module.scss";
import { WarningRounded } from "@mui/icons-material";
import { authActions } from "../../../store/auth/auth.slice";
export default function GuestVisitReportModal({
  onClose = () => {},
  data = {},
}) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(authActions.logout());
    onClose();
  }
  console.log("data", data);
  return (
    <ModalCard
      width="400px"
      height="auto"
      footerActive={false}
      textModal={{ posBtn: "Да", negBtn: "Нет" }}
      onClose={() => onClose()}
      onSaveButtonClick={() => handleLogout()}
    >
      <div className={cls.wrapper}>
        <ul className={cls.list}>
          <li className={cls.item}>
            <h1>Ресторан</h1>
            <span>{data.name}</span>
          </li>
          <li className={cls.item}>
            <h1>Дата</h1>
            <span>{data.start_date}</span>
          </li>
          <li className={cls.item}>
            <h1>Счет</h1>
            <span>{data.payment}</span>
          </li>
          <li className={cls.item}>
            <h1>Кешбек on</h1>
            <span>{data.cash_on}</span>
          </li>
          <li className={cls.item}>
            <h1>Кэшбек in</h1>
            <span>{data.cash_in}</span>
          </li>
        </ul>
      </div>
    </ModalCard>
  );
}
