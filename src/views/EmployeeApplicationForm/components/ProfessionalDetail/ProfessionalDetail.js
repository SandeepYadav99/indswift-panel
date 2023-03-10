import { MenuItem } from "@material-ui/core";
import React, {forwardRef} from "react";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import useProfessionalDetail from "./ProfessionalDetailHook";

const ProfessionalDetail = ({isDisabled}, ref) => {
    const { changeTextData, errorData, form, handleReset, includeRef, isEdit, isLoading, isSubmitting, onBlurHandler, removeError } = useProfessionalDetail({}, ref);
  return (
    <>
      <div className={"headerFlex1"}>
        <h4 className={"infoTitle1"}>
          <div className={"heading1"}>Professional Details</div>
        </h4>
      </div>
      <div className={"formFlex1"}>
        <div className={"formGroup1"}>
          <CustomSelectField
            disabled={isDisabled ? true: false}
            isError={errorData?.is_referred}
            errorText={errorData?.is_referred}
            label={"Referred by IISL Employee"}
            value={form?.is_referred}
            handleChange={(value) => {
              changeTextData(value, "is_referred");
            }}
          >
            <MenuItem value="YES">Yes</MenuItem>
            <MenuItem value="NO">No</MenuItem>
          </CustomSelectField>
        </div>
      </div>
      <div className={"formFlex1"}>
        <div className="formGroup1">
          <CustomTextField
            disabled={isDisabled ? true: false}
            isError={errorData?.referer_name}
            errorText={errorData?.referer_name}
            label={"Name"}
            value={form?.referer_name}
            onTextChange={(text) => {
              changeTextData(text, "referer_name");
            }}
            onBlur={() => {
              onBlurHandler("referer_name");
            }}
          />
        </div>
        <div className="formGroup1">
          <CustomTextField
            disabled={isDisabled ? true: false}
            isError={errorData?.referer_designation}
            errorText={errorData?.referer_designation}
            label={"Designation"}
            value={form?.referer_designation}
            onTextChange={(text) => {
              changeTextData(text, "referer_designation");
            }}
            onBlur={() => {
              onBlurHandler("referer_designation");
            }}
          />
        </div>
        <div className="formGroup1">
          <CustomTextField
            disabled={isDisabled ? true: false}
            isError={errorData?.referer_department}
            errorText={errorData?.referer_department}
            label={"Department"}
            value={form?.referer_department}
            onTextChange={(text) => {
              changeTextData(text, "referer_department");
            }}
            onBlur={() => {
              onBlurHandler("referer_department");
            }}
          />
        </div>
        <div className="formGroup1">
          <CustomTextField
            disabled={isDisabled ? true: false}
            isError={errorData?.referer_location}
            errorText={errorData?.referer_location}
            label={"Location"}
            value={form?.referer_location}
            onTextChange={(text) => {
              changeTextData(text, "referer_location");
            }}
            onBlur={() => {
              onBlurHandler("referer_location");
            }}
          />
        </div>
      </div>
      <div className={"formFlex1"}>
        <div className={"formGroup1"}>
          <CustomSelectField
            disabled={isDisabled ? true: false}
            isError={errorData?.is_bond}
            errorText={errorData?.is_bond}
            label={"Covered Under any kind bond/contract"}
            value={form?.is_bond}
            handleChange={(value) => {
              changeTextData(value, "is_bond");
            }}
          >
            <MenuItem value="YES">Yes</MenuItem>
            <MenuItem value="NO">No</MenuItem>
          </CustomSelectField>
        </div>
      </div>
      <div className={"formFlex1"}>
        <div className={"formGroup1"}>
          <CustomDatePicker
            disabled={isDisabled ? true: false}
            clearable
            label={"Date of Expiry"}
            minDate={new Date()}
            onChange={(date) => {
              changeTextData(date, "bond_expiry_date");
            }}
            value={form?.bond_expiry_date}
            isError={errorData?.bond_expiry_date}
          />
        </div>
      </div>
      <div className={"formFlex1"}>
        <div className={"formGroup1"}>
          <CustomSelectField
            disabled={isDisabled ? true: false}
            isError={errorData?.is_convicted}
            errorText={errorData?.is_convicted}
            label={
              "Any history of prosecution,fined or conviction by court of law of any offence"
            }
            value={form?.is_convicted}
            handleChange={(value) => {
              changeTextData(value, "is_convicted");
            }}
          >
            <MenuItem value="YES">Yes</MenuItem>
            <MenuItem value="NO">No</MenuItem>
          </CustomSelectField>
        </div>
      </div>
      <div className="formGroup1">
        <CustomTextField
          disabled={isDisabled ? true: false}
          isError={errorData?.pending_case_brief}
          errorText={errorData?.pending_case_brief}
          label={"Details of pending case"}
          value={form?.pending_case_brief}
          onTextChange={(text) => {
            changeTextData(text, "pending_case_brief");
          }}
          onBlur={() => {
            onBlurHandler("pending_case_brief");
          }}
        />
      </div>
      <div className={"formFlex1"}>
        <div className={"formGroup1"}>
          <CustomSelectField
            disabled={isDisabled ? true: false}
            isError={errorData?.is_personal_transport}
            errorText={errorData?.is_personal_transport}
            label={"Do you possess a personal transport"}
            value={form?.is_personal_transport}
            handleChange={(value) => {
              changeTextData(value, "is_personal_transport");
            }}
          >
            <MenuItem value="YES">Yes</MenuItem>
            <MenuItem value="NO">No</MenuItem>
          </CustomSelectField>
        </div>
      </div>
      <div className={"formFlex1"}>
        <div className={"formGroup1"}>
          <CustomSelectField
            disabled={isDisabled ? true: false}
            isError={errorData?.is_ailments}
            errorText={errorData?.is_ailments}
            label={"Suffer from any ailments"}
            value={form?.is_ailments}
            handleChange={(value) => {
              changeTextData(value, "is_ailments");
            }}
          >
            <MenuItem value="YES">Yes</MenuItem>
            <MenuItem value="NO">No</MenuItem>
          </CustomSelectField>
        </div>
      </div>
      <div className={"formFlex1"}>
        <div className={"formGroup1"}>
          <CustomSelectField
            disabled={isDisabled ? true: false}
            isError={errorData?.ailment_type}
            errorText={errorData?.ailment_type}
            label={"Type"}
            value={form?.ailment_type}
            handleChange={(value) => {
              changeTextData(value, "ailment_type");
            }}
          >
            <MenuItem value="1">Physical Disability</MenuItem>
            <MenuItem value="2">other</MenuItem>
          </CustomSelectField>
        </div>
      </div>
      <div className="formGroup1">
        <CustomTextField
          disabled={isDisabled ? true: false}
          isError={errorData?.ailment_details}
          errorText={errorData?.ailment_details}
          label={"Specify Details"}
          value={form?.ailment_details}
          onTextChange={(text) => {
            changeTextData(text, "ailment_details");
          }}
          onBlur={() => {
            onBlurHandler("ailment_details");
          }}
        />
      </div>{" "}
      <div className="formGroup1">
      <CustomSelectField
            disabled={isDisabled ? true: false}
            isError={errorData?.is_any_relative}
            errorText={errorData?.is_any_relative}
            label={"Any Relative working in the ISLL"}
            value={form?.is_any_relative}
            handleChange={(value) => {
              changeTextData(value, "is_any_relative");
            }}
          >
           <MenuItem value="YES">Yes</MenuItem>
            <MenuItem value="NO">No</MenuItem>
          </CustomSelectField>
      </div>
      <div className={"formFlex1"}>
        <div className="formGroup1">
          <CustomTextField
            disabled={isDisabled ? true: false}
            isError={errorData?.relative_name}
            errorText={errorData?.relative_name}
            label={"Name"}
            value={form?.relative_name}
            onTextChange={(text) => {
              changeTextData(text, "relative_name");
            }}
            onBlur={() => {
              onBlurHandler("relative_name");
            }}
          />
        </div>
        <div className="formGroup1">
          <CustomTextField
            disabled={isDisabled ? true: false}
            isError={errorData?.relative_designation}
            errorText={errorData?.relative_designation}
            label={"Designation"}
            value={form?.relative_designation}
            onTextChange={(text) => {
              changeTextData(text, "relative_designation");
            }}
            onBlur={() => {
              onBlurHandler("relative_designation");
            }}
          />
        </div>
        <div className="formGroup1">
          <CustomTextField
            disabled={isDisabled ? true: false}
            isError={errorData?.relative_department}
            errorText={errorData?.relative_department}
            label={"Department"}
            value={form?.relative_department}
            onTextChange={(text) => {
              changeTextData(text, "relative_department");
            }}
            onBlur={() => {
              onBlurHandler("relative_department");
            }}
          />
        </div>
        <div className="formGroup1">
          <CustomTextField
            disabled={isDisabled ? true: false}
            isError={errorData?.relative_relation}
            errorText={errorData?.relative_relation}
            label={"Relation (if applicable)"}
            value={form?.relative_relation}
            onTextChange={(text) => {
              changeTextData(text, "relative_relation");
            }}
            onBlur={() => {
              onBlurHandler("relative_relation");
            }}
          />
        </div>
      </div>
    </>
  );
}

export default forwardRef(ProfessionalDetail);
