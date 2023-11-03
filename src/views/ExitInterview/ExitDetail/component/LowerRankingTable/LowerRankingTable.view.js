import React, { useMemo, useState } from "react";
import styles from "./Style.module.css";
import { removeUnderScore } from "../../../../../helper/helper";

const CustomTable = ({ columns, data, title }) => {
  const renderCell = (item, column) => {
    if (typeof column.render === "function") {
      return column.render(item);
    }
    return item[column.key];
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns?.map((column) => (
            <th key={column.key} className={styles.thead}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
          >
            {columns?.map((column) => (
              <td key={column.key} className={styles.columData}>
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function LowerRankingTable({ data }) {
  const sortedData = useMemo(
    () =>
      data?.length > 0
        ? [...data].sort((a, b) => a.percentage - b.percentage)
        : [],
    [data]
  );
  const [columns, setColumns] = useState([
    {
      key: "reson",
      title: "Reason",
      render: (all) => <div className={styles.label}>{all?.level}</div>,
    },
    {
      key: "rank",
      title: "Rank",
      render: (all) => <div className={styles.label}>{all?.percentage}</div>,
    },
    {
      key: "status",
      title: "Status of Parameter in ISLL",
      render: (all) => (
        <div className={styles.label}>{removeUnderScore(all?.count)}</div>
      ),
    },
  ]);
  return <div>{<CustomTable columns={columns} data={sortedData} />}</div>;
}

export default LowerRankingTable;
