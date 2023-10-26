import React, { useMemo } from "react";
import {
  TextField,
  ButtonBase,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import styles from "./style.module.css";
import CustomDatePicker from "../../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import { useEffect } from "react";
import File from "../../../../../components/FileComponent/FileComponent.component";
import {
  DAAllotForeignAmout,
  IEForeignAllotAmout,
  getCurrency,
  removeUnderScore,
} from "../../../../../helper/helper";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

const DAIncludeFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
  grade,
  startDate,
  endDate,
  checkDays,
  isCP,
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
      if (name === "da_amount" || name === "ie_amount") {
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

  useEffect(() => {
    if (grade && data?.stay_at && data?.hours) {
      let percent;
      if (data?.hours >= 12) {
        percent = 100;
      } else {
        percent = 50;
      }
      changeData(index, {
        ["da_pct"]: percent,
      });
    }
  }, [grade, data?.stay_at, data?.hours]);

  useEffect(() => {
    if (data?.da_pct && data?.stay_at && grade && data?.currency) {
      let storeValue = DAAllotForeignAmout(grade, data?.currency, isCP);
      if (data?.data?.stay_at === "SELF_ARRANGEMENT" && !isCP) {
        let result = Math.round((1 / 5) * storeValue);
        storeValue = result;
      }
      let maxValue = (storeValue * data?.da_pct) / 100;
      changeData(index, {
        ["da_entitlement"]: maxValue,
      });
    }
  }, [data?.da_pct, data?.stay_at, grade, data?.currency, isCP]);

  useEffect(() => {
    if (data?.start_time && data?.end_time) {
      const starttime = new Date(data?.start_time);
      const endtime = new Date(data?.end_time);
      const timeDifferenceInMilliseconds = endtime - starttime;
      const timeDifferenceInHours =
        timeDifferenceInMilliseconds / (1000 * 60 * 60);

      const roundedTimeDifference =
        Math.round(timeDifferenceInHours * 100) / 100;

      changeData(index, {
        ["hours"]: roundedTimeDifference,
      });
    }
  }, [data?.start_time, data?.end_time]);

  useEffect(() => {
    if (checkDays >= 5 && grade && data?.currency) {
      let ieRes = IEForeignAllotAmout(grade, data?.currency);
      changeData(index, {
        ["ie_entitlement"]: ieRes,
      });
    }
  }, [checkDays, data?.currency]);

  console.log("checkDays", checkDays, index);
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
                    {getCurrency("INR")} {data?.ie_entitlement}
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
          <div className={styles.key221}>
            <span className={styles.valueField}>
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
                disabled={isCP || index > 1 || checkDays < 5 ? true : false}
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

export default DAIncludeFields;
