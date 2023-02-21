import React from 'react'
import noCPCimage from "./../../../../../assets/img/ic_no cpc info.png";
import styles from './Style.module.css'
function EmployeeRecord() {
  return (
    <div className={styles.careerWrapperCPc}>
    <div className={styles.imageWrapperCpc}>
      <img src={noCPCimage} />
      <div className={styles.titleWrpapper}>
        <span className={styles.noCpcTitle}>No Information Available</span>
        {/* <span className={styles.noCpcdec}>
          Currently no CPC Inofrmation is available
        </span> */}
      </div>
    </div>
  </div>
  )
}

export default EmployeeRecord