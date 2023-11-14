import React from "react";
import styles from "./Style.module.css";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";

import { ButtonBase } from "@material-ui/core";
const SuccessionPlannerDetailform = ({ form }) => {
  return (
    <div className={styles.successContainer}>
      <div>
        <div className={styles.employ}>
          <div>
            <div className={styles.title}>Employee Name:</div>
            <span>Name</span>
          </div>
          <div className={styles.empCode}>
            <div className={styles.title}>Employee Code:</div>
            <span>Code</span>
          </div>
        </div>
        <div>
          {" "}
          <br />
          <div className={styles.title}>Annual Salary:</div>
          <span>Salary</span>
        </div>
      </div>{" "}
      <br />
      <div>
        <div className={styles.container}>
          <div className={styles.leftColumn}>
            <div className={"formGroup"}>
              <CustomTextField
                // isError={errorData?.emp_code}
                // errorText={errorData?.emp_code}
                label={"Employee Continuing With Company"}
                value={form?.emp_code}
                onTextChange={(text) => {
                  // changeTextData(text, "emp_code");
                }}
                // onBlur={() => {
                //   onBlurHandler("emp_code");
                // }}
              />
            </div>
           
              {/* <div className={"formGroup"}>
                <CustomDatePicker
                  clearable
                  label={"Last Working Date"}
                  maxDate={new Date()}
                  onChange={(date) => {
                    // changeTextData(date, "dob");
                  }}
                  value={form?.dob}
                  // isError={errorData?.dob}
                />
              </div> */}
           
            <div className={"formGroup"}>
              <CustomTextField
                // isError={errorData?.emp_code}
                // errorText={errorData?.emp_code}
                label={"Succession"}
                value={form?.emp_code}
                onTextChange={(text) => {
                  // changeTextData(text, "emp_code");
                }}
                // onBlur={() => {
                //   onBlurHandler("emp_code");
                // }}
              />
            </div>

            <div className={"formGroup"}>
              <CustomTextField
                // isError={errorData?.emp_code}
                // errorText={errorData?.emp_code}
                label={"Type of Succession"}
                value={form?.emp_code}
                onTextChange={(text) => {
                  // changeTextData(text, "emp_code");
                }}
                // onBlur={() => {
                //   onBlurHandler("emp_code");
                // }}
              />
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  // isError={errorData?.emp_code}
                  // errorText={errorData?.emp_code}
                  label={"Replacing Person"}
                  value={form?.emp_code}
                  onTextChange={(text) => {
                    // changeTextData(text, "emp_code");
                  }}
                  // onBlur={() => {
                  //   onBlurHandler("emp_code");
                  // }}
                />
                  </div>
                <div className={"formGroup"}>

                <CustomTextField
                  // isError={errorData?.emp_code}
                  // errorText={errorData?.emp_code}
                  label={"Salary"}
                  value={form?.emp_code}
                  onTextChange={(text) => {
                    // changeTextData(text, "emp_code");
                  }}
                  // onBlur={() => {
                  //   onBlurHandler("emp_code");
                  // }}
                />
                </div>
            
            </div>
            <p>
            Succession's Cost WRT employee: <b>-5% </b>
            </p>

            <div className={"formGroup"}>
              <CustomTextField
                // isError={errorData?.emp_code}
                // errorText={errorData?.emp_code}
                label={"Type of Succession"}
                value={form?.emp_code}
                onTextChange={(text) => {
                  // changeTextData(text, "emp_code");
                }}
                // onBlur={() => {
                //   onBlurHandler("emp_code");
                // }}
              />
            </div>
            <div className={"formGroup"}>
              <CustomTextField
                // isError={errorData?.emp_code}
                // errorText={errorData?.emp_code}
                label={"Type of Succession"}
                value={form?.emp_code}
                onTextChange={(text) => {
                  // changeTextData(text, "emp_code");
                }}
                // onBlur={() => {
                //   onBlurHandler("emp_code");
                // }}
                multiline
                rows={3}
              />
            </div>
          </div>

       
        </div>
        <div className={styles.actionButton}>

        <ButtonBase
            type={"button"}
            className={styles.createBtn}
            // onClick={handleSubmit}
          >
            SEND FOR APPROVAL
          </ButtonBase>
        </div>
      </div>
    
    </div>
  );
};

export default SuccessionPlannerDetailform;
