import React from 'react'
import styles from "./CandidateInfor.module.css"
const CandidateInfor = ({data}) => {
  console.log(data)
  return (
    <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>
              Candidate Information - <span>{data?.code}</span>
            </div>
          </div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Name:</span>
                {data?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Month:</span>
                {data?.verificatioMonth}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Location:</span>
                {data?.sub_department?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Offer Accepted:</span>
                {data?.designation?.name}{" "}
                {data?.designation_note && <>({data?.designation_note})</>}
              </div>
            </div>

            <div className={styles.vertical}></div>
            <div className={styles.right}>
              {/* <div className={styles.key}>
                <span className={styles.value}>PRC:</span>
                {data?.code}
              </div> */}
              <div className={styles.key}>
                <span className={styles.value}>Designation:</span>
                {/* {valencyChange(data?.vacancy_type)} */}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Department:</span>
                {data?.replacing_person?.code
                  ? data?.replacing_person?.code
                  : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Offer Date:</span>
                {data?.replacing_person?.name
                  ? data?.replacing_person?.name
                  : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>DOJ:</span>
                {data?.replacing_person?.total_experience
                  ? `${data?.replacing_person?.total_experience} yrs`
                  : "NA"}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CandidateInfor