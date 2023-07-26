import { ButtonBase, IconButton, InputAdornment } from "@material-ui/core";
import React from "react";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import styles from "./Style.module.css";
import useGuarantorLogin from "./GuarantorLoginHook";
import SnackbarComponent from "../../../components/Snackbar.component";

function GuarantorLogin() {
  const {
    changeTextData,
    errorData,
    form,
    handleDelete,
    handleSubmit,
    isSubmitting,
    onBlurHandler,
    removeError,
  } = useGuarantorLogin({});
  return (
    <div className={styles.employeeLoginWrapper}>
      {/* <div className={styles.loginFlex2}> */}
      <div className={styles.signContainer}>
        <div className={styles.logoImg}>
          <img
            src={require("../../../assets/img/login logo@2x.png")}
            className={styles.sky}
          />
        </div>
        <div className={styles.loginSignupText}>
          <h1 className={styles.headingText}>Guarantor Confirmation</h1>
          <div className={styles.newLine} />
          <p className={styles.newLinetitle}>
            Enter your Email ID and the 4 digit unique access code that you have
            received
          </p>
        </div>
        <br />
        <div>
          <div>
            <CustomTextField
              isError={errorData?.emp_code}
              errorText={errorData?.emp_code}
              label={"Employee ID"}
              value={form?.emp_code}
              onTextChange={(text) => {
                changeTextData(text, "emp_code");
              }}
              onBlur={() => {
                onBlurHandler("emp_code");
              }}
            />
          </div>
          <br />
          <div>
            <CustomTextField
              isError={errorData?.code}
              errorText={errorData?.code}
              label={"4 Digit Code"}
              value={form?.code}
              onTextChange={(text) => {
                changeTextData(text, "code");
              }}
              onBlur={() => {
                onBlurHandler("code");
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
            Submit
          </ButtonBase>
        </div>
      </div>
      <SnackbarComponent />
    </div>
  );
}

export default GuarantorLogin;
