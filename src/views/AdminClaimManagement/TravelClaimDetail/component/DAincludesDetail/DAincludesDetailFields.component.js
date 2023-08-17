import React, { useMemo } from "react";
import { TextField } from "@material-ui/core";
import styles from "./style.module.css";
import { useEffect } from "react";
const DAincludesDetailFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
}) => {
  const handleChange = (e, fieldName) => {
    if (fieldName) {
      changeData(index, { [fieldName]: e });
    } else {
      const name = e?.target?.name;
      const value = e?.target?.value;
      if (name === "amount") {
        if (value >= 0) {
          changeData(index, { [name]: value });
        }
      } else if (name === "da_pct") {
        if (value >= 0 && value <= 100) {
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
                <span className={styles.value}>Date:</span>
                {data?.dateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Ending Time :</span>
                {data?.endDateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>DA Entitelment/Day:</span>
                {data?.da_entitlement}
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
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Starting Time:</span>
                {data?.startDateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Duration in Hours:</span>
                {data?.hours}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>IE Entitelment/Day:</span>
                {data?.ie_entitlement}
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
          <div className={styles.key21}>
            <span className={styles.valueField}>
              {" "}
              <TextField
                error={errors?.da_pct}
                onChange={handleChange}
                value={data?.da_pct}
                fullWidth={true}
                name={"da_pct"}
                margin={"dense"}
                variant={"outlined"}
                label={"% of DA"}
                InputLabelProps={{ shrink: true }}
              />
            </span>
            <span className={styles.valueField}>
              {" "}
              <TextField
                error={errors?.da_amount}
                onChange={handleChange}
                value={data?.da_amount}
                fullWidth={true}
                name={"da_amount"}
                margin={"dense"}
                variant={"outlined"}
                label={"DA Claimed Amount"}
                InputLabelProps={{ shrink: true }}
              />
            </span>
            <span className={styles.valueField}>
              {" "}
              <TextField
                error={errors?.ie_amount}
                onChange={handleChange}
                value={data?.ie_amount}
                fullWidth={true}
                name={"ie_amount"}
                margin={"dense"}
                variant={"outlined"}
                label={"IE Claimed Amount"}
                InputLabelProps={{ shrink: true }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DAincludesDetailFields;
