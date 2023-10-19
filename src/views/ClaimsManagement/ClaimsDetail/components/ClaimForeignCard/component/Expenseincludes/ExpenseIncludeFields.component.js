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
import File from "../../../../../../../components/FileComponent/FileComponent.component";
import { Autocomplete } from "@material-ui/lab";
import {
  entitlementAmout,
  travelListExpense,
} from "../../../../../../../helper/helper";

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

  useEffect(() => {
    if (data?.mode) {
      if (data?.mode === "OWN_CAR") {
        if (data?.total_kms) {
          changeData(index, {
            ["amount"]: 9 * Number(data?.total_kms),
          });
        }
      } else if (data?.mode === "TWO_WHEELER") {
        if (data?.total_kms) {
          changeData(index, {
            ["amount"]: 5 * Number(data?.total_kms),
          });
        }
      }
    }
  }, [data?.total_kms, data?.mode]);

  return (
    <div>
      <div className={styles.heading}>Travel Type</div>
      <div className={styles.flexContainer}>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
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
          <div className={styles.flex1}></div>
          <div className={styles.flex1}></div>
        </div>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <CustomDatePicker
              disabled={!startDate ? true : false}
              clearable
              label={"Check In Date"}
              minDate={startDate}
              maxDate={endDate}
              onChange={(e) => handleChange(e, "travel_date")}
              value={data?.travel_date}
              isError={errors?.travel_date}
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
              {travelListExpense?.map((item, index) => (
                <MenuItem value={item?.id} key={`menu_${index}`}>
                  {" "}
                  {item?.name}
                </MenuItem>
              ))}
            </CustomSelectField>
          </div>
          <div className={styles.flex155}>
            <TextField
              error={errors?.details}
              onChange={handleChange}
              value={data?.details}
              fullWidth={true}
              name={"details"}
              margin={"dense"}
              variant={"outlined"}
              label={
                "Details of Travel Medium (Train No, Flight No, Bus Type etc)"
              }
            />
          </div>
        </div>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
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
            </CustomSelectField>
          </div>
          <div className={styles.flex1}>
            <CustomSelectField
              isError={errors?.payment_by}
              errorText={errors?.payment_by}
              label={"Payment Made By"}
              value={data?.payment_by}
              handleChange={(value) => {
                handleChange(value, "payment_by");
              }}
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Card">Card</MenuItem>
              <MenuItem value="OTHER">OTHER</MenuItem>
            </CustomSelectField>
          </div>
          <div className={styles.flex1}>
            <TextField
              type="number"
              error={errors?.total_kms}
              onChange={handleChange}
              value={data?.total_kms}
              fullWidth={true}
              name={"total_kms"}
              margin={"dense"}
              variant={"outlined"}
              label={"No of KMs"}
            />
          </div>
        </div>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="proof"
              label="Attach Proof of Payment"
              accept={"application/pdf,application/msword,image/*"}
              // link={data?.slip ? data?.slip : null}
              error={errors?.travel_payment_proof}
              value={data?.travel_payment_proof}
              placeholder={"Attach Proof of Payment"}
              onChange={(file) => {
                if (file) {
                  handleChange(file, "travel_payment_proof");
                }
              }}
            />
          </div>
          <div className={styles.flex1}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="proof"
              label="Attach Voucher/Bill"
              accept={"application/pdf,application/msword,image/*"}
              // link={data?.slip ? data?.slip : null}
              error={errors?.travel_voucher}
              value={data?.travel_voucher}
              placeholder={"Attach Voucher/Bill"}
              onChange={(file) => {
                if (file) {
                  handleChange(file, "travel_voucher");
                }
              }}
            />
          </div>

          <div className={styles.flex1}>
            <TextField
              disabled={
                data?.mode === "OWN_CAR" || data?.mode === "TWO_WHEELER"
              }
              type="number"
              error={errors?.amount}
              onChange={handleChange}
              value={data?.amount}
              fullWidth={true}
              name={"amount"}
              margin={"dense"}
              variant={"outlined"}
              label={"Expense Amount"}
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
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
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
            <div style={{ fontWeight: "500", textAlign: "end" }}>
              Please mention the amount in spent currency and the exchange rate
              applied to reach at above currency.
            </div>
          </div>
          <div className={styles.flex1}></div>
          {/* <div className={styles.flex1}></div> */}
        </div>
      </div>
    </div>
  );
};

export default ExpenseIncludeFields;
