import CLabel from "../../../../../../../components/CElements/CLabel";
import CashbackInputs from "../../../Settings/Rank/ChangeCashback";
const styles = { textAlign: "center", fontSize: "20px", marginTop: "30px" };
export default function GuestUpDownGradePage() {
  return (
    <>
      <CLabel title={"Начисление"} styles={styles} />
      <CashbackInputs />
    </>
  );
}
