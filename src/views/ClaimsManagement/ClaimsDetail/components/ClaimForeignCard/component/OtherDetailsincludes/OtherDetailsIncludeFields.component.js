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

const OtherDetailsIncludeFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
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
            <TextField
              error={errors?.guest_name}
              onChange={handleChange}
              value={data?.guest_name}
              fullWidth={true}
              name={"guest_name"}
              margin={"dense"}
              variant={"outlined"}
              label={"Name of Guest"}
            />
          </div>
          <div className={styles.flex12}>
            <TextField
              error={errors?.guest_details}
              onChange={handleChange}
              value={data?.guest_details}
              fullWidth={true}
              name={"guest_details"}
              margin={"dense"}
              variant={"outlined"}
              label={"Details of Guest"}
            />
          </div>
        </div>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <CustomSelectField
              isError={errors?.expense_nature}
              errorText={errors?.expense_nature}
              label={"Nature of Expenses"}
              value={data?.expense_nature}
              handleChange={(value) => {
                handleChange(value, "expense_nature");
              }}
            >
              <MenuItem value="EATING">EATING</MenuItem>
              <MenuItem value="TRAVEL">TRAVEL</MenuItem>
              <MenuItem value="GIFT">GIFT</MenuItem>
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
              label={"Bill Amount"}
            />
          </div>
          <div className={styles.flex13}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="entertainment_payment_proof"
              label="Attach Proof of Payment"
              accept={"application/pdf,application/msword,image/*"}
              error={errors?.entertainment_payment_proof}
              value={data?.entertainment_payment_proof}
              placeholder={"Attach Proof of Payment"}
              onChange={(file) => {
                if (file) {
                  LogUtils.log("file", file);
                  handleChange(file, "entertainment_payment_proof");
                }
              }}
            />
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

export default OtherDetailsIncludeFields;
