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
import File from "../../../../../../../components/FileComponent/FileComponent.component";
import LogUtils from "../../../../../../../libs/LogUtils";
import CustomSelectField from "../../../../../../../components/FormFields/SelectField/SelectField.component";
import { accomodationType } from "../../../../../../../helper/helper";

const OtherIncludeFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
  startDate,
  endDate,
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
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
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
          </div>
          <div className={styles.formGrp}>
            <CustomSelectField
              isError={errors?.booking_by}
              errorText={errors?.booking_by}
              label={"Booking By"}
              value={data?.booking_by}
              handleChange={(value) => {
                handleChange(value, "booking_by");
              }}
            >
              <MenuItem value="SELF">SELF</MenuItem>
              <MenuItem value="OFFICE">OFFICE</MenuItem>
              <MenuItem value="COMPANY_ALLOTTED_CREDIT_CARD">
                COMPANY ALLOTTED CREDIT CARD
              </MenuItem>
            </CustomSelectField>
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomDatePicker
              // disabled={!startDate ? true : false}
              clearable
              label={"Date"}
              minDate={startDate}
              maxDate={endDate}
              onChange={(e) => handleChange(e, "date")}
              value={data?.date}
              isError={errors?.date}
            />
          </div>
          <div className={styles.formGrp}>
            <TextField
              error={errors?.details}
              onChange={handleChange}
              value={data?.details}
              fullWidth={true}
              name={"details"}
              margin={"dense"}
              variant={"outlined"}
              label={"Description of Expense"}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
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
          <div className={styles.formGrp}>
            <TextField
              error={errors?.reason}
              onChange={handleChange}
              value={data?.reason}
              fullWidth={true}
              name={"reason"}
              margin={"dense"}
              variant={"outlined"}
              label={"Reason of Expense"}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <TextField
              error={errors?.payment_made_by}
              onChange={handleChange}
              value={data?.payment_made_by}
              fullWidth={true}
              name={"payment_made_by"}
              margin={"dense"}
              variant={"outlined"}
              label={"Choose currency of payment"}
            />
            <div style={{ fontWeight: "500", textAlign: "start" }}>
              Please mention the amount in spent currency and the exchange rate
              applied to reach at above currency.
            </div>
          </div>
          <div className={styles.formGrp}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="other_payment_proof"
              label="Attach Proof of Payment"
              accept={"application/pdf,application/msword,image/*"}
              error={errors?.other_payment_proof}
              value={data?.other_payment_proof}
              placeholder={"Attach Proof of Payment"}
              onChange={(file) => {
                if (file) {
                  LogUtils.log("file", file);
                  handleChange(file, "other_payment_proof");
                }
              }}
            />
          </div>
        </div>
        <div className={styles.firstRow221}>
        <div className={styles.btnWrap}>
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

export default OtherIncludeFields;
