import React from "react";
import styles from "./Style.module.css";
const TableView = ({ tableDatas }) => {
  const groupedData = tableDatas?.groupedData;

  return (
    <div>
      <table className={styles.myTable}>
        <thead>
          <tr>
            <th colSpan="2" style={{ border: "none" }}>
              {" "}
            </th>
            <th colSpan="3" className={styles.bgColor4Cols}>
              BGV STATUS
            </th>
            <th colSpan="5" className={styles.bgColor4Cols}>
              BGV RESULT
            </th>
            <th colSpan="7" className={styles.bgColor4Cols}>
              PAYMENT STATUS
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className={styles.bgColorRow}>
            <td>Month</td>
            <td>No. of Classes</td>
            <td>Completed</td>
            <td>In-Complete</td>
            <td>Total</td>
            <td>Clear</td>
            <td>Failed</td>

            <td>Unable to Verify</td>
            <td>Pending</td>
            <td>Total</td>
            <td>Clear</td>
            <td>Pending</td>
            <td>In- Process</td>
            <td>Total</td>
          </tr>

          {groupedData &&
            Object.keys(groupedData)?.map((date, index) => {
              const isEvenRow = index % 2 === 1;
              return (
                <tr className={isEvenRow ? styles.grayBgColor : ""}>
                  <td>{date}</td>
                  {/* BGV STATUS list */}
                  <td>{groupedData[date]?.count}</td>
                  <td>{groupedData[date]?.bgv_status?.COMPLETED || 0}</td>
                  <td>{groupedData[date]?.bgv_status?.INCOMPLETE}</td>
                  <td>{groupedData[date]?.count}</td>
                  {/* BGV REULT LIST */}
                  <td>{groupedData[date]?.bgv_result?.CLEAR}</td>
                  <td>{groupedData[date]?.bgv_result?.FAILED || 0}</td>
                  <td>
                    {groupedData[date]?.bgv_result?.UNABLE_TO_VERIFY || 0}
                  </td>
                  <td>{groupedData[date]?.bgv_result?.PENDING || 0}</td>
                  <td>{groupedData[date]?.count}</td>
                  {/* BGV PAYMENT STATUS */}
                  <td>{groupedData[date]?.payment_status?.CLEAR}</td>
                  <td>{groupedData[date]?.payment_status?.PENDING || 0}</td>
                  <td>{groupedData[date]?.payment_status?.IN_PROCESS || 0}</td>
                  <td>{groupedData[date]?.count}</td>

                  {/* Total filed  */}
                </tr>
              );
            })}

          <tr className={styles.totalCols}>
            <td>Total</td>
            <td>{tableDatas?.totalCount}</td>
            <td>{tableDatas?.bgvStatusComplete}</td>
            <td>{tableDatas?.bgvStatusInComplete}</td>
            <td>{tableDatas?.totalCount}</td>

            <td>{tableDatas?.bgvResultClear}</td>
            <td>{tableDatas?.bgvResultFailed}</td>
            <td>{tableDatas?.bgvResultUnableVerify || 0}</td>
            <td>{tableDatas?.bgvResultPending || 0}</td>
            <td>{tableDatas?.totalCount}</td>
            <td>{tableDatas?.paymentClear || 0}</td>
            <td>{tableDatas?.paymentPENDING || 0}</td>
            <td>{tableDatas?.paymentInprogress || 0}</td>
            <td>{tableDatas?.totalCount}</td>
          </tr>
          <tr className={styles.totalCols}>
            <td style={{ border: "none", backgroundColor: "#FFFFFF" }}></td>
            <td style={{ border: "none", backgroundColor: "#FFFFFF" }}></td>
            <td>{tableDatas?.bgvStatusCompletePercent}</td>
            <td>{tableDatas?.bgvStatusInCompletePercent}</td>
            <td>{}</td>

            <td>{tableDatas?.bgvResultClearPercent}</td>
            <td>{tableDatas?.bgvResultFailedPercent}</td>
            <td>{tableDatas?.bgvResultUnableVerifyPercent || 0}</td>
            <td>{tableDatas?.bgvResultPendingPercent || 0}</td>
            <td>{}</td>
            <td>{tableDatas?.paymentClearPercent || 0}</td>
            <td>{tableDatas?.paymentPENDINGPercent || 0}</td>
            <td>{tableDatas?.paymentInprogressPercent || 0}</td>
            <td>{}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
