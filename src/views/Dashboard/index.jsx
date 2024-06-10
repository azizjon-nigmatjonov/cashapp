import Header from "../../components/Header";
import FormCard from "../../components/FormCard";

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <Header title="Дешборд" />
      <FormCard minHeight="70vh"></FormCard>
    </div>
  );
};

export default DashboardPage;
