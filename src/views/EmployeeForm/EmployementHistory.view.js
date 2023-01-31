import { ButtonBase, Checkbox, MenuItem } from "@material-ui/core";
import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";
import React, { useCallback, useState } from "react";
import { useRef } from "react";
import CustomToggle from "../../components/FormFields/CustomToggle";
import CustomDatePicker from "../../components/FormFields/DatePicker/CustomDatePicker";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import { isNum } from "../../libs/RegexUtils";
import EmployeeIncludeForm from "./components/EmployementHistory/EmployeeIncludes.component";
import SalaryDetail from "./components/SalaryDetails/SalaryDetails";
import useEmployeeFormDetail from "./EmployeeFormHook";
import styles from "./Style.module.css";

function EmploymentHistory({ location }) {
  const {
    form,
    errorData,
    isSubmitting,
    isLoading,
    employees,
    handleSubmit,
    removeError,
    onBlurHandler,
    changeTextData,
    historyRef,
    qualificationRef,
    isEdit,
    handleDelete,
    handleReset,
    selectedJobId,
    jobDetails,
  } = useEmployeeFormDetail({ location });
  const classes = useStyles();

  return (
    <div className={styles.employeeLoginWrapper}>
      <div className={styles.employeeLoginContainer}>
        <div className={styles.logoImg}>
          <img
            src={require("../../assets/img/login logo@2x.png")}
            className={styles.sky}
          />
        </div>
        <div className={styles.loginSignupText}>
          <h1 className={styles.headingText}>
            Employment Application FormFields
          </h1>
          <div className={styles.newLine} />
        </div>
        <div className={styles.signContainer}>
          <div className={"plainPaper"}>
            <div className={"headerFlex"}>
              <h4 className={"infoTitle"}>
                <div className={"heading"}>
                  Employement History{" "}
                  <span>(Please start from most recent employer)</span>
                </div>
              </h4>
              <div style={{ width: "250px" }}>
                <CustomToggle
                  value={!form?.is_fresher}
                  handleChange={() => {
                    changeTextData(!form?.is_fresher, "is_fresher");
                  }}
                  leftLabel={"Fresher"}
                  rightLabel={"Experienced"}
                />
              </div>
            </div>
            {!form.is_fresher ? <EmployeeIncludeForm ref={historyRef} /> : ""}
          </div>
        </div>
        <div className={styles.signContainer}>
          <SalaryDetail />
        </div>
        <div className={styles.signContainer}>
          {/* <SalaryDetail /> */}
          <div className={"headerFlex1"}>
            <h4 className={"infoTitle1"}>
              <div className={"heading1"}>Other Information</div>
            </h4>
          </div>
          <div className={"formFlex1"}>
            <div className={"formGroup1"}>
              <CustomTextField
                // isError={errorData?.name}
                // errorText={errorData?.name}
                label={"Interview by IISL before"}
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
              <CustomDatePicker
                clearable
                label={"Interview Date"}
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
                label={"Position Interviewed For"}
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
                label={"Any additonal Information"}
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
        </div>
        <div className={styles.signContainer}>
          <div className={"DeclarationHeading"}>Other Information</div>
          <div className={styles.discriptionWrap}>
            <div style={{ gap: "5px" }}>
              <Checkbox
                style={{ padding: 0, marginRight: "10px" }}
                name={"is_mandatory"}
                //  checked={val.is_mandatory}
                //  onChange={(e) => this._handleMenuClick(e,index)}
              />
            </div>
            <div>
              <p style={{ padding: 0, margin: 0, fontWeight: "500" }}>
                I solemnly declare that all the particulars furnished in this
                form are true and correct to my knowledge and belief. I
                understand that any incorrect statement of facts/willful
                concealment of any material or facts will render me liable to
                termination from the services of the conpany
              </p>
            </div>
          </div>

          <div className={styles.btnContainer}>
            <div className={styles.btnCont1}>
              <ButtonBase className={styles.edit}>PREVIOUS</ButtonBase>
              <ButtonBase
                type={"button"}
                // onClick={handleSubmit}
                className={styles.createBtn}
              >
                SUBMIT
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmploymentHistory;
