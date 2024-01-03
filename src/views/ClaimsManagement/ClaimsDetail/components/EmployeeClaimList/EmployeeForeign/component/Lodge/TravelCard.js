import React from "react";
import {
  getCurrency,
  removeUnderScore,
} from "../../../../../../../../helper/helper";
import styles from "./Style.module.css";
function TravelView({ data }) {
  return (
    <div>
      <div className={styles.commentContainer}>
        <div className={styles.otherWrap}>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Travel Date:</span>
                {data?.travelDateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Travel From :</span>
                {data?.from}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Payment Made By:</span>
                {data?.payment_by}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Travel Mode :</span>
                {removeUnderScore(data?.mode)}
              </div>
              {data?.voucher && (
                <div className={styles.key}>
                  <a href={data?.voucher} target="_blank">
                    <div className={styles.hyperlinkText}>
                      View Voucher/Bill
                    </div>
                  </a>
                </div>
              )}
              <div className={styles.key}>
                <span className={styles.value}>Details of Travel Medium:</span>
                {data?.details}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Currency : </span>
                {getCurrency(data?.currency)}
                {/* {data?.amount} */}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Expense Amount : </span>
                {getCurrency(data?.currency)}
                {data?.amount}
              </div>
              
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Booking By:</span>
                {data?.booking_by}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Travel To:</span>
                {data?.to}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>No of KMs:</span>
                {data?.total_kms && `${data?.total_kms} Km`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Choose the currency of payment:</span>
                {data?.payment_made_by ? data?.payment_made_by : "-"}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelView;
