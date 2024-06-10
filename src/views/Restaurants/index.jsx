import Header from "../../components/Header";
import RestaurantsTable from "./Table";
import CreateButton from "../../components/Buttons/CreateButton";
import { useNavigate } from "react-router-dom";
import branchService from "../../services/branchService";
import { useQuery } from "react-query";
import { useMemo, useState } from "react";
import { useGetQueries } from "../../hooks/useQueries";
import FormCard from "../../components/FormCard";
import SearchInput from "../../components/SearchInput";
import cls from "./style.module.scss";
import CBreadcrumbs from "../../components/CElements/CBreadcrumbs";
import COptimizedRangePicker from "../../components/DatePickers/COptRangePicker";

const DashboardPage = () => {
  const { currentPage, currentLimit, search } = useGetQueries();
  const navigate = useNavigate();
  const [calendar, setCalendar] = useState([]);

  const params = useMemo(() => {
    const currentpage = parseInt(currentPage) || 1;
    const limit = parseInt(currentLimit) || 10;
    let result = {};
    result.offset = (currentpage - 1) * 10;
    result.limit = limit;
    result.search = search;

    return result;
  }, [currentPage, currentLimit, search]);

  const {
    data: branches,
    isLoading,
    refetch,
  } = useQuery(
    ["GET_BRANCHS", params],
    () => {
      return branchService.getList({
        ...params,
      });
    },
    {
      enabled: !!params.limit,
    }
  );

  const breadCrumbItems = useMemo(() => {
    const result = [
      {
        label: "Организации",
        link: "/object/organizations",
      },
      {
        label: "Рестораны",
      },
    ];
    return result;
  }, []);

  return (
    <div className="dashboard">
      <Header
        title="Рестораны"
        extra={
          <CreateButton onClick={() => navigate("/object/restaurant/create")} />
        }
      >
        <CBreadcrumbs items={breadCrumbItems} type="link" />
      </Header>

      <FormCard>
        <div className={cls.extraHeader}>
          <SearchInput width={500} styles={{ width: "300px" }} />

          <COptimizedRangePicker
            onChange={(val) => setCalendar(val)}
            value={calendar}
          />
        </div>

        <RestaurantsTable
          currentPage={currentPage}
          currentLimit={currentLimit}
          branches={branches}
          isLoading={isLoading}
          refetch={refetch}
        />
      </FormCard>
    </div>
  );
};

export default DashboardPage;
