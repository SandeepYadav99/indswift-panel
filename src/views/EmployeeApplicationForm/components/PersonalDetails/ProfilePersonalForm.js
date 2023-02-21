import { MenuItem } from '@material-ui/core';
import React, {forwardRef} from 'react';
import CustomDatePicker from '../../../../components/FormFields/DatePicker/CustomDatePicker';
import CustomSelectField from '../../../../components/FormFields/SelectField/SelectField.component';
import CustomTextField from '../../../../components/FormFields/TextField/TextField.component';
import styles from "../../Style.module.css";
import useProfilePersonalForm from "./ProfilePersonalFormHook";


function ProfilePersonalForm({}, ref) {
    const { form, changeTextData, errorData, handleReset, includeRef, isEdit, isLoading, isSubmitting, onBlurHandler, removeError} = useProfilePersonalForm({}, ref);

  return (
    <div className={styles.ProfileUpperinfoWrap}>
    <div className={"formFlex1"}>
            <div className={"formGroup1"}>
              <CustomDatePicker
                clearable
                label={"D.O.B"}
                minDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "dob");
                }}
                value={form?.dob}
                isError={errorData?.dob}
              />
            </div>
            <div className={"formGroup1"}>
              <CustomSelectField
                isError={errorData?.gender}
                errorText={errorData?.gender}
                label={"Gender"}
                value={form?.gender}
                handleChange={(value) => {
                  changeTextData(value, "gender");
                }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </CustomSelectField>
            </div>
          </div>
          <div className={"formFlex1"}>
            <div className={"formGroup1"}>
              <CustomTextField
                isError={errorData?.birthplace}
                errorText={errorData?.birthplace}
                label={"Place Of Birth"}
                value={form?.birthplace}
                onTextChange={(text) => {
                  changeTextData(text, "birthplace");
                }}
                onBlur={() => {
                  onBlurHandler("birthplace");
                }}
              />
            </div>
            <div className={"formGroup1"}>
              <CustomDatePicker
                clearable
                label={"Date of Marriage (if applicable)"}
                maxDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "dom");
                }}
                value={form?.dom}
                isError={errorData?.dom}
              />
            </div>
          </div>
          <div className={"formFlex1"}>
            <div className={"formGroup1"}>
              <CustomTextField
                isError={errorData?.religion}
                errorText={errorData?.religion}
                label={"Religion"}
                value={form?.religion}
                onTextChange={(text) => {
                  changeTextData(text, "religion");
                }}
                onBlur={() => {
                  onBlurHandler("religion");
                }}
              />
            </div>
            <div className={"formGroup1"}>
              <CustomTextField
                isError={errorData?.blood_group}
                errorText={errorData?.blood_group}
                label={"Blood Group"}
                value={form?.blood_group}
                onTextChange={(text) => {
                  changeTextData(text, "blood_group");
                }}
                onBlur={() => {
                  onBlurHandler("blood_group");
                }}
              />
            </div>
          </div>
          <div className={"formFlex1"}>
            <div className={"formGroup1"}>
              <CustomTextField
                isError={errorData?.aadhar_no}
                errorText={errorData?.aadhar_no}
                label={"Aadhar Number"}
                value={form?.aadhar_no}
                onTextChange={(text) => {
                  changeTextData(text, "aadhar_no");
                }}
                onBlur={() => {
                  onBlurHandler("aadhar_no");
                }}
              />
            </div>
              <div className={"formGroup1"}>
                  <CustomTextField
                      isError={errorData?.pan_no}
                      errorText={errorData?.pan_no}
                      label={"Aadhar Number"}
                      value={form?.pan_no}
                      onTextChange={(text) => {
                          changeTextData(text, "pan_no");
                      }}
                      onBlur={() => {
                          onBlurHandler("pan_no");
                      }}
                  />
              </div>
          </div>
        <div className="formFlex1">
            <div className={"formGroup1"}>
                <CustomTextField
                    isError={errorData?.passport_no}
                    errorText={errorData?.passport_no}
                    label={"Passport No"}
                    value={form?.passport_no}
                    onTextChange={(text) => {
                        changeTextData(text, "passport_no");
                    }}
                    onBlur={() => {
                        onBlurHandler("passport_no");
                    }}
                />
            </div>
            <div className={"formGroup1"}>
                <CustomDatePicker
                    clearable
                    label={"Expiry Date of Passport"}
                    minDate={new Date()}
                    onChange={(date) => {
                        changeTextData(date, "passport_expiry_date");
                    }}
                    value={form?.passport_expiry_date}
                    isError={errorData?.passport_expiry_date}
                />
            </div>
        </div>
          </div>
  )
}

export default forwardRef(ProfilePersonalForm);
