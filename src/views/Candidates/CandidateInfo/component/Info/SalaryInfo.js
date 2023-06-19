import React from "react";
import styles from "./Style.module.css";

const SalaryInfo = ({ data }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Current CTC Details</div>
          {data?.monthly_salary?.length > 0 &&
            data?.monthly_salary?.map((item, index) => (
              <>
                <div className={styles.mainFlex} key={`history_${index}`}>
                  <div className={styles.left}>
                    <div className={styles.key}>
                      <span className={styles.value}>CTC (per month):</span>
                      <span className={styles.valueWrap}>{item?.ctc ? item?.ctc : '-'}</span>
                    </div>

                    <div className={styles.key}>
                      <span className={styles.value}>
                        Monthly Payment Type:
                      </span>
                      <span className={styles.valueWrap}>
                        {item?.payment_type ? item?.payment_type : '-'}
                      </span>
                    </div>
                  </div>
                  <div className={styles.vertical}></div>
                  <div className={styles.right}>
                    <div className={styles.key}>
                      <span className={styles.value}>
                        In hand Salary (per month):
                      </span>
                      <span className={styles.valueWrap}>{item?.in_hand ? item?.in_hand : '-'}</span>
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>
                        Monthly Payment Amount:
                      </span>
                      <span className={styles.valueWrap}>{item?.amount ? item?.amount : '-'}</span>
                    </div>
                  </div>
                </div>
                {data?.monthly_salary?.length - 1 !== index && (
                  <div className={styles.horizontalLine}></div>
                )}
              </>
            ))}
          <div className={styles.horizontalLine}></div>
          {data?.quarterly_salary?.length > 0 &&
            data?.quarterly_salary?.map((item, index) => (
              <>
                <div className={styles.mainFlex} key={`history_${index}`}>
                  <div className={styles.left}>
                    <div className={styles.key}>
                      <span className={styles.value}>
                        Quaterly Payment Type:
                      </span>
                      <span className={styles.valueWrap}>
                        {item?.payment_type ? item?.payment_type : '-'}
                      </span>
                    </div>
                  </div>
                  <div className={styles.vertical}></div>
                  <div className={styles.right}>
                    <div className={styles.key}>
                      <span className={styles.value}>
                        Quaterly Payment Amount:
                      </span>
                      <span className={styles.valueWrap}>{item?.amount ? item?.amount : '-'}</span>
                    </div>
                  </div>
                </div>
                {data?.quarterly_salary?.length - 1 !== index && (
                  <div className={styles.horizontalLine}></div>
                )}
              </>
            ))}
          <div className={styles.horizontalLine}></div>
          {data?.annual_salary?.length > 0 &&
            data?.annual_salary?.map((item, index) => (
              <>
                <div className={styles.mainFlex} key={`history_${index}`}>
                  <div className={styles.left}>
                    <div className={styles.key}>
                      <span className={styles.value}>Annual Payment Type:</span>
                      <span className={styles.valueWrap}>
                        {item?.payment_type ? item?.payment_type : '-'}
                      </span>
                    </div>
                  </div>
                  <div className={styles.vertical}></div>
                  <div className={styles.right}>
                    <div className={styles.key}>
                      <span className={styles.value}>
                        Annual Payment Amount:
                      </span>
                      <span className={styles.valueWrap}>{item?.amount ? item?.amount : '-'}</span>
                    </div>
                  </div>
                </div>
                {data?.annual_salary?.length - 1 !== index && (
                  <div className={styles.horizontalLine}></div>
                )}
              </>
            ))}
          <div className={styles.horizontalLine}></div>
          {data?.benefits?.length > 0 &&
            data?.benefits?.map((item, index) => (
              <>
                <div className={styles.mainFlex} key={`history_${index}`}>
                  <div className={styles.left}>
                    <div className={styles.key}>
                      <span className={styles.value}>
                        Long Term Benefits Type:
                      </span>
                      <span className={styles.valueWrap}>
                        {item?.payment_type ? item?.payment_type : '-'}
                      </span>
                    </div>
                  </div>
                  <div className={styles.vertical}></div>
                  <div className={styles.right}>
                    <div className={styles.key}>
                      <span className={styles.value}>
                        Long Term Benefits Amount:
                      </span>
                      <span className={styles.valueWrap}>{item?.amount ? item?.amount : '-'}</span>
                    </div>
                  </div>
                </div>
                {data?.benefits?.length - 1 !== index && (
                  <div className={styles.horizontalLine}></div>
                )}
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SalaryInfo;
