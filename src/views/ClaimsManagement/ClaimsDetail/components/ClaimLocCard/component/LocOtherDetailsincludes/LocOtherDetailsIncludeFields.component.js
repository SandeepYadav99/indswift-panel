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
// import LogUtils from "../../../../../libs/LogUtils";
import CustomSelectField from "../../../../../../../components/FormFields/SelectField/SelectField.component";
import { accomodationType } from "../../../../../../../helper/helper";
import LogUtils from "../../../../../../../libs/LogUtils";

const LocOtherDetailsIncludeFields = ({
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
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomDatePicker
              maxDate={new Date()}
              clearable
              label={"Bill Date"}
              onChange={(e) => handleChange(e, "bill_date")}
              value={data?.bill_date}
              isError={errors?.bill_date}
            />
          </div>
          <div className={styles.formGrp}>
            <TextField
              error={errors?.bill_no}
              onChange={handleChange}
              value={data?.bill_no}
              fullWidth={true}
              name={"bill_no"}
              margin={"dense"}
              variant={"outlined"}
              label={"Bill No."}
            />
          </div>
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
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <TextField
              error={errors?.details}
              onChange={handleChange}
              value={data?.details}
              fullWidth={true}
              name={"details"}
              margin={"dense"}
              variant={"outlined"}
              label={"Description"}
            />
          </div>
          <div className={styles.formGrp}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="relocation_documents"
              label="Add Attachment"
              accept={"application/pdf,application/msword,image/*"}
              error={errors?.relocation_documents}
              value={data?.relocation_documents}
              placeholder={"Add Attachment"}
              onChange={(file) => {
                if (file) {
                  LogUtils.log("file", file);
                  handleChange(file, "relocation_documents");
                }
              }}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomSelectField
              isError={errors?.payment_mode}
              errorText={errors?.payment_mode}
              label={"Payment Mode"}
              value={data?.payment_mode}
              handleChange={(value) => {
                handleChange(value, "payment_mode");
              }}
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Cheque">Cheque</MenuItem>
              <MenuItem value="Card">Card</MenuItem>
              <MenuItem value="UPI">UPI</MenuItem>
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
            </CustomSelectField>
          </div>
          <div className={styles.formGrp}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="relocation_payment_proof"
              label="Add Attachment"
              accept={"application/pdf,application/msword,image/*"}
              error={errors?.relocation_payment_proof}
              value={data?.relocation_payment_proof}
              placeholder={"Add Attachment"}
              onChange={(file) => {
                if (file) {
                  LogUtils.log("file", file);
                  handleChange(file, "relocation_payment_proof");
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

export default LocOtherDetailsIncludeFields;
