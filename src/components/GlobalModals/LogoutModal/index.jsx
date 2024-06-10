import { useDispatch } from "react-redux";
import ModalCard from "../../ModalCard";
import cls from "./style.module.scss";
import { WarningRounded } from "@mui/icons-material";
import { authActions } from "../../../store/auth/auth.slice";
export default function LogoutModal({ onClose = () => {} }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(authActions.logout());
    onClose();
  }

  return (
    <ModalCard
      width="400px"
      height="200px"
      textModal={{ posBtn: "Да", negBtn: "Нет" }}
      onClose={() => onClose()}
      onSaveButtonClick={() => handleLogout()}
    >
      <div className={cls.wrapper}>
        <WarningRounded style={{ fontSize: "70px", color: "#f0ad4e" }} />
        <h1>Выйти из профиля</h1>
        <p>Вы уверены, что хотите покинуть этот профиль?</p>
      </div>
    </ModalCard>
  );
}
