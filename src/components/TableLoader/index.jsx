import { Skeleton } from "@mui/material";
import { useMemo } from "react";
import "./style.scss";

const TableLoader = ({
  isVisible = false,
  columnsCount = 1,
  rowsCount = 10,
}) => {
  const columns = useMemo(() => {
    return new Array(columnsCount).fill(0);
  }, [columnsCount]);

  const rows = useMemo(() => {
    return new Array(rowsCount).fill(0);
  }, [rowsCount]);

  if (!isVisible) return null;

  return (
    <div className="ctableLoader">
      <div className="wrapper">
        {rows?.map((i, index) => (
          <div className="row" key={index}>
            <Skeleton />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableLoader;
