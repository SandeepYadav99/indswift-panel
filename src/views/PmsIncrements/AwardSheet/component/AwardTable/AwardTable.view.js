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
        {title && (
          <tr>
            <th></th>
            <th colspan="2" className={styles.theadTitle}>
              {title}
            </th>
          </tr>
        )}

        <tr>
          {columns?.map((column) =>
            column.key === "test" ? (
              <th key={column.key}>{column.title}</th>
            ) : (
              <th key={column.key} className={styles.thead}>
                {column.title}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr
            key={index}
            className={
              item?.key === "avg" || item?.key === "count"
                ? styles.blueField
                : styles.evenRow
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

function AwardTable({ data, title }) {
  const [columns, setColumns] = useState([
    {
      key: "test",
      title: "",
      render: (all) => (
        <div className={styles.label}>Job Knowledge & Cost Conscs</div>
      ),
    },
    {
      key: "2023",
      title: "2023",
      render: (all) => <div className={styles.label}>{all?.normalized}</div>,
    },
    {
      key: "2023",
      title: "2023",
      render: (all) => <div className={styles.label}>{all?.normalized}</div>,
    },
  ]);
  return (
    <div>{<CustomTable title={title} columns={columns} data={data} />}</div>
  );
}

export default AwardTable;
