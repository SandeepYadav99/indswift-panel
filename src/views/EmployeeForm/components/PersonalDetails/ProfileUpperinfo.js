import { MenuItem } from '@material-ui/core';
import React from 'react';
import CustomDatePicker from '../../../../components/FormFields/DatePicker/CustomDatePicker';
import CustomSelectField from '../../../../components/FormFields/SelectField/SelectField.component';
import CustomTextField from '../../../../components/FormFields/TextField/TextField.component';
import styles from "../../Style.module.css";


function ProfileUpperinfo() {
  return (
    <div className={styles.ProfileUpperinfoWrap}>
    <div className={"formFlex1"}>
            <div className={"formGroup1"}>
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
            <div className={"formGroup1"}>
              <CustomSelectField
                // isError={errorData?.vacancy_type}
                // errorText={errorData?.vacancy_type}
                label={"Gender"}
                // value={form?.vacancy_type}
                // handleChange={(value) => {
                //   changeTextData(value, "vacancy_type");
                // }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </CustomSelectField>
            </div>
          </div>
          <div className={"formFlex1"}>
            <div className={"formGroup1"}>
              <CustomTextField
                // isError={errorData?.name}
                // errorText={errorData?.name}
                label={"Policy Name"}
                // value={form?.name}
                // onTextChange={(text) => {
                //   changeTextData(text, "name");
                // }}
                // onBlur={() => {
                //   onBlurHandler("name");
                // }}
              />
            </div>
            <div className={"formGroup1"}>
              <CustomDatePicker
                clearable
                label={"Date of Marrige (if applicable)"}
                // minDate={new Date()}
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
              <CustomTextField
                // isError={errorData?.name}
                // errorText={errorData?.name}
                label={"Policy Name"}
                // value={form?.name}
                // onTextChange={(text) => {
                //   changeTextData(text, "name");
                // }}
                // onBlur={() => {
                //   onBlurHandler("name");
                // }}
              />
            </div>
            <div className={"formGroup1"}>
              <CustomTextField
                // isError={errorData?.code}
                // errorText={errorData?.code}
                label={"Policy Number"}
                // value={form?.code}
                // onTextChange={(text) => {
                //   changeTextData(text, "code");
                // }}
                // onBlur={() => {
                //   onBlurHandler("code");
                // }}
              />
            </div>
          </div>
          <div className={"formFlex1"}>
            <div className={"formGroup1"}>
              <CustomTextField
                // isError={errorData?.code}
                // errorText={errorData?.code}
                label={"Policy Number"}
                // value={form?.code}
                // onTextChange={(text) => {
                //   changeTextData(text, "code");
                // }}
                // onBlur={() => {
                //   onBlurHandler("code");
                // }}
              />
            </div>
            <div className={"formGroup1"}>
              <CustomDatePicker
                clearable
                label={"Expiry Date of Passport"}
                minDate={new Date()}
                // onChange={(date) => {
                //   changeTextData(date, "effective_date");
                // }}
                // value={form?.effective_date}
                // isError={errorData?.effective_date}
              />
            </div>
          </div>
          </div>
  )
}

export default ProfileUpperinfo