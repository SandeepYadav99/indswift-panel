import React, { useMemo, useState } from "react";
import styles from "./Style.module.css";
import { removeUnderScore } from "../../../../../helper/helper";

const CustomTable = ({ columns, data, title , prevYear, sheetData}) => {
  const renderCell = (item, column) => {
    if (typeof column.render === "function") {
      return column.render(item);
    }
    return item[column.key];
  };
  let reducedPercentageSum = data?.reduce((acc, item) => {
    return acc + item?.ratings?.percentage || 0;
  }, 0);
  let averagePercentage = reducedPercentageSum / data?.length;
  console.log(averagePercentage)

  let reducedPrevYearPercentageSum = prevYear?.reduce((acc, item) => {
    return acc + item?.ratings?.percentage || 0;
  }, 0);
  let averagePrevYear = reducedPrevYearPercentageSum / prevYear?.length;

  const changeBy = averagePercentage - averagePrevYear
  const renderTableBody = () => (
    <>
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
            (column?.key === "2023") ? <td></td> :
          <td key={`${item.key}-${column.key}`} className={styles.columData}>
            {renderCell(item, column)}
            
          </td>
        ))}

        </tr>
      ))}
      {prevYear?.map((prevItem, index) => (
        <tr
          key={`${prevItem.key}-${index}`}
          className={
            prevItem?.key === "avg" || prevItem?.key === "count"
              ? styles.blueField
              : styles.evenRow
          }
        >
{columns?.map((column) => {
          if (column.key === "2023") {
            return (
              <td key={`${prevItem.key}-${column.key}`} className={styles.columData}>
                {renderCell(prevItem, column)}
              </td>
            );
          } else {
            return (
              <td key={`${prevItem.key}-${column.key}`} className={styles.columData}></td>
            );
          }
        })}
        </tr>
      ))}
    </>
  );

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
        {/* {data?.map((item, index) => (
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
        ))} */}
         {/* {prevYear?.map((prevItem, index) => (
          <tr
            key={index}
            className={
              prevItem?.key === "avg" || prevItem?.key === "count"
                ? styles.blueField
                : styles.evenRow
            }
          >
            {columns?.map((column) => (
              <td key={column.key} className={styles.columData}>
                {renderCell(prevItem, column)}
              </td>
            ))}
          </tr>
        ))} */}
        {renderTableBody()}
      </tbody>
      <tfoot>
        <tr className={styles.blueField}>
          <td className={styles.columData}>
            <div className={styles.labelhead}>Total</div>
          </td>
          <td className={styles.columData}>
            <div className={styles.label}>
             {averagePrevYear?.toFixed(2)}
             
            </div>
          </td>
          <td className={styles.columData}>
            <div className={styles.label}>  {averagePercentage?.toFixed(2)}</div>
          </td>
        </tr>
        <tr className={styles.blueField}>
          <td className={styles.columData}>
            <div className={styles.label}>Change By </div>
          </td>

          <td className={styles.columData} colSpan="2">
            <div className={styles.label}>{changeBy?.toFixed(2)}%</div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

function AwardTable({ data, title, prevYear, sheetData}) {
  const [columns, setColumns] = useState([
    {
      key: "test",
      title: "",
      render: (all) => (
        <div className={styles.labelhead}>{removeUnderScore(all?.title)}</div>
      ),
    },
    {
      key: "2023",
      title: "2023",
      render: (all) => (
        <div className={styles.label}>{all?.ratings?.percentage}%</div>
      ),
    },
    {
      key: "2024",
      title: "2024",
      render: (all) => (
        <div className={styles.label}>{all?.ratings?.percentage}%</div>
      ),
    },
  ]);
  return (
    <div>{<CustomTable title={title} columns={columns} data={data} prevYear={prevYear} sheetData={sheetData}/>}</div>
  );
}

export default AwardTable;
