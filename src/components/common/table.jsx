import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ sortColumn, columns, onSort, data }) => {
  return (
    <table className="table">
      <TableHeader sortColumn={sortColumn} columns={columns} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
