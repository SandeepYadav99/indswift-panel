import React, { useMemo, useState } from "react";
import styles from "./Style.module.css";
import { removeUnderScore } from "../../../../../helper/helper";

const CustomTable = ({ columns, data, title, prevYear, sheetData , isSheet}) => {
  const renderCell = (item, column) => {
    if (typeof column.render === "function") {
      return column.render(item);
    }
    return item[column.key];
  };

  const reducedPercentageSum = useMemo(
    () =>
      data?.reduce((acc, item) => {
        return acc + item?.ratings?.percentage || 0;
      }, 0),
    [data]
  );

  const averagePercentage = reducedPercentageSum / data?.length;

  const reducedPrevYearPercentageSum = useMemo(
    () =>
      prevYear?.reduce((acc, item) => {
        return acc + item?.ratings?.percentage || 0;
      }, 0),
    [prevYear]
  );

  const averagePrevYear = reducedPrevYearPercentageSum / prevYear?.length;

  const changeBy = averagePercentage - averagePrevYear;

  const changeBySheed =
    sheetData?.final_rating - sheetData?.last_year_final_rating;

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
              <>
                <td key={column.key} className={styles.columData}>
                  {renderCell(
                    column?.dataSource ? column?.dataSource[index] : item,
                    column
                  )}
                </td>
              </>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className={styles.blueField}>
          <td className={styles.columData}>
            <div className={styles.labelhead}>Total</div>
          </td>
          <td className={styles.columData}>
            <div className={styles.label}>
              {isSheet
                ? sheetData?.last_year_final_rating
                : averagePrevYear?.toFixed(2)}
              %
            </div>
          </td>
          <td className={styles.columData}>
            <div className={styles.label}>
              {" "}
              {isSheet
                ? sheetData?.final_rating
                : averagePercentage?.toFixed(2)}
              %
            </div>
          </td>
        </tr>
        <tr className={styles.blueField}>
          <td className={styles.columData}>
            <div className={styles.label}>Change By </div>
          </td>

          <td className={styles.columData} colSpan="2">
            <div className={styles.label}>
              {isSheet
                ? changeBySheed.toFixed(2)
                : changeBy?.toFixed(2)}
              %
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

function AwardTable({ data, title, prevYear, sheetData , isSheet}) {
  const [columns, setColumns] = useState([
    {
      key: "test",
      title: "",
      render: (all) => (
        <div className={styles.labelhead}>{removeUnderScore(all?.title)}</div>
      ),
    },
    {
      key: sheetData?.last_year,
      title: sheetData?.last_year,
      dataSource: prevYear,
      render: (all) => (
        <div className={styles.label}>{all?.ratings?.percentage}%</div>
      ),
    },
    {
      key: sheetData?.year,
      title: sheetData?.year,
      
      dataSource: data,
      render: (all) => (
        <div className={styles.label}>{all?.ratings?.percentage}%</div>
      ),
    },
  ]);
  return (
    <div>
      {
        <CustomTable
          title={title}
          columns={columns}
          data={data}
          prevYear={prevYear}
          sheetData={sheetData}
          isSheet={isSheet}
        />
      }
    </div>
  );
}

export default AwardTable;
