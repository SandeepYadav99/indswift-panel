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
import { useEffect } from "react";
import File from "../../../../../components/FileComponent/FileComponent.component";
import LogUtils from "../../../../../libs/LogUtils";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import { accomodationType } from "../../../../../helper/helper";

const OtherIncludeFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
  startDate,
  endDate,
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
                <span className={styles.value}>Date:</span>
                {data?.dateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Description of Expense:</span>
                {data?.details ? data?.details : "N/A"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Reason of Expense:</span>
                {data?.reason ? data?.reason : "N/A"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Booking By:</span>
                {data?.booking_by ? data?.booking_by : "-"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Choose the currency of payment:</span>
                {data?.payment_made_by ? data?.payment_made_by : "-"}
              </div>
              <div className={styles.key221}>
                <span className={styles.value}>
                  <CustomSelectField
                    disabled={true}
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

export default OtherIncludeFields;
