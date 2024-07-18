import React from "react";
import styles from "./Style.module.css";
const SubHeader = () => {
  return (
    // <div className={styles.mainContainer}>
    //   <div className={styles.lastPayslipContainer}>
    //     <div className={styles.lastPayslip}>
    //       <div className={styles.titleDate1}>LAST PAYSLIP</div>
    //       <div className={styles.titleDate1}>DATE GENERATED</div>
    //     </div>
    //   </div>
    //   <div className={styles.lastPayslipBody}>
    //     <div className={styles.titleDate}>07/2024</div>
    //     <div className={styles.titleDate}>04/07/2024</div>
    //   </div>
    // </div>
    <table className={styles.paySlipTable}>
      <thead className={styles.lastPayslipContainer}>
        <tr>
          <th className={styles.titleDate1}>LAST PAYSLIP</th>
          <th className={styles.titleDate1}>DATE GENERATED</th>
       </tr>
      </thead>
      <tbody className={styles.paySlipBody}>
        <tr >
        <td className={styles.titleDate}>07/2024</td>
        <td className={styles.titleDate}>04/07/2024</td>

        </tr>
      </tbody>
    </table>
  );
};

export default SubHeader;
