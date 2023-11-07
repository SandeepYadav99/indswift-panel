import React from 'react'
import styles from "./Style.module.css"
const TableView = () => {
  return (
    <div>
         <table className={styles.myTable}>
            <thead>
              <tr>
              <th colSpan="2" style={{border:"none"}}> </th>
                <th colSpan="3"  className={styles.bgColor4Cols}>BGV STATUS</th>
                <th colSpan="5"  className={styles.bgColor4Cols}>BGV RESULT</th>
                <th colSpan="7"  className={styles.bgColor4Cols}>PAYMENT STATUS</th>
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
                <td>Clear</td>
                <td>In- Process</td>
                <td>Total</td>
              </tr>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>

                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
    </div>
  )
}

export default TableView