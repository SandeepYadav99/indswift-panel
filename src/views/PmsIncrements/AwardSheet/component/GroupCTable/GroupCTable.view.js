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

function GroupCTable({ data, title }) {
  const [columns, setColumns] = useState([
    {
      key: "title",
      title: "Title",
      render: (all) => (
        <div className={styles.label}>{all?.label}</div>
      ),
    },
    {
      key: "self",
      title: "Self",
      render: (all) => <div className={styles.label}>{all?.self}</div>,
    },
    {
      key: "others",
      title: "Others",
      render: (all) => <div className={styles.label}>{all?.others}</div>,
    },
    {
      key: "variance",
      title: "Variance",
      render: (all) => <div className={styles.label}>{(all?.self - all?.others).toFixed(2)}</div>,
    },
  ]);
  return (
    <div>{<CustomTable title={title} columns={columns} data={data} />}</div>
  );
}

export default GroupCTable;
