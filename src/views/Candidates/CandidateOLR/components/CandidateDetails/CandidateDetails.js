import React from 'react'
import styles from './Style.module.css'
function CandidateDetails() {

    const data={}
  return (
    <div className={styles.plainPaper}>
        <div className={styles.newContainerPersonal}>
          <div className={styles.heading}>Candidate Details - Suraj Kumar</div>

          <div className={styles.mainFlex2}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Place of Posting:</span>
                <span className={styles.valueWrap}>{data?.dob}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Designation:</span>
                <span className={styles.valueWrap}>{data?.gender}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Department:</span>
                <span className={styles.valueWrap}>{data?.state}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Grade:</span>
                <span className={styles.valueWrap}>
                  {data?.family?.father_name}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Qualification:</span>
                <span className={styles.valueWrap}>
                  {data?.family?.mother_name}
                </span>
              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Experience:</span>
                <span className={styles.valueWrap}>
                  {data?.family?.martial_status}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Source of Hiring:</span>
                <span className={styles.valueWrap}>{data?.dom}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Type of Vacancy:</span>
                <span className={styles.valueWrap}>
                  {data?.family?.spouse_name}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>OLC Issued:</span>
                <span className={styles.valueWrap}>
                  {data?.family?.spouse_dob}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Candidate Relocating From:</span>
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

export default CandidateDetails;