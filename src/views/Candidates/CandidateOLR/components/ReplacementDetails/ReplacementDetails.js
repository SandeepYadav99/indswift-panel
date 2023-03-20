import React from 'react'
import styles from './Style.module.css'
function ReplacementDetails() {

    const data={}
  return (
    <div className={styles.plainPaper}>
        <div className={styles.newContainerPersonal}>
          <div className={styles.heading}>Replacement (RAP/RAB) Details</div>

          <div className={styles.mainFlex2}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Vaccant Tenure (Days):</span>
                <span className={styles.valueWrap}>{data?.dob}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Replacing Name:</span>
                <span className={styles.valueWrap}>{data?.gender}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Replacing Designation:</span>
                <span className={styles.valueWrap}>{data?.gender}</span>
              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Replacing Grade:</span>
                <span className={styles.valueWrap}>
                  {data?.family?.martial_status}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Replacing Experience:</span>
                <span className={styles.valueWrap}>
                  {data?.family?.spouse_dob}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Replacing CTC (LPA):</span>
                <span className={styles.valueWrap}>
                  
                   {/* {data?.family?.spouse_gender} */}
                </span>
              </div>
               
            </div>
          </div>
        </div>
        
      </div>
  )
}

export default ReplacementDetails;