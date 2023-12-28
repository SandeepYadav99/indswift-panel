import React from "react";
import {
  getCurrency,
  removeUnderScore,
} from "../../../../../../../../helper/helper";
import styles from "./Style.module.css";
function OtherView({ data }) {
  return (
    <div>
       <div className={styles.commentContainer}>
        <div className={styles.otherWrap}>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Date:</span>
                {data?.dateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Description of Expense:</span>
                {data?.details ? data?.details : 'N/A'}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Reason of Expense:</span>
                {data?.reason ? data?.reason : 'N/A'}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Booking By:</span>
                {data?.booking_by ? data?.booking_by : '-'}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Expense Amount : </span>
                {getCurrency("INR")}
                {data?.amount}
              </div>
            </div>
            <div className={styles.right}>
              {data?.payment_proof && (
                <div className={styles.key}>
                  <a href={data?.payment_proof} target="_blank">
                    <div className={styles.hyperlinkText}>
                      View Proof of Payment
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherView;
