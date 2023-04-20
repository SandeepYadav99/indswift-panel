import { MenuItem } from "@material-ui/core";
import React, {forwardRef} from "react";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import styles from "../../../Style.module.css";
import useContactDetail from "./ContactDetailHook";

function ContactDetails({ isDisabled}, ref) {
  const { changeTextData, errorData, form, handleReset, includeRef, isEdit, isLoading, isSubmitting, onBlurHandler, removeError } = useContactDetail({ }, ref);
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
            disabled={isDisabled ? true : false}
            isError={errorData?.current_address}
            errorText={errorData?.current_address}
            label={"Present Address"}
            value={form?.current_address}
            onTextChange={(text) => {
              changeTextData(text, "current_address");
            }}
            onBlur={() => {
              onBlurHandler("current_address");
            }}
          />
          {! isDisabled && <div className={styles.checkBox}>
            <input type="checkbox" id="addressCheckbox" name="addressCheckbox" value="isSameValue" 
            onClick={() => {
              changeTextData(!form?.is_address_same, "is_address_same");
            }}
            checked={form?.is_address_same}
            />{" "}
            <label htmlFor="addressCheckbox"> Same Permanent Address</label>
            <br />
          </div>}
        </div>

        <div className={"formGroup1"}>
          <CustomTextField
            disabled={isDisabled ? true : false}
            isError={errorData?.permanent_address}
            errorText={errorData?.permanent_address}
            label={"Permanent Address"}
            value={form?.permanent_address}
            onTextChange={(text) => {
              changeTextData(text, "permanent_address");
            }}
            onBlur={() => {
              onBlurHandler("permanent_address");
            }}
          />
        </div>
      </div>

      <div className={"formFlex1"}>
        <div className="formGroup1">
          <CustomTextField
            type="number"
            disabled={isDisabled ? true : false}
            isError={errorData?.residence_contact}
            errorText={errorData?.residence_contact}
            label={"Residence Number (with STD code)"}
            value={form?.residence_contact}
            onTextChange={(text) => {
              changeTextData(text, "residence_contact");
            }}
            onBlur={() => {
              onBlurHandler("residence_contact");
            }}
          />
        </div>
        <div className="formGroup1">
          <CustomTextField
            disabled={isDisabled ? true : false}
            isError={errorData?.emergency_name}
            errorText={errorData?.emergency_name}
            label={"Emergency Contact Name"}
            value={form?.emergency_name}
            onTextChange={(text) => {
              changeTextData(text, "emergency_name");
            }}
            onBlur={() => {
              onBlurHandler("emergency_name");
            }}
          />
        </div>
      </div>

      <div className={"formFlex1"}>
        <div className="formGroup1">
          <CustomTextField
            disabled={isDisabled ? true : false}
            isError={errorData?.emergency_relation}
            errorText={errorData?.emergency_relation}
            label={"Emergency Contact Relation"}
            value={form?.emergency_relation}
            onTextChange={(text) => {
              changeTextData(text, "emergency_relation");
            }}
            onBlur={() => {
              onBlurHandler("emergency_relation");
            }}
          />
        </div>
        <div className="formGroup1">
          <CustomTextField
            type="number"
            disabled={isDisabled ? true : false}
            isError={errorData?.emergency_contact}
            errorText={errorData?.emergency_contact}
            label={"Emergency Contact Number"}
            value={form?.emergency_contact}
            onTextChange={(text) => {
              changeTextData(text, "emergency_contact");
            }}
            onBlur={() => {
              onBlurHandler("emergency_contact");
            }}
          />
        </div>
      </div>
    </>
  );
}

export default forwardRef(ContactDetails);
