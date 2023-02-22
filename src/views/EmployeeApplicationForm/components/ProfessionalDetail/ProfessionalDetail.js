import { MenuItem } from "@material-ui/core";
import React, {forwardRef} from "react";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import useProfessionalDetail from "./ProfessionalDetailHook";

const ProfessionalDetail = ({}, ref) => {
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
            // isError={errorData?.name}
            // errorText={errorData?.name}
            label={"Name"}
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
            label={"Designation"}
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
            label={"Department"}
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
            label={"Location"}
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
        <div className={"formGroup1"}>
          <CustomSelectField
            // isError={errorData?.vacancy_type}
            // errorText={errorData?.vacancy_type}
            label={"Covered Under any kind bond/contract"}
            // value={form?.vacancy_type}
            // handleChange={(value) => {
            //   changeTextData(value, "vacancy_type");
            // }}
          >
            <MenuItem value="yes">yes</MenuItem>
            <MenuItem value="no">no</MenuItem>
          </CustomSelectField>
        </div>
      </div>
      <div className={"formFlex1"}>
        <div className={"formGroup1"}>
          <CustomDatePicker
            clearable
            label={"Date of Expiry"}
            minDate={new Date()}
            // onChange={(date) => {
            //   changeTextData(date, "effective_date");
            // }}
            // value={form?.effective_date}
            // isError={errorData?.effective_date}
          />
        </div>
      </div>
      <div className={"formFlex1"}>
        <div className={"formGroup1"}>
          <CustomSelectField
            // isError={errorData?.vacancy_type}
            // errorText={errorData?.vacancy_type}
            label={
              "Any history of prosecution,fined or conviction by court of law of any offence"
            }
            // value={form?.vacancy_type}
            // handleChange={(value) => {
            //   changeTextData(value, "vacancy_type");
            // }}
          >
            <MenuItem value="yes">yes</MenuItem>
            <MenuItem value="no">no</MenuItem>
          </CustomSelectField>
        </div>
      </div>
      <div className="formGroup1">
        <CustomTextField
          // isError={errorData?.name}
          // errorText={errorData?.name}
          label={"Details of pending case"}
          // value={form?.name}
          // onTextChange={(text) => {
          //   changeTextData(text, "name");
          // }}
          // onBlur={() => {
          //   onBlurHandler("name");
          // }}
        />
      </div>
      <div className={"formFlex1"}>
        <div className={"formGroup1"}>
          <CustomSelectField
            // isError={errorData?.vacancy_type}
            // errorText={errorData?.vacancy_type}
            label={"Do you possess a personal transport"}
            // value={form?.vacancy_type}
            // handleChange={(value) => {
            //   changeTextData(value, "vacancy_type");
            // }}
          >
            <MenuItem value="yes">yes</MenuItem>
            <MenuItem value="no">no</MenuItem>
          </CustomSelectField>
        </div>
      </div>
      <div className={"formFlex1"}>
        <div className={"formGroup1"}>
          <CustomSelectField
            // isError={errorData?.vacancy_type}
            // errorText={errorData?.vacancy_type}
            label={"Suffer from any ailments"}
            // value={form?.vacancy_type}
            // handleChange={(value) => {
            //   changeTextData(value, "vacancy_type");
            // }}
          >
            <MenuItem value="yes">yes</MenuItem>
            <MenuItem value="no">no</MenuItem>
          </CustomSelectField>
        </div>
      </div>
      <div className={"formFlex1"}>
        <div className={"formGroup1"}>
          <CustomSelectField
            // isError={errorData?.vacancy_type}
            // errorText={errorData?.vacancy_type}
            label={"Type"}
            // value={form?.vacancy_type}
            // handleChange={(value) => {
            //   changeTextData(value, "vacancy_type");
            // }}
          >
            <MenuItem value="1">Physical Disability</MenuItem>
            <MenuItem value="2">other</MenuItem>
          </CustomSelectField>
        </div>
      </div>
      <div className="formGroup1">
        <CustomTextField
          // isError={errorData?.name}
          // errorText={errorData?.name}
          label={"Specify Details"}
          // value={form?.name}
          // onTextChange={(text) => {
          //   changeTextData(text, "name");
          // }}
          // onBlur={() => {
          //   onBlurHandler("name");
          // }}
        />
      </div>{" "}
      <div className="formGroup1">
        <CustomTextField
          // isError={errorData?.name}
          // errorText={errorData?.name}
          label={"Any Relative working in the ISLL"}
          // value={form?.name}
          // onTextChange={(text) => {
          //   changeTextData(text, "name");
          // }}
          // onBlur={() => {
          //   onBlurHandler("name");
          // }}
        />
      </div>
      <div className={"formFlex1"}>
        <div className="formGroup1">
          <CustomTextField
            // isError={errorData?.name}
            // errorText={errorData?.name}
            label={"Name"}
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
            label={"Designation"}
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
            label={"Department"}
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
            label={"Relation (if applicable)"}
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

export default forwardRef(ProfessionalDetail);
