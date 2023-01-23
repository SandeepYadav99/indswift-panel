import { MenuItem } from "@material-ui/core";
import React from "react";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import styles from "../../Style.module.css";

function ContactDetails() {
  return (
    <>
      <div className={"headerFlex1"}>
        <h4 className={"infoTitle1"}>
          <div className={"heading1"}>Contact Details</div>
        </h4>
      </div>
      <div className={"formFlex1"}>
        <div className={"formGroup1"}>
          <CustomTextField
            // isError={errorData?.name}
            // errorText={errorData?.name}
            label={"Present Address"}
            // value={form?.name}
            // onTextChange={(text) => {
            //   changeTextData(text, "name");
            // }}
            // onBlur={() => {
            //   onBlurHandler("name");
            // }}
          />
          <div className={styles.checkBox}>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />{" "}
            <label htmlFor="vehicle1"> Same Correspondence Address</label>
            <br />
          </div>
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
      </div>

      <div className={"formFlex1"}>
        <div className="formGroup1">
          <CustomTextField
            // isError={errorData?.name}
            // errorText={errorData?.name}
            label={"Residence Number (with STD code)"}
            // value={form?.name}
            // onTextChange={(text) => {
            //   changeTextData(text, "name");
            // }}
            // onBlur={() => {
            //   onBlurHandler("name");
            // }}
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
      </div>
    </>
  );
}

export default ContactDetails;
