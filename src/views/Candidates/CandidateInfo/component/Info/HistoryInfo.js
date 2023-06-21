import React from "react";
import styles from "./Style.module.css";

const HistoryInfo = ({ data }) => {
  const dataLength = data?.length - 1;
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Employment History</div>
          {data?.length > 0 &&
            data?.map((item, index) => (
              <>
                <div className={styles.mainFlex} key={`history_${index}`}>
                  <div className={styles.left}>
                    <div className={styles.key}>
                      <span className={styles.value}>
                        Name of employer/ Location:
                      </span>
                      <span className={styles.valueWrap}>
                        {item?.employer_name ? item?.employer_name : '-'}
                      </span>
                    </div>

                    <div className={styles.key}>
                      <span className={styles.value}>Designation:</span>
                      <span className={styles.valueWrap}>
                        {item?.designation ? item?.designation : '-'}
                      </span>
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>Joining Date:</span>
                      <span className={styles.valueWrap}>
                        {item?.joining_date ? item?.joining_date : '-'}
                      </span>
                    </div>
                  </div>
                  <div className={styles.vertical}></div>
                  <div className={styles.right}>
                    <div className={styles.key}>
                      <span className={styles.value}>Date of Resignation:</span>
                      <span className={styles.valueWrap}>
                        {item?.resignation_date ? item?.resignation_date : '-'}
                      </span>
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>
                        CTC at time of joining:
                      </span>
                      <span className={styles.valueWrap}>
                        {item?.joining_ctc ? `₹ ${item?.joining_ctc}` : '-'}
                      </span>
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>
                        CTC at time of leaving:
                      </span>
                      <span className={styles.valueWrap}>
                        {item?.leaving_ctc ? `₹ ${item?.leaving_ctc}` : '-'}
                      </span>
                    </div>
                  </div>
                </div>
                {dataLength !== index && (
                  <div className={styles.horizontalLine}></div>
                )}
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryInfo;
