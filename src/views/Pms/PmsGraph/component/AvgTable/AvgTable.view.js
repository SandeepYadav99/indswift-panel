import React from "react";
import styles from "./Style.module.css";

function AvgTable({ data }) {
  const avgValue = data;
  const sumNormalized = data?.reduce((sum, obj) => sum + obj?.normalized, 0);

  return (
    <div>
      <table className={styles.TableClass}>
        <thead>
          <tr className={styles.tableRow}>
            <th className={styles.headingTitle}>Grade</th>
            {avgValue?.map((item, index) => (
              <th
                key={index}
                className={index % 2 === 0 ? styles.even : styles.odd}
              >
                {item?.grade}
              </th>
            ))}
            <th className={styles.ratingValue}>Grand Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.tableRow}>
            <th className={styles.headingTitle}>Avg Score</th>
            {avgValue?.map((item, index) => (
              <td
                key={index}
                className={index % 2 === 0 ? styles.even : styles.odd}
              >
                {item.normalized}
              </td>
            ))}
            <td className={styles.ratingValue}>
              {avgValue?.length > 0 && sumNormalized / avgValue?.length}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AvgTable;
