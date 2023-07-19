import React, { useMemo, useState } from "react";
import styles from "./Style.module.css";

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
          <th colspan="3" className={styles.theadTitle}>
            {title}
          </th>
        </tr>
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
            className={
              item?.key === "avg" || item?.key === "count"
                ? styles.blueField
                : index % 2 === 0
                ? styles.evenRow
                : styles.oddRow
            }
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

function SlabTable({ data, title, shouldHideAvg }) {
  const graphData = useMemo(() => {
    return shouldHideAvg ? [...data].slice(0, 14) : data;
  }, [data, shouldHideAvg]);

  const [columns, setColumns] = useState([
    {
      key: "level",
      title: "Level",
      render: (all) => (
        <div className={styles.label}>
          {shouldHideAvg && (all?.key === "avg" || all?.key === "count")
            ? ""
            : all?.level}
        </div>
      ),
    },
    {
      key: "result",
      title: "Result",
      render: (all) => <div className={styles.label}>{all?.percentage}</div>,
    },
    {
      key: "count",
      title: "Count",
      render: (all) => <div className={styles.label}>{all?.count}</div>,
    },
  ]);
  return (
    <div>
      {<CustomTable title={title} columns={columns} data={graphData} />}
    </div>
  );
}

export default SlabTable;
