import { Close } from "@mui/icons-material";
import { Card, IconButton, Modal } from "@mui/material";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import styles from "./style.module.scss";
import { useMemo } from "react";

const ModalCard = ({
  title,
  width = "500px",
  height = "400px",
  padding = "20px",
  children,
  onClose,
  footerActive = true,
  onSaveButtonClick,
  textModal = {},
}) => {
  const text = useMemo(() => {
    const def = { posBtn: "Сохранить", negBtn: "Отменить" };
    let res = { ...def, ...textModal };
    return res;
  }, [textModal]);
  return (
    <div>
      <Modal open className={styles.modal} onClose={onClose}>
        <Card className={styles.card} style={{ padding }}>
          <div className={styles.header}>
            <div></div>
            <div className={styles.cardTitle}>{title}</div>
            <IconButton className={styles.closeButton} onClick={onClose}>
              <Close className={styles.closeIcon} />
            </IconButton>
          </div>

          <div className={styles.body} style={{ height, width }}>
            {children}
          </div>

          {footerActive && (
            <dir className={styles.footer}>
              <SecondaryButton className={styles.button} onClick={onClose}>
                {text.negBtn}
              </SecondaryButton>
              <PrimaryButton
                className={styles.button}
                onClick={onSaveButtonClick}
              >
                {text.posBtn}
              </PrimaryButton>
            </dir>
          )}
        </Card>
      </Modal>
    </div>
  );
};

export default ModalCard;
