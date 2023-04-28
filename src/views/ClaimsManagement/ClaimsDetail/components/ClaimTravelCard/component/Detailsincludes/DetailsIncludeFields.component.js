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
import CustomDatePicker from "../../../../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSelectField from "../../../../../../../components/FormFields/SelectField/SelectField.component";
import { useEffect } from "react";
import {
  travelList,
  othertravelList,
  calculateTravelDistance,
  getTransportScore,
} from "../../../../../../../helper/helper";
import { isNum } from "../../../../../../../libs/RegexUtils";
import File from "../../../../../../../components/FileComponent/FileComponent.component";

const DetailsIncludeFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
  grade,
  month,
    startDate,
    endDate,
}) => {
  const gradeCodes = ["G5", "G4", "G3", "G2", "G1", "G0"];
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
      if (name === "from" || "to") {
        if (value?.length <= 40) {
          changeData(index, { [name]: value });
        }
      } else if (name === "total_kms" || "amount") {
        if (value >= 0) {
          changeData(index, { [name]: value });
        }
      } else {
        changeData(index, { [name]: value });
      }
    }
  };
  useEffect(() => {
    if (data?.travel_date) {
      changeData(index, { ["travel_date"]: "" });
    }
  }, [month]);
  useEffect(() => {
    if (data?.type === "Interlocation" && data?.from && data?.to) {
      const values = calculateTravelDistance(data?.from, data?.to);
      changeData(index, { ["total_kms"]: values });
    }
  }, [data?.from, data?.to, data?.type]);

  useEffect(() => {
    if (data?.travel_payment_proof === null && data?.total_kms) {
      changeData(index, {
        ["amount"]: data?.total_kms * getTransportScore(data?.mode),
      });
    }
  }, [data?.travel_payment_proof, data?.total_kms, data?.mode]);
  const minDate = useMemo(() => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 45);
    return minDate;
  }, []);

  return (
    <div>
      <div className={styles.heading}>Travel Type</div>
      <div className={styles.flexContainer}>
        <div className={styles.radioWrapper}>
          <RadioGroup
            aria-label="option"
            name="type"
            value={data?.type}
            onChange={(e) => handleChange(e, "type")}
            row
          >
            <FormControlLabel
              value="Interlocation"
              control={<Radio />}
              label="Interlocation"
            />
            <FormControlLabel
              style={{ marginLeft: "20px" }}
              value="Other"
              control={<Radio />}
              label="Other"
            />
          </RadioGroup>
        </div>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <CustomDatePicker
              disabled={!month ? true : false}
              clearable
              label={"Travel Date"}
              minDate={startDate}
              maxDate={endDate}
              onChange={(e) => handleChange(e, "travel_date")}
              value={data?.travel_date}
              isError={errors?.travel_date}
            />
          </div>
          <div className={styles.flex1}>
            {data?.type === "Interlocation" ? (
              <CustomSelectField
                isError={errors?.from}
                errorText={errors?.from}
                label={"Travel From"}
                value={data?.from}
                handleChange={(value) => {
                  handleChange(value, "from");
                }}
              >
                <MenuItem value="Head Office">Head Office</MenuItem>
                <MenuItem value="Bhagwanpura Plant">Bhagwanpura Plant</MenuItem>
                <MenuItem value="Essix Plant">Essix Plant</MenuItem>
                <MenuItem value="R&D Mohali">R&D Mohali</MenuItem>
                <MenuItem value="GBU">GBU</MenuItem>
              </CustomSelectField>
            ) : (
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
            )}
          </div>

          <div className={styles.flex1}>
            {data?.type === "Interlocation" ? (
              <CustomSelectField
                isError={errors?.to}
                errorText={errors?.to}
                label={"Travel To"}
                value={data?.to}
                handleChange={(value) => {
                  handleChange(value, "to");
                }}
              >
                <MenuItem value="Head Office">Head Office</MenuItem>
                <MenuItem value="Bhagwanpura Plant">Bhagwanpura Plant</MenuItem>
                <MenuItem value="Essix Plant">Essix Plant</MenuItem>
                <MenuItem value="R&D Mohali">R&D Mohali</MenuItem>
                <MenuItem value="GBU">GBU</MenuItem>
              </CustomSelectField>
            ) : (
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
            )}
          </div>
        </div>
        <div className={styles.firstRow}>
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
              {grade && gradeCodes?.includes(grade)
                ? othertravelList?.map((item) => (
                    <MenuItem value={item?.id}> {item?.name}</MenuItem>
                  ))
                : travelList?.map((item) => (
                    <MenuItem value={item?.id}> {item?.name}</MenuItem>
                  ))}
            </CustomSelectField>
          </div>
          <div className={styles.flex1}>
            <TextField
              type="number"
              disabled={data?.type === "Interlocation"}
              error={errors?.total_kms}
              onChange={handleChange}
              value={data?.total_kms}
              fullWidth={true}
              name={"total_kms"}
              margin={"dense"}
              variant={"outlined"}
              label={"Total Kilometer"}
            />
          </div>
          <div className={styles.flex1}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="proof"
              label="Upload Payment proof"
              accept={"application/pdf,application/msword,image/*"}
              // link={data?.slip ? data?.slip : null}
              error={errors?.travel_payment_proof}
              value={data?.travel_payment_proof}
              placeholder={"Upload Payment proof"}
              onChange={(file) => {
                if (file) {
                  handleChange(file, "travel_payment_proof");
                }
              }}
            />
          </div>
        </div>
        <div className={styles.firstRow221}>
          <div className={styles.flex122}>
            <TextField
              type="number"
              disabled={
                data?.travel_payment_proof === null && data?.type !== "Other"
              }
              error={errors?.amount}
              onChange={handleChange}
              value={data?.amount}
              fullWidth={true}
              name={"amount"}
              margin={"dense"}
              variant={"outlined"}
              label={"Expense Value"}
            />
          </div>
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

export default DetailsIncludeFields;
