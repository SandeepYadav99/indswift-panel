import React, { useMemo } from "react";
import { TextField } from "@material-ui/core";
import styles from "./style.module.css";
import { useEffect } from "react";
const EnterincludesDetailFields = ({
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
                <span className={styles.value}>Name of Guest:</span>
                {data?.guest_name ? data?.guest_name : 'N/A'}
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
                {data?.guest_details ? data?.guest_details : 'N/A'}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>
                  <TextField
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
                <span className={styles.value}>Nature of Expenses:</span>
                {data?.expense_nature ? data?.expense_nature : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterincludesDetailFields;
