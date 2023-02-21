import { ButtonBase, MenuItem } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import styles from "../../Style.module.css";

function FamilyDetails() {
  return (
    <>
      <div className={"headerFlex1"}>
        <h4 className={"infoTitle1"}>
          <div className={"heading1"}>Family Details</div>
        </h4>
      </div>
      <div className={"formFlex1"}>
        <div className={"formGroup1"}>
          <CustomSelectField
            // isError={errorData?.vacancy_type}
            // errorText={errorData?.vacancy_type}
            label={"Emnergency Contact Relation"}
            // value={form?.vacancy_type}
            // handleChange={(value) => {
            //   changeTextData(value, "vacancy_type");
            // }}
          >
            <MenuItem value="male">abc</MenuItem>
            <MenuItem value="female">xyz</MenuItem>
          </CustomSelectField>
        </div>
        <div className={"formGroup1"}>
          <CustomTextField
            // isError={errorData?.name}
            // errorText={errorData?.name}
            label={"Permanent Address"}
            // value={form?.name}
            // onTextChange={(text) => {
            //   changeTextData(text, "name");
            // }}
            // onBlur={() => {
            //   onBlurHandler("name");
            // }}
          />
        </div>
        <div className={styles.btnwrap}>
          <ButtonBase
            className={styles.removeBtn}
            // label={this.props.index == 0 ? "+" : '-'}
          >
            Remove
          </ButtonBase>
        </div>
      </div>
      <div className={"formFlex1"}>
        <div className="formGroup1">
          <CustomDatePicker
            clearable
            label={"D.O.B"}
            // minDate={new Date()}
            // onChange={(date) => {
            //   changeTextData(date, "effective_date");
            // }}
            // value={form?.effective_date}
            // isError={errorData?.effective_date}
          />
        </div>
        <div className="formGroup1">
          <CustomTextField
            // isError={errorData?.name}
            // errorText={errorData?.name}
            label={"Emergency Contact Number"}
            // value={form?.name}
            // onTextChange={(text) => {
            //   changeTextData(text, "name");
            // }}
            // onBlur={() => {
            //   onBlurHandler("name");
            // }}
          />
        </div>
        <div className={styles.hideDiv}>
          <p>Remove</p>
        </div>
      </div>

      <div className={"formFlex1"}>
        <div className="formGroup1">
          <CustomSelectField
            // isError={errorData?.vacancy_type}
            // errorText={errorData?.vacancy_type}
            label={"Emnergency Contact Relation"}
            // value={form?.vacancy_type}
            // handleChange={(value) => {
            //   changeTextData(value, "vacancy_type");
            // }}
          >
            <MenuItem value="male">abc</MenuItem>
            <MenuItem value="female">xyz</MenuItem>
          </CustomSelectField>
        </div>
        <div className="formGroup1">
          <CustomTextField
            // isError={errorData?.name}
            // errorText={errorData?.name}
            label={"Emergency Contact Number"}
            // value={form?.name}
            // onTextChange={(text) => {
            //   changeTextData(text, "name");
            // }}
            // onBlur={() => {
            //   onBlurHandler("name");
            // }}
          />
        </div>
        <div className={styles.btnwrap}>
          <ButtonBase
            className={styles.removeBtn}
            // label={this.props.index == 0 ? "+" : '-'}
          >
            Remove
          </ButtonBase>
        </div>
      </div>
      <div className={"formFlex1"}>
        <div className="formGroup1">
          <CustomDatePicker
            clearable
            label={"D.O.B"}
            // minDate={new Date()}
            // onChange={(date) => {
            //   changeTextData(date, "effective_date");
            // }}
            // value={form?.effective_date}
            // isError={errorData?.effective_date}
          />
        </div>
        <div className="formGroup1">
          <CustomTextField
            // isError={errorData?.name}
            // errorText={errorData?.name}
            label={"Emergency Contact Number"}
            // value={form?.name}
            // onTextChange={(text) => {
            //   changeTextData(text, "name");
            // }}
            // onBlur={() => {
            //   onBlurHandler("name");
            // }}
          />
        </div>
        <div className={styles.hideDiv}>
          <p>Remove</p>
        </div>
      </div>
      <ButtonBase
        className={styles.addition}
        label={"+"}
        // onClick={() => {
        //   handlePress("ADDITION", 0);
        // }}
      >
        <Add fontSize={"small"} /> <span>Add Qualification</span>
      </ButtonBase>
    </>
  );
}

export default FamilyDetails;
