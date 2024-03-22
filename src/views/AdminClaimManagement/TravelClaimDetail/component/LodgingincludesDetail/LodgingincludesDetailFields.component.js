import React, { useMemo } from "react";
import { TextField } from "@material-ui/core";
import styles from "./style.module.css";
import { useEffect } from "react";
import { getCurrency } from "../../../../../helper/helper";
const LodgingincludesDetailFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
  statusCheck
}) => {
  const handleChange = (e, fieldName) => {
    if (fieldName) {
      changeData(index, { [fieldName]: e });
    } else {
      const name = e?.target?.name;
      const value = e?.target?.value;
      if (name === "amount") {
        if (value >= 0 && value <= data?.max_amount) {
          changeData(index, { [name]: value });
        }
      } else {
        changeData(index, { [name]: value });
      }
    }
  };
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
                <span className={styles.value}>City:</span>
                {data?.city}
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
                {getCurrency("INR")}
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
                <span className={styles.value}>
                  <TextField
                    disabled={!statusCheck}
                    error={errors?.amount}
                    onChange={handleChange}
                    value={data?.amount}
                    fullWidth={true}
                    name={"amount"}
                    margin={"dense"}
                    variant={"outlined"}
                    label={"Expense Amount"}
                  />
                </span>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Check Out Date:</span>
                {data?.checkOutDateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>City Cluster:</span>
                {data?.city_cluster}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Stay at:</span>
                {data?.stay_at}
              </div>
              <div className={styles.keyShared}>
                <span className={styles.value}>Shared with:</span>
                <div className={styles.shared}>
                {data?.shared_with?.length > 0 &&
                  data?.shared_with?.map((item) => <div className={styles.innerWrap}>{item?.name}{`(${item?.emp_code})`}</div>)}
                </div>
                
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Per Day Entitlement:</span>
                {data?.per_day_entitlement ? (
                  <>
                    {getCurrency("INR")}
                    {data?.per_day_entitlement}
                  </>
                ) : (
                  "-"
                )}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Payment Made By:</span>
                {data?.payment_by}
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
};

export default LodgingincludesDetailFields;
