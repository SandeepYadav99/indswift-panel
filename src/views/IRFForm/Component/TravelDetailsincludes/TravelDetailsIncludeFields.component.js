import React, { useMemo } from "react";
import { TextField, MenuItem } from "@material-ui/core";
import styles from "./style.module.css";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import { useEffect } from "react";
import File from "../../../../components/FileComponent/FileComponent.component";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";

const TravelDetailsIncludeFields = ({ index, changeData, data, errors }) => {
  const handleChange = (e, fieldName) => {
    if (fieldName) {
      changeData(index, { [fieldName]: e });
    } else {
      const name = e?.target?.name;
      const value = e?.target?.value;
      if (name === "from" || name === "to") {
        if (value?.length <= 40) {
          changeData(index, { [name]: value });
        }
      } else if (name === "bill_amount") {
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
            <CustomDatePicker
              clearable
              label={"Date of Interview"}
              maxDate={new Date()}
              onChange={(e) => handleChange(e, "interview_date")}
              value={data?.interview_date}
              isError={errors?.interview_date}
            />
          </div>
          <div className={styles.flex1}>
            <TextField
              error={errors?.from}
              onChange={handleChange}
              value={data?.from}
              fullWidth={true}
              name={"from"}
              margin={"dense"}
              variant={"outlined"}
              label={"Travel From"}
            />
          </div>
        </div>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <TextField
              error={errors?.to}
              onChange={handleChange}
              value={data?.to}
              fullWidth={true}
              name={"to"}
              margin={"dense"}
              variant={"outlined"}
              label={"Travel To"}
            />
          </div>
          <div className={styles.flex1}>
            <CustomSelectField
              isError={errors?.mode}
              errorText={errors?.mode}
              label={"Travel Mode"}
              value={data?.mode}
              handleChange={(value) => {
                handleChange(value, "mode");
              }}
            >
              <MenuItem value={"BUS"}> BUS</MenuItem>
              <MenuItem value={"TRAIN"}>TRAIN</MenuItem>
              <MenuItem value={"AIR"}>AIR</MenuItem>
            </CustomSelectField>
          </div>
        </div>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <CustomSelectField
              isError={errors?.class}
              errorText={errors?.class}
              label={"Class of Travel"}
              value={data?.class}
              handleChange={(value) => {
                handleChange(value, "class");
              }}
            >
              <MenuItem value={"NORMAL"}> NORMAL</MenuItem>
              <MenuItem value={"AC"}>AC</MenuItem>
              <MenuItem value={"ANY_OTHER"}>ANY_OTHER</MenuItem>
            </CustomSelectField>
          </div>
          <div className={styles.flex1}>
            <TextField
              type="number"
              error={errors?.bill_amount}
              onChange={handleChange}
              value={data?.bill_amount}
              fullWidth={true}
              name={"bill_amount"}
              margin={"dense"}
              variant={"outlined"}
              label={"Bill Amount"}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>
        <div
          className={styles.firstRow}
          style={{ width: "50%", marginTop: "15px" }}
        >
          <div className={styles.flex1}>
            <File
              max_size={5 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="proof"
              label="Upload Payment proof"
              accept={"application/pdf,application/msword,image/*"}
              // link={data?.slip ? data?.slip : null}
              error={errors?.payment_proof}
              value={data?.payment_proof}
              placeholder={"Upload Payment proof"}
              onChange={(file) => {
                if (file) {
                  handleChange(file, "payment_proof");
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelDetailsIncludeFields;
