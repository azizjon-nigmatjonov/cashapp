import { Paper } from "@mui/material";
import { forwardRef } from "react";
import CPagination from "../../CPagination";
import EmptyDataComponent from "../../../EmptyDataComponent";
import TableLoader from "../../../TableLoader/index";
import { DeleteRounded, BorderColorRounded } from "@mui/icons-material";
import "./style.scss";

export const CTableWrapper = ({
  loader,
  height,
  count,
  currentLimit,
  passRouter,
  limitCount,
  currentPage,
  tableStyle = {},
  wrapperStyle = {},
  setCurrentLimit,
  setCurrentPage,
  disablePagination = false,
  children,
}) => {
  return (
    <Paper className="CTableContainer" style={wrapperStyle}>
      <div
        className="table"
        style={{
          height: height ? height : "auto",
          overflow: loader ? "hidden" : "auto",
          ...tableStyle,
        }}
      >
        <table id="resizeMe">{children}</table>
      </div>

      {!disablePagination && (
        <CPagination
          currentPage={currentPage}
          count={count}
          limit={currentLimit}
          limitCount={limitCount}
          passRouter={passRouter}
          setCurrentPage={setCurrentPage}
          setCurrentLimit={setCurrentLimit}
        />
      )}
    </Paper>
  );
};

export const CTableHead = ({ children }) => {
  return <thead className="CTableHead">{children}</thead>;
};

export const CTableHeadRow = ({ children }) => {
  return <tr className="CTableHeadRow">{children}</tr>;
};

export const CTableHeadCell = ({
  children,
  className = "",
  buttonsCell = false,
  ...props
}) => {
  return <th {...props}>{children}</th>;
};
export const CTableBody = forwardRef(
  ({
    children,
    columnsCount,
    rowsCount,
    loader,
    ref,
    dataLength,
    ...props
  }) => {
    return (
      <>
        <TableLoader
          isVisible={loader}
          columnsCount={columnsCount}
          rowsCount={rowsCount}
        />

        <tbody className="CTableBody" {...props} ref={ref}>
          {children}
          <EmptyDataComponent
            columnsCount={columnsCount}
            isVisible={dataLength < 1 && !loader}
          />
        </tbody>
      </>
    );
  }
);

export const CTableRow = ({ children, className, ...props }) => {
  return (
    <tr className={`CTableRow ${className}`} {...props}>
      {children}
    </tr>
  );
};

export const TableDelete = ({ item, handleActions = () => {} }) => {
  return (
    <div id="tableActions">
      <div className="delete">
        <DeleteRounded onClick={() => handleActions("delete", item)} />
      </div>
      <div className="edit">
        <BorderColorRounded onClick={() => handleActions("edit", item)} />
      </div>
    </div>
  );
};

export const CTableCell = ({
  children,
  className = "",
  buttonsCell = false,
  ...props
}) => {
  return (
    <td
      className={`CTableCell ${className} ${buttonsCell ? "buttonsCell" : ""}`}
      {...props}
    >
      {children}
    </td>
  );
};
