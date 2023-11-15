import { ButtonBase } from "@material-ui/core";
import React from "react";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import styles from "./Style.module.css";

import SnackbarComponent from "../../components/Snackbar.component";
import useSuccessionApplicationFormHook from "./SuccessionApplicationFormHook";

function SuccessionApplicationForm() {
  const {
    changeTextData,
    errorData,
    form,
    handleDelete,
    handleSubmit,
    isSubmitting,
    onBlurHandler,
    removeError,
  } = useSuccessionApplicationFormHook({});
  
  return (
    <div className={styles.employeeLoginWrapper}>
      {/* <div className={styles.loginFlex2}> */}
      <div className={styles.signContainer}>
        <div className={styles.logoImg}>
          <img
            src={require("../../assets/img/login logo@2x.png")}
            className={styles.sky}
          />
        </div>
        <div className={styles.loginSignupText}>
          <h1 className={styles.headingText}>Employee Succession Form</h1>
          <div className={styles.newLine} />
          <p className={styles.newLinetitle}>
            Enter your Employee Code and the OTP that you have received on your
            mail
          </p>
        </div>
        <br />
        <div>
          <div>
            <CustomTextField
              isError={errorData?.email}
              errorText={errorData?.email}
              label={"Email"}
              value={form?.email}
              onTextChange={(text) => {
                changeTextData(text, "email");
              }}
              onBlur={() => {
                onBlurHandler("email");
              }}
            />
          </div>
          <br />
          <div>
            <CustomTextField
              isError={errorData?.otp}
              errorText={errorData?.otp}
              label={"OTP"}
              value={form?.otp}
              onTextChange={(text) => {
                changeTextData(text, "otp");
              }}
              onBlur={() => {
                onBlurHandler("otp");
              }}
            />
          </div>
        </div>
        <div className={styles.btnWrap}>
          <ButtonBase
            disabled={isSubmitting}
            onClick={handleSubmit}
            className={styles.login}
          >
            Login
          </ButtonBase>
        </div>
      </div>
      <SnackbarComponent />
    </div>
  );
}

export default SuccessionApplicationForm;
