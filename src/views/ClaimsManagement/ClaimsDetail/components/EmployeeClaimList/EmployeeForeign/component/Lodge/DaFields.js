import React from "react";
import styles from "./Style.module.css";
import {
  getCurrency,
  removeUnderScore,
} from "../../../../../../../../helper/helper";
function DaView({ data }) {
  return (
    <div>
      <div className={styles.commentContainer}>
        <div className={styles.otherWrap}>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Stay At:</span>
                {removeUnderScore(data?.stay_at)}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Date:</span>
                {data?.dateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Ending Time :</span>
                {data?.end_time}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>DA Entitelment/Day:</span>
                {data?.da_entitlement && (
                  <>
                    {getCurrency(data?.currency)} {data?.da_entitlement}
                  </>
                )}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>% of DA:</span>
                {data?.da_pct}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>DA Claimed Amount:</span>
                {data?.da_amount && (
                  <>
                    {getCurrency(data?.currency)} {data?.da_amount}
                  </>
                )}
              </div>
              {data?.da_payment_proof && (
                <div className={styles.key}>
                  <a href={data?.da_payment_proof} target="_blank">
                    <div className={styles.hyperlinkText}>DA Payment Proof</div>
                  </a>
                </div>
              )}
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Starting Time:</span>
                {data?.start_time}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Duration in Hours:</span>
                {data?.hours} hrs
              </div>
              <div className={styles.key}>
                <span className={styles.value}>IE Entitelment/Day:</span>
                {data?.ie_entitlement && (
                  <>
                    {getCurrency(data?.currency)} {data?.ie_entitlement}
                  </>
                )}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>IE Claimed Amount:</span>
                {data?.ie_amount && (
                  <>
                    {getCurrency(data?.currency)} {data?.ie_amount}
                  </>
                )}
              </div>
              {data?.ie_payment_proof && (
                <div className={styles.key}>
                  <a href={data?.ie_payment_proof} target="_blank">
                    <div className={styles.hyperlinkText}>IE payment Proof</div>
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

export default DaView;
