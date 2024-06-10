import CTable from "../../components/CElements/CTable";
import organizationService from "../../services/organizationService";
import { useQuery } from "react-query";
import { useMemo, useState } from "react";
import { useGetQueries } from "../../hooks/useQueries";
import { useDispatch } from "react-redux";
import { showAlert } from "../../store/alert/alert.thunk";
import usePageRouter from "../../hooks/useObjectRouter";
import Header from "../../components/Header";
import CreateButton from "../../components/Buttons/CreateButton";
import FormCard from "../../components/FormCard";
import SearchInput from "../../components/SearchInput";
import cls from "./style.module.scss";
import COptimizedRangePicker from "../../components/DatePickers/COptRangePicker";

export default function OrganizationsPage({ currentTab }) {
  const { currentPage, currentLimit, search } = useGetQueries();
  const { navigateTo } = usePageRouter();
  const dispatch = useDispatch();
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
    data: organizations,
    isLoading,
    refetch,
  } = useQuery(
    ["GET_ORGANIZATIONS_LIST", params],
    () => {
      return organizationService.getList({ ...params });
    },
    {
      enabled: !!params.limit,
    }
  );

  const List = useMemo(() => {
    return organizations?.organizations ?? [];
  }, [organizations]);

  function handleActions(status, element) {
    if (status === "delete") {
      organizationService.deleteElement(element.id).then((res) => {
        dispatch(showAlert({ title: "Успешно удалено", type: "success" }));
        refetch();
      });
    } else {
      navigateTo(`organization/update/${element.id}`);
    }
  }

  const headColumns = useMemo(() => {
    return [
      {
        id: "index",
        width: 50,
        textAlign: "center",
      },
      {
        title: "Наименование",
        id: "name",
      },
      {
        title: "Кэшбек on",
        id: "cashback_out",
        filter: true,
      },
      {
        title: "Кэшбек in",
        id: "cashback_in",
        filter: true,
      },
      {
        title: "Номер телефона",
        id: "phone_number",
      },
      {
        title: "Действия",
        id: "actions",
        textAlign: "center",
        click: "custom",
        width: 100,
      },
    ];
  }, []);

  return (
    <>
      <Header
        title="Организации"
        extra={
          <CreateButton onClick={() => navigateTo("organization/create")} />
        }
      />
      <FormCard>
        <div className={cls.extraHeader}>
          <SearchInput width={500} styles={{ width: "300px" }} />

          <COptimizedRangePicker
            onChange={(val) => setCalendar(val)}
            value={calendar}
          />
        </div>
        <CTable
          outerPadding="0"
          headColumns={headColumns}
          bodyColumns={List}
          clickable={true}
          idForTable={currentTab}
          count={organizations?.count}
          currentPage={currentPage}
          currentLimit={currentLimit}
          isLoading={isLoading}
          handleActions={handleActions}
          handleRowClick={(i) => navigateTo(`restaurants`)}
        />
      </FormCard>
    </>
  );
}
