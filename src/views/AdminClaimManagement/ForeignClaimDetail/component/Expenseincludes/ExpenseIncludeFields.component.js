import React, { useMemo } from "react";
import {
  TextField,
  ButtonBase,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import styles from "./style.module.css";
import CustomDatePicker from "../../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import { useEffect } from "react";
import File from "../../../../../components/FileComponent/FileComponent.component";
import { Autocomplete } from "@material-ui/lab";
import {
  entitlementAmout,
  removeUnderScore,
  travelListExpense,
  travelListForeignExpense,
} from "../../../../../helper/helper";

const ExpenseIncludeFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
  grade,
  startDate,
  endDate,
}) => {
  const handleChange = (e, fieldName) => {
    if (fieldName) {
      if (fieldName === "type") {
        changeData(index, { [fieldName]: e.target.value });
      } else {
        changeData(index, { [fieldName]: e });
      }
    } else {
      const name = e?.target?.name;
      const value = e?.target?.value;
      if (name === "amount" || name === "total_kms") {
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
              <div className={styles.key221}>
                <span className={styles.value}>
                  <CustomSelectField
                    isError={errors?.currency}
                    errorText={errors?.currency}
                    label={"Choose Currency"}
                    value={data?.currency}
                    handleChange={(value) => {
                      handleChange(value, "currency");
                    }}
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="INR">INR</MenuItem>
                  </CustomSelectField>
                </span>
                <span className={styles.value}>
                  {" "}
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

export default ExpenseIncludeFields;
