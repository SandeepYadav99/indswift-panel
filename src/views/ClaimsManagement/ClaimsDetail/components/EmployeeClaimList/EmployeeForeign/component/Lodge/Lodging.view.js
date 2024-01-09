import React from "react";
import { getCurrency } from "../../../../../../../../helper/helper";
import styles from "./Style.module.css";
function LodgingView({ data }) {
  return (
    <div>
      <div className={styles.commentContainer}>
        <div className={styles.otherWrap}>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Check In Date:</span>
                {data?.checkInDateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Booking By :</span>
                {data?.booking_by}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Specify Country:</span>
                {data?.country_name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Hotel Name :</span>
                {data?.hotel}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>No. of Nights:</span>
                {data?.total_nights}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Total Max Entitlement:</span>
                {getCurrency(data?.currency)}
                {data?.max_entitlement}
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
                <span className={styles.value}> Currency : </span>
                {getCurrency(data?.currency)}
              </div>

              <div className={styles.key}>
                <span className={styles.value}>Expense Amount : </span>
                {getCurrency(data?.currency)}
                {data?.amount}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Check Out Date:</span>
                {data?.checkOutDateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Country Chosen:</span>
                {data?.country}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Stay at:</span>
                {data?.stay_at}
              </div>
              <div className={styles.keyShared}>
                <span className={styles.value}>Shared with:</span>
                <div className={styles.shared}>
                  {data?.shared_with?.length > 0 &&
                    data?.shared_with?.map((item) => (
                      <div className={styles.innerWrap}>
                        {item?.name}
                        {`(${item?.emp_code})`}
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Per Day Entitlement:</span>
                {data?.per_day_entitlement ? (
                  <>
                    {getCurrency(data?.currency)}
                    {data?.per_day_entitlement}
                  </>
                ) : (
                  "-"
                )}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Over Expenditure:</span>
                {data?.over_expenditure
                  ? `${getCurrency(data?.currency)} ${data?.over_expenditure} `
                  : 0}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Payment Made By:</span>
                {data?.payment_by}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>
                  Choose the currency of payment:
                </span>
                {data?.payment_made_by ? data?.payment_made_by : "-"}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LodgingView;
