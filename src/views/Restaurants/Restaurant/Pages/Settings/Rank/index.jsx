import HForm from "../../../../../../components/HForm";
import CLabel from "../../../../../../components/CElements/CLabel";
import CashbackInputs from "./ChangeCashback";
import { useQuery } from "react-query";
import rankService from "../../../../../../services/rankService";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../../../store/alert/alert.thunk";
import usePageRouter from "../../../../../../hooks/useObjectRouter";
import { useState } from "react";
import SaveButton from "../../../../../../components/Buttons/SaveButton";
const styles = { textAlign: "center", fontSize: "20px", marginTop: "30px" };
export default function RestaurantSettingsRank() {
  const { progmatic } = usePageRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { data: rank } = useQuery(["GET_RANKS"], () => {
    return rankService.getList({
      organization_id: "e56440aa-a806-4c8a-b2ae-420591039eff",
    });
  });

  function handleSubmit(data) {
    setLoading(true);
    data.cashback_percent = data?.cashback_percent
      ? parseFloat(data?.cashback_percent)
      : 0;
    data.step_amount = data?.step_amount ? parseFloat(data?.step_amount) : 0;
    data.write_off_percent = data?.write_off_percent
      ? parseFloat(data?.write_off_percent)
      : 0;

    rankService
      .updateElement(data)
      .then((res) => {
        dispatch(
          showAlert({ title: "Ранг успешно обновлен", type: "success" })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <HForm>
      {rank?.organization_ranks?.map((item, index) => (
        <div key={item.id}>
          <CLabel
            title={
              index === 0 ? "Начисление" : index === 1 ? "Снятие" : "Переходы"
            }
            styles={styles}
          />
          <CashbackInputs
            item={item}
            last={index === 2}
            handleSubmit={handleSubmit}
          />
        </div>
      ))}

      {/* <CLabel title="Начисление" styles={styles} />
      <ChangeCashbackInputs />

      <CLabel title="Снятие" styles={styles} />
      <WithdrawalInputs />
      <CLabel title="Переходы" styles={styles} />
      <TransitionsInputs /> */}
    </HForm>
  );
}
