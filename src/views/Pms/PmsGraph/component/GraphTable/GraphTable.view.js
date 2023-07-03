import React, { useState } from "react";
import styles from "./Style.module.css";

const CustomTable = ({ columns, data ,title}) => {
  console.log("0000>", columns, data);
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
            className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
          >
            {columns?.map((column) => (
              <td key={column.key} className={styles.columData}>{renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function GraphTable({ data ,title}) {
  const [columns, setColumns] = useState([
    {
      key: "score",
      title: "Score",
      render: (all) => <div className={styles.label}>{all.key}</div>,
    },
    {
      key: "recieved",
      title: "As Recieved",
      render: (all) => <div className={styles.label}>{all.normalized}</div>,
    },
    {
      key: "normalizes",
      title: "Normalized",
      render: (all) => <div className={styles.label}>{all.received}</div>,
    },
  ]);
  return <div>{<CustomTable title ={title} columns={columns} data={data} />}</div>;
}

export default GraphTable;
