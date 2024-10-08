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
import { useEffect } from "react";
import { calculateTravelDistance } from "../../../../../../../helper/helper";
import { isNum } from "../../../../../../../libs/RegexUtils";
import File from "../../../../../../../components/FileComponent/FileComponent.component";
import LogUtils from "../../../../../../../libs/LogUtils";

const OtherDetailsIncludeFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
  month,
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
      if (name === "amount") {
        if (value >=0){
          changeData(index, { [name]: value });
        }
      } else {
        changeData(index, { [name]: value });
      }
    }
  };
  useEffect(() => {
    if (data?.travel_date) {
      changeData(index, { ["travel_date"]: "" },'dataValue');
    }
  }, [month]);
  useEffect(() => {
    if (data?.type === "Interlocation" && data?.from && data?.to) {
      const values = calculateTravelDistance(data?.from, data?.to);
      changeData(index, { ["total_kms"]: values });
    }
  }, [data?.from, data?.to, data?.type]);

  const minDate = useMemo(() => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 45);
    return minDate;
  }, []);
  return (
    <div>
      <div className={styles.heading}>Nature of Expense</div>
      <div className={styles.flexContainer}>
        <div className={styles.radioWrapper}>
          <RadioGroup
            aria-label="option"
            name="type"
            value={data?.type}
            onChange={(e) => handleChange(e, "type")}
            row
            className={styles.radioWrap}
          >
            <FormControlLabel
              value="Parking"
              control={<Radio />}
              label="Parking"
            />
            <FormControlLabel
              // style={{ marginLeft: "20px" }}
              value="Toll"
              control={<Radio />}
              label="Toll"
            />
            <FormControlLabel
              // style={{ marginLeft: "20px" }}
              value="Other"
              control={<Radio />}
              label="Other"
            />
          </RadioGroup>
        </div>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <TextField
              error={errors?.details}
              onChange={handleChange}
              value={data?.details}
              fullWidth={true}
              name={"details"}
              margin={"dense"}
              variant={"outlined"}
              label={"Mention Details"}
            />
          </div>
        </div>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <CustomDatePicker
              disabled={!month ? true: false}
              clearable
              label={"Travel Date"}
              minDate={startDate}
              maxDate={endDate}
              // minDate={minDate}
              // maxDate={new Date()}
              onChange={(e) => handleChange(e, "travel_date")}
              value={data?.travel_date}
              isError={errors?.travel_date}
            />
          </div>

          <div className={styles.flex1}>
            <TextField
              type="number"
              error={errors?.amount}
              onChange={handleChange}
              value={data?.amount}
              fullWidth={true}
              name={"amount"}
              margin={"dense"}
              variant={"outlined"}
              label={"Slip Amount"}
            />
          </div>
        </div>

        <div className={styles.formWrp}>
        <div className={styles.formGrp}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="slip"
              label="Upload Slip"
              accept={"application/pdf,application/msword,image/*"}
              // link={data?.slip ? data?.slip : null}
              error={errors?.slip}
              value={data?.slip}
              placeholder={"Upload Slip"}
              onChange={(file) => {
                if (file) {
                  LogUtils.log('file', file);
                  handleChange(file, "slip");
                }
              }}
            />
          </div>
          <div className={styles.BtnWrap}>
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

export default OtherDetailsIncludeFields;
