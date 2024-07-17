import React, { useMemo } from "react";
import { TextField } from "@material-ui/core";
import styles from "./style.module.css";
import { useEffect } from "react";
import { removeUnderScore } from "../../../../../helper/helper";
const TravelincludesDetailFields = ({
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
        if(value >= 0){
        // if (value >= 0 && value <= data?.max_amount) {
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
                <span className={styles.value}>
                  {" "}
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
};

export default TravelincludesDetailFields;
