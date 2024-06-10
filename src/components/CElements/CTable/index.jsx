import { TableRow } from "@mui/material";
import "./style.scss";
import {
  CTableHeadCell,
  CTableCell,
  CTableWrapper,
  CTableHead,
  CTableRow,
  CTableBody,
} from "./Details";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { tableSizeAction } from "../../../store/tableSize/tableSizeSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { TableDelete } from "./Details";
import CFilter from "../CFilter";
import { useGetQueries } from "../../../hooks/useQueries";

export default function CTable({
  count = 1,
  currentLimit = 10,
  currentPage = 1,
  clickable = false,
  isLoading = false,
  passRouter = true,
  isResizeble = true,
  limitCount = [10, 30, 50],
  headColumns = [],
  bodyColumns = [],
  setCurrentLimit = () => {},
  setCurrentPage = () => {},
  handleRowClick = () => {},
  handleActions = () => {},
  idForTable,
  disablePagination = false,
  autoHeight = false,
}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const tableSize = useSelector((state) => state.tableSize.tableSize);
  const tableSettings = useSelector((state) => state.tableSize.tableSettings);
  const [headColHeight, setHeadColHeight] = useState(45);
  const [tableHeight, setTableHeight] = useState(500);
  const { currentSort } = useGetQueries();

  const bodySource = useMemo(() => {
    if (!bodyColumns?.length) return [];

    return (
      bodyColumns?.map((item, index) => ({
        ...item,
        index:
          currentPage > 1
            ? currentPage * currentLimit - currentLimit + (index + 1)
            : index + 1,
      })) ?? []
    );
  }, [bodyColumns, currentLimit, currentPage]);

  const pageName = useMemo(() => {
    const strLen =
      location.pathname.split("/")[2].length +
      location.pathname.split("/")[1].length;
    let result = location.pathname.substring(0, strLen + 2);
    if (idForTable) result = result + "/" + idForTable;
    return result;
  }, [location, idForTable]);

  useEffect(() => {
    if (!isResizeble) return;
    const createResizableTable = function (table) {
      if (!table) return;
      const cols = table.querySelectorAll("th");
      [].forEach.call(cols, function (col, idx) {
        // Add a resizer element to the column
        const resizer = document.createElement("span");
        resizer.classList.add("resizer");
        // Set the height
        resizer.style.height = `${table.offsetHeight}px`;

        col.appendChild(resizer);
        setHeadColHeight(col.offsetHeight);
        createResizableColumn(col, resizer, idx);
      });
    };

    const createResizableColumn = function (col, resizer, idx) {
      let x = 0;
      let w = 0;

      const mouseDownHandler = function (e) {
        x = e.clientX;

        const styles = window.getComputedStyle(col);
        w = parseInt(styles.width, 10);

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);

        resizer.classList.add("resizing");
      };

      const mouseMoveHandler = function (e) {
        const dx = e.clientX - x;
        const colID = col.getAttribute("id");
        const colWidth = w + dx;
        dispatch(tableSizeAction.setTableSize({ pageName, colID, colWidth }));
        dispatch(
          tableSizeAction.setTableSettings({
            pageName,
            colID,
            colWidth,
            isStiky: "ineffective",
            colIdx: idx - 1,
          })
        );
        col.style.width = `${colWidth}px`;
      };

      const mouseUpHandler = function () {
        resizer.classList.remove("resizing");
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      };

      resizer.addEventListener("mousedown", mouseDownHandler);
    };

    createResizableTable(document.getElementById("resizeMe"));
  }, [bodySource]);

  const calculateWidth = (colId, index) => {
    const colIdx = tableSettings?.[pageName]
      ?.filter((item) => item?.isStiky === true)
      ?.findIndex((item) => item?.id === colId);

    if (index === 0) {
      return 0;
    } else if (colIdx === 0) {
      return 0;
    } else if (
      tableSettings?.[pageName]?.filter((item) => item?.isStiky === true)
        .length === 1
    ) {
      return 0;
    } else {
      return tableSettings?.[pageName]
        ?.filter((item) => item?.isStiky === true)
        ?.slice(0, colIdx)
        ?.reduce((acc, item) => acc + item?.colWidth, 0);
    }
  };

  const handleAutoSize = (colID, colIdx) => {
    dispatch(
      tableSizeAction.setTableSize({ pageName, colID, colWidth: "auto" })
    );
    const element = document.getElementById(colID);
    element.style.width = "auto";
    element.style.minWidth = "auto";
    dispatch(
      tableSizeAction.setTableSettings({
        pageName,
        colID,
        colWidth: element.offsetWidth,
        isStiky: "ineffective",
        colIdx,
      })
    );
  };

  function handleGetHeightFn() {
    if (autoHeight) {
      setTableHeight(0);
      return;
    }
    let res = 0;
    bodySource?.forEach((item) => {
      if (item?.ref) {
        res = res + item.ref.offsetHeight;
      }
    });
    const currentHeight = res + headColHeight + 2;
    if (currentHeight && currentHeight > 400) setTableHeight(currentHeight);
    else setTableHeight(500);
  }

  function handleBodycolRef(item, e) {
    if (!e) return;
    item.ref = e;

    if (item?.index === bodySource?.length) {
      handleGetHeightFn();
    }
  }

  return (
    <div id="table">
      <CTableWrapper
        count={count}
        currentLimit={currentLimit}
        loader={isLoading}
        height={tableHeight}
        limitCount={limitCount}
        passRouter={passRouter}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setCurrentLimit={setCurrentLimit}
        disablePagination={disablePagination}
      >
        <CTableHead>
          <CTableRow>
            {headColumns?.map((column, index) => (
              <CTableHeadCell
                id={column.id}
                key={column?.innerId ? column.innerId : column.id || index}
                style={{
                  padding: "10px 4px",
                  minWidth: tableSize?.[pageName]?.[column.id]
                    ? tableSize?.[pageName]?.[column.id]
                    : column?.width
                    ? column.width
                    : "auto",
                  width: tableSize?.[pageName]?.[column.id]
                    ? tableSize?.[pageName]?.[column.id]
                    : column?.width
                    ? column.width
                    : "auto",
                  position: tableSettings?.[pageName]?.find(
                    (item) => item?.id === column?.id
                  )?.isStiky
                    ? "sticky"
                    : "relative",
                  left: tableSettings?.[pageName]?.find(
                    (item) => item?.id === column?.id
                  )?.isStiky
                    ? calculateWidth(column?.id, index)
                    : "0",
                  backgroundColor: "#fff",
                  zIndex: tableSettings?.[pageName]?.find(
                    (item) => item?.id === column?.id
                  )?.isStiky
                    ? "1"
                    : "",
                }}
              >
                <div style={{ textAlign: column?.textAlign || "left" }}>
                  {column.renderHead
                    ? Array.isArray(column.renderHead)
                      ? column.renderHead(
                          column.renderHead.map((data) => column[data])
                        )
                      : column.renderHead()
                    : column?.id === "index"
                    ? "№"
                    : column.title}

                  {column?.filter && (
                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <CFilter
                        currentSort={currentSort}
                        up={`up_${column.id}`}
                        down={`down_${column.id}`}
                      />
                    </div>
                  )}
                </div>
              </CTableHeadCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody
          loader={isLoading}
          columnsCount={headColumns?.length}
          rowsCount={currentLimit}
          dataLength={bodySource || bodySource?.length}
        >
          {bodySource?.length
            ? bodySource?.map((item, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  ref={(e) => handleBodycolRef(item, e)}
                  className={clickable ? "clickable" : ""}
                >
                  {headColumns.map((column, colIndex) => (
                    <CTableCell
                      key={colIndex}
                      className={`overflow-ellipsis ${tableHeight}`}
                      onClick={() => {
                        if (clickable && column?.click !== "custom")
                          handleRowClick(item);
                      }}
                      style={{
                        minWidth: "max-content",
                        padding: "0 4px",
                        position: tableSettings?.[pageName]?.find(
                          (item) => item?.id === column?.id
                        )?.isStiky
                          ? "sticky"
                          : "relative",
                        left: tableSettings?.[pageName]?.find(
                          (item) => item?.id === column?.id
                        )?.isStiky
                          ? calculateWidth(column?.id, colIndex)
                          : "0",
                        backgroundColor: "#fff",
                        zIndex: tableSettings?.[pageName]?.find(
                          (item) => item?.id === column?.id
                        )?.isStiky
                          ? "1"
                          : "",
                      }}
                    >
                      <div
                        style={{
                          textAlign: column?.textAlign || "left",
                        }}
                      >
                        {column.render
                          ? Array.isArray(column.id)
                            ? column.render(column.id.map((data) => item[data]))
                            : column.render(item[column.id])
                          : item[column.id]}
                        {column.id === "actions" && (
                          <TableDelete
                            item={item}
                            handleActions={handleActions}
                          />
                        )}
                      </div>
                    </CTableCell>
                  ))}
                </TableRow>
              ))
            : ""}
        </CTableBody>
      </CTableWrapper>
    </div>
  );
}
