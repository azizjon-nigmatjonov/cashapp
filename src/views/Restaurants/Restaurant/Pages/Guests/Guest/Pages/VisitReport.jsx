import { useMemo } from "react";
import CTable from "../../../../../../../components/CElements/CTable";
import { ArrowUpwardRounded, ArrowDownwardRounded } from "@mui/icons-material";
import { websiteActions } from "../../../../../../../store/website/website.slice";
import { useDispatch } from "react-redux";
export default function GuestVisitReportPage() {
  const dispatch = useDispatch();

  const flexStyles = useMemo(() => {
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    };
  }, []);

  const headColumns = useMemo(() => {
    return [
      {
        id: "index",
        width: 50,
      },
      {
        title: "Ресторан",
        width: 300,
        id: "name",
      },
      {
        title: "Дата",
        id: "start_date",
      },
      {
        title: "Счет",
        id: "payment",
      },
      {
        title: "Кешбек on",
        id: "cash_on",
        renderHead: () => {
          return (
            <div style={flexStyles}>
              Кэшбек on <ArrowUpwardRounded style={{ color: "#22c55e" }} />
            </div>
          );
        },
      },
      {
        title: "Кэшбек in",
        id: "cash_in",
        renderHead: () => {
          return (
            <div style={flexStyles}>
              Кэшбек in <ArrowDownwardRounded style={{ color: "#ed0101" }} />
            </div>
          );
        },
      },
    ];
  }, [flexStyles]);

  const bodyColumns = useMemo(() => {
    return [
      {
        index: 1,
        name: "Volidam",
        start_date: "01.02.2023",
        payment: 12000,
        cash_on: 200,
        cash_in: 300,
      },
    ];
  }, []);

  return (
    <CTable
      outerPadding="0"
      headColumns={headColumns}
      bodyColumns={bodyColumns}
      clickable={true}
      handleRowClick={(item) =>
        dispatch(
          websiteActions.setLogoutModal({ step: "visit_report", data: item })
        )
      }
    />
  );
}
