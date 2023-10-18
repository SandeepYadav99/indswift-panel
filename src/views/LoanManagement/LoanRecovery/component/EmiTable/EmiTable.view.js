import React, { useMemo, useState } from "react";
import styles from "./Style.module.css";

const CustomTable = ({ columns, data }) => {
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
            className={
              data?.length === index + 1
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

function GraphTable({ data, title }) {
  const [columns, setColumns] = useState([
    {
      key: "no",
      title: "SR. NO.",
      sortable: false,
      render: (all) => <div className={styles.label}>{all?.SR_No}</div>,
    },
    {
      key: "amount",
      title: "LOAN AMOUNT",
      sortable: false,
      render: (all) => (
        <div className={styles.label}>
          {all?.amountRemaining === "Total"
            ? all?.amountRemaining
            : `₹ ${all?.amountRemaining}`}
        </div>
      ),
    },
    {
      key: "emi",
      title: "EMI",
      sortable: false,
      render: (all) => (
        <div className={styles.label}>{all?.EMI && `₹ ${all?.EMI}`}</div>
      ),
    },
    {
      key: "interest",
      title: "INTEREST",
      sortable: false,
      render: (all) => (
        <div className={styles.label}>
          {all?.Interest && `₹ ${all?.Interest} `}
        </div>
      ),
    },
    {
      key: "principal",
      title: "PRINCIPAL",
      sortable: false,
      render: (all) => (
        <div className={styles.label}>
          {all?.Principal && `₹ ${all?.Principal}`}
        </div>
      ),
    },
    {
      key: "out",
      title: "OUTSTATION",
      sortable: false,
      render: (all) => (
        <div className={styles.label}>
          {all?.Outstation && `₹ ${all?.Outstation}`}
        </div>
      ),
    },
    {
      key: "date",
      title: "DATE",
      sortable: false,
      render: (all) => (
        <div className={styles.label}>{all?.loanSubmissionDate}</div>
      ),
    },
  ]);
  return (
    <div>{<CustomTable title={title} columns={columns} data={data} />}</div>
  );
}

export default GraphTable;
