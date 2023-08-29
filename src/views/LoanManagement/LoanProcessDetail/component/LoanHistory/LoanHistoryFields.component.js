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
  isDetail,
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
      } else if (name === "interest") {
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
      <div className={styles.flexContainer}>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            {isDetail ? (
              <TextField
                disabled={isDetail}
                error={errors?.type}
                onChange={handleChange}
                value={data?.type}
                fullWidth={true}
                name={"type"}
                margin={"dense"}
                variant={"outlined"}
                label={"Type"}
              />
            ) : (
              <CustomSelectField
                disabled={isDetail}
                isError={errors?.type}
                errorText={errors?.type}
                label={"Type of Loan"}
                value={data?.type}
                handleChange={(value) => {
                  handleChange(value, "type");
                }}
              >
                {eligibleLoans?.map((item) => (
                  <MenuItem value={item}>{removeUnderScore(item)}</MenuItem>
                ))}
              </CustomSelectField>
            )}
          </div>
          <div className={styles.flex1}>
            <TextField
              disabled={isDetail}
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
              disabled={isDetail}
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
              disabled={isDetail}
              isError={errors?.status}
              errorText={errors?.status}
              label={"Status"}
              value={data?.status}
              handleChange={(value) => {
                handleChange(value, "status");
              }}
            >
              <MenuItem value="RECOVERY_COMPLETE">Recovery Complete</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
            </CustomSelectField>
          </div>
          <div className={styles.flex1}>
            <CustomDatePicker
              disabled={isDetail}
              clearable
              label={"From"}
              // minDate={startDate}
              // maxDate={endDate}
              onChange={(e) => handleChange(e, "from")}
              value={data?.from}
              isError={errors?.from}
            />
          </div>
          <div className={styles.flex1}>
            <CustomDatePicker
              disabled={isDetail}
              clearable
              label={"To"}
              // minDate={startDate}
              // maxDate={endDate}
              onChange={(e) => handleChange(e, "to")}
              value={data?.to}
              isError={errors?.to}
            />
          </div>
        </div>

        <div className={styles.firstRow221}>
          <div className={"textCenter"}>
            {!isDetail && (
              <ButtonBase
                className={styles.removeBtn}
                // label={this.props.index == 0 ? "+" : '-'}
                onClick={() => {
                  handlePress(index == 0 ? "-" : "-", index);
                }}
              >
                {index == 0 ? "Remove" : "Remove"}
              </ButtonBase>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanHistoryIncludeFields;
