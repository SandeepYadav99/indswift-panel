import React, { useMemo } from "react";
import { TextField, ButtonBase, MenuItem } from "@material-ui/core";
import styles from "./style.module.css";
import { useEffect } from "react";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import CustomDatePicker from "../../../../../components/FormFields/DatePicker/CustomDatePicker";

import { removeUnderScore } from "../../../../../helper/helper";
import LogUtils from "../../../../../libs/LogUtils";

const LoanHistoryIncludeFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
  eligibleLoans,
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
      <div className={styles.flexContainer}>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <CustomSelectField
              isError={errors?.loan_type}
              errorText={errors?.loan_type}
              label={"Type of Loan"}
              value={data?.loan_type}
              handleChange={(value) => {
                handleChange(value, "loan_type");
              }}
            >
              {eligibleLoans?.map((item) => (
                <MenuItem value={item}>{removeUnderScore(item)}</MenuItem>
              ))}
            </CustomSelectField>
          </div>
          <div className={styles.flex1}>
            <TextField
              error={errors?.amount}
              onChange={handleChange}
              value={data?.amount}
              fullWidth={true}
              name={"amount"}
              margin={"dense"}
              variant={"outlined"}
              label={"Amount"}
            />
          </div>
          <div className={styles.flex1}>
            <TextField
              error={errors?.interest}
              onChange={handleChange}
              value={data?.interest}
              fullWidth={true}
              name={"interest"}
              margin={"dense"}
              variant={"outlined"}
              label={"Interest"}
            />
          </div>
        </div>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <CustomSelectField
              isError={errors?.gender}
              errorText={errors?.gender}
              label={"Status"}
              value={data?.gender}
              handleChange={(value) => {
                handleChange(value, "gender");
              }}
            >
              <MenuItem value="RECOVERY_COMPLETE">Recovery Complete</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
            </CustomSelectField>
          </div>
          <div className={styles.flex1}>
            <CustomDatePicker
              clearable
              label={"From"}
              // minDate={startDate}
              // maxDate={endDate}
              onChange={(e) => handleChange(e, "check_in")}
              value={data?.check_in}
              isError={errors?.check_in}
            />
          </div>
          <div className={styles.flex1}>
            <CustomDatePicker
              clearable
              label={"To"}
              // minDate={startDate}
              // maxDate={endDate}
              onChange={(e) => handleChange(e, "check_out")}
              value={data?.check_out}
              isError={errors?.check_out}
            />
          </div>
        </div>

        <div className={styles.firstRow221}>
          <div className={"textCenter"}>
            <ButtonBase
              className={styles.removeBtn}
              // label={this.props.index == 0 ? "+" : '-'}
              onClick={() => {
                handlePress(index == 0 ? "-" : "-", index);
              }}
            >
              {index == 0 ? "Remove" : "Remove"}
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanHistoryIncludeFields;
