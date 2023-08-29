import React, { useState } from "react";
import styles from "./Style.module.css";
import { removeUnderScore } from "../../../../../helper/helper";

const CustomTable = ({ columns, data, title, form, changeTextData,afterAmount }) => {
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
          {columns?.map((column) =>
            column.key === "test" ? (
              <th key={column.key}>{column.title}</th>
            ) : (
              <th key={column.key} className={styles.thead}>
                {`${column.title} Above loan`}
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
            {item.key !== "Current Outstanding" &&
              columns?.map((column) => (
                <td key={column.key} className={styles.columData}>
                  {renderCell(item, column)}
                </td>
              ))}
          </tr>
        ))}

        {/* {data.length !== 5 && ( */}
        <tr>
          <td className={styles.columData}>
            <div className={styles.labelhead}>Current Outstanding</div>
          </td>
          <td className={styles.columData}>
            <input
              type="number"
              min={0}
              className={styles.inputWrapper}
              name="table_amount"
              value={form?.table_amount}
              onChange={(e) => changeTextData(e.target.value, "table_amount")}
            />
          </td>
          <td className={styles.columData}>
            <div className={styles.label}>{afterAmount}</div>
          </td>
        </tr>
        {/* )} */}
      </tbody>
    </table>
  );
};

function LoanTable({ data, title, form, changeTextData,afterAmount }) {
  const [columns, setColumns] = useState([
    {
      key: "test",
      title: "",
      render: (all) => (
        <div className={styles.labelhead}>{removeUnderScore(all?.key)}</div>
      ),
    },
    {
      key: "2023",
      title: "Before",
      render: (all) => <div className={styles.label}>{all?.before}</div>,
    },
    {
      key: "",
      title: "After",
      render: (all) => <div className={styles.label}>{all?.after}</div>,
    },
  ]);
  return (
    <div className={styles.tableWrap}>
      {
        <CustomTable
          title={title}
          columns={columns}
          data={data}
          form={form}
          changeTextData={changeTextData}
          afterAmount={afterAmount}
        />
      }
    </div>
  );
}

export default LoanTable;
