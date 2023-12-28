import React from "react";
import {
  getCurrency,
  removeUnderScore,
} from "../../../../../../../../helper/helper";
import styles from "./Style.module.css";
function EntertainmentView({ data }) {
  return (
    <div>
      <div className={styles.commentContainer}>
        <div className={styles.otherWrap}>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Name of Guest:</span>
                {data?.guest_name ? data?.guest_name : "N/A"}
              </div>
              {data?.payment_proof && (
                <div className={styles.key}>
                  <a href={data?.payment_proof} target="_blank">
                    <div className={styles.hyperlinkText}>
                      View Proof of Payment
                    </div>
                  </a>
                </div>
              )}
              <div className={styles.key}>
                <span className={styles.value}>Details of Guest:</span>
                {data?.guest_details ? data?.guest_details : "N/A"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Expense Amount : </span>
                {getCurrency("INR")}
                {data?.amount}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Nature of Expenses:</span>
                {data?.expense_nature ? data?.expense_nature : "N/A"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Booking By:</span>
                {data?.booking_by ? data?.booking_by : "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntertainmentView;
