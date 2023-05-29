import React, { useMemo } from "react";
import { TextField } from "@material-ui/core";
import styles from "./style.module.css";
import { useEffect } from "react";

const BankOtherDetailsIncludeFields = ({ index, changeData, data, errors }) => {
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
      <div className={styles.flexContainer}>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <TextField
              error={errors?.account_no}
              onChange={handleChange}
              value={data?.account_no}
              fullWidth={true}
              name={"account_no"}
              margin={"dense"}
              variant={"outlined"}
              label={"Account no."}
            />
          </div>
          <div className={styles.flex1}>
            <TextField
              error={errors?.beneficiary_name}
              onChange={handleChange}
              value={data?.beneficiary_name}
              fullWidth={true}
              name={"beneficiary_name"}
              margin={"dense"}
              variant={"outlined"}
              label={"Beneficiary Name"}
            />
          </div>
        </div>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <TextField
              error={errors?.ifsc}
              onChange={handleChange}
              value={data?.ifsc}
              fullWidth={true}
              name={"ifsc"}
              margin={"dense"}
              variant={"outlined"}
              label={"IFSC Code"}
            />
          </div>
          <div className={styles.flex1}>
            <TextField
              error={errors?.bank_name}
              onChange={handleChange}
              value={data?.bank_name}
              fullWidth={true}
              name={"bank_name"}
              margin={"dense"}
              variant={"outlined"}
              label={"Bank Name"}
            />
          </div>
        </div>
        <div className={styles.firstRow} style={{ width: "50%" }}>
          <div className={styles.flex1}>
            <TextField
              error={errors?.branch_name}
              onChange={handleChange}
              value={data?.branch_name}
              fullWidth={true}
              name={"branch_name"}
              margin={"dense"}
              variant={"outlined"}
              label={"Branch Name"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankOtherDetailsIncludeFields;
