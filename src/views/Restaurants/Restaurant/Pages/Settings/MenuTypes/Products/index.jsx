import { useMemo } from "react";
import CTable from "../../../../../../../components/CElements/CTable";
import { useGetQueries } from "../../../../../../../hooks/useQueries";
import { useQuery } from "react-query";
import usePageRouter from "../../../../../../../hooks/useObjectRouter";
import FormCard from "../../../../../../../components/FormCard";
import Header from "../../../../../../../components/Header";
import CBreadcrumbs from "../../../../../../../components/CElements/CBreadcrumbs";
import CreateButton from "../../../../../../../components/Buttons/CreateButton";
import productService from "../../../../../../../services/productService";
import CRSwitch from "../../../../../../../components/CElements/CRSwitch";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../../../../store/alert/alert.thunk";
import { useParams } from "react-router-dom";

const breadCrumbItems = [
  {
    label: "Виды меню",
    link: -1,
  },
  {
    label: "Продукты",
  },
];

export default function Products({ currentTab }) {
  const { menu_id } = useParams();
  const { currentLimit, currentPage } = useGetQueries();
  const { navigateTo } = usePageRouter();
  const dispatch = useDispatch();

  const params = useMemo(() => {
    const currentpage = parseInt(currentPage) || 1;
    const limit = parseInt(currentLimit) || 10;
    let result = {};
    result.offset = (currentpage - 1) * 10;
    result.limit = limit;
    result.menu_id = menu_id;

    return result;
  }, [currentPage, currentLimit, menu_id]);

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery(
    ["GET_PRODUCTS_LIST", params],
    () => {
      return productService.getList({ ...params });
    },
    {
      enabled: !!params.menu_id,
    }
  );

  function handleActions(status, element) {
    if (status === "delete") {
      productService.deleteElement(element.id).then((res) => {
        dispatch(showAlert({ title: "Успешно удалено", type: "success" }));
        refetch();
      });
    } else {
      navigateTo(`product/${element.id}/${menu_id}`);
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
        title: "Название",
        id: "title",
      },
      {
        title: "Цена блюд",
        id: "price",
      },
      {
        title: "Категория блюд",
        id: "category",
        render: (category) => {
          return <>{category?.title}</>;
        },
      },
      {
        title: "Статус",
        id: "active",
        width: 100,
        render: (val) => {
          return <CRSwitch checked={val} disabled={true} />;
        },
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
        title="Список продуктов"
        extra={
          <CreateButton
            onClick={() => navigateTo(`product/create/${menu_id}`)}
          />
        }
      >
        <CBreadcrumbs items={breadCrumbItems} type="link" progmatic={true} />
      </Header>
      <FormCard>
        <CTable
          outerPadding="0"
          headColumns={headColumns}
          bodyColumns={products?.products}
          clickable={true}
          idForTable={currentTab}
          count={products?.count}
          currentPage={currentPage}
          currentLimit={currentLimit}
          isLoading={isLoading}
          handleActions={handleActions}
          handleRowClick={(el) => navigateTo(`product/${el.id}/${menu_id}`)}
        />
      </FormCard>
    </>
  );
}
