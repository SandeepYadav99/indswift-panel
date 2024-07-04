import React, { useMemo, useState } from "react";
import styles from "./Style.module.css";
import { removeUnderScore } from "../../../../../helper/helper";

const CustomTable = ({
  columns,
  currentYearData,
  title,
  prevYearData,
  sheetData,
  isSheet,
}) => {
  const renderCell = (item, column) => {
    if (typeof column.render === "function") {
      return column.render(item);
    }
    return item[column.key];
  };

  const reducedPercentageSum = useMemo(
    () =>
      currentYearData?.reduce((acc, item) => {
        return acc + item?.ratings?.percentage || 0;
      }, 0),
    [currentYearData]
  );

  const averagePercentage = reducedPercentageSum / currentYearData?.length;

  const reducedPrevYearPercentageSum = useMemo(
    () =>
      prevYearData?.reduce((acc, item) => {
        return acc + item?.ratings?.percentage || 0;
      }, 0),
    [prevYearData]
  );

  const averagePrevYear = reducedPrevYearPercentageSum / prevYearData?.length;

  const changeBy = averagePercentage || 0 - averagePrevYear || 0;

  const changeBySheed =
    sheetData?.final_rating || 0 - sheetData?.last_year_final_rating || 0;

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
              <th
                key={column.key}
                colSpan={
                  column.key === "test" ? 1 : columns?.length > 2 ? 1 : 2
                }
                className={styles.thead}
              >
                {column.title}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {currentYearData?.map((item, index) => (
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
                <td
                  key={column.key}
                  className={styles.columData}
                  colSpan={
                    column.key === "test" ? 1 : columns?.length > 2 ? 1 : 2
                  }
                >
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
          {sheetData?.last_year || averagePrevYear ? (
            <td className={styles.columData}>
              <div className={styles.label}>
                {isSheet
                  ? sheetData?.last_year_final_rating
                  : averagePrevYear?.toFixed(2)}
                %
              </div>
            </td>
          ) : (
            ""
          )}
          {sheetData?.year || averagePercentage ? (
            <td className={styles.columData}>
              <div className={styles.label}>
                {" "}
                {isSheet
                  ? sheetData?.final_rating
                  : averagePercentage?.toFixed(2)}
                %
              </div>
            </td>
          ) : (
            ""
          )}
        </tr>
        <tr className={styles.blueField}>
          <td className={styles.columData}>
            <div className={styles.label}>Change By </div>
          </td>

          <td className={styles.columData} colSpan="2">
            <div className={styles.label}>
              {isSheet ? changeBySheed.toFixed(2) : changeBy?.toFixed(2)}%
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

function AwardTable({
  currentYearData,
  title,
  prevYearData,
  sheetData,
  isSheet,
}) {
  const [columns, setColumns] = useState([
    {
      key: "test",
      title: "",
      render: (all) => (
        <div className={styles.labelhead}>{removeUnderScore(all?.title)}</div>
      ),
    },
    ...(sheetData?.last_year
      ? [
          {
            key: "2023",
            title: "2023",
            dataSource: prevYearData,
            render: (all) => (
              <div className={styles.label}>{all?.ratings?.percentage}%</div>
            ),
          },
        ]
      : []),
    ...(sheetData?.year
      ? [
          {
            key: "2024",
            title: "2024",

            dataSource: currentYearData,
            render: (all) => (
              <div className={styles.label}>{all?.ratings?.percentage}%</div>
            ),
          },
        ]
      : []),
  ]);
  return (
    <div>
      {
        <CustomTable
          title={title}
          columns={columns}
          currentYearData={currentYearData}
          prevYearData={prevYearData}
          sheetData={sheetData}
          isSheet={isSheet}
        />
      }
    </div>
  );
}

export default AwardTable;
