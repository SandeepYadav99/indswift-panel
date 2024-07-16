import React from 'react'
import styles from './Style.module.css'
const SubHeader = () => {
  return (
    <div className={styles.mainContainer}>
    <div className={styles.lastPayslipContainer}>
      <div className={styles.lastPayslip}>
        <div className={styles.lastPayslip}>LAST PAYSLIP</div>
        <div className={styles.lastPayslip}>DATE GENERATED</div>
      </div>
    </div>
      <div className={styles.lastPayslipBody}>
        <div className={styles.lastPayslip}>07/2024</div>
        <div className={styles.lastPayslip}>04/07/2024</div>
      </div>
    </div>
  )
}

export default SubHeader