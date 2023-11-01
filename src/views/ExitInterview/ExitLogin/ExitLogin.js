import { ButtonBase, IconButton, InputAdornment } from "@material-ui/core";
import React from "react";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import styles from "./Style.module.css";
import useExitLogin from "./ExitLoginHook";
import SnackbarComponent from "../../../components/Snackbar.component";

function ExitLogin() {
  const {
    changeTextData,
    errorData,
    form,
    handleDelete,
    handleSubmit,
    isSubmitting,
    onBlurHandler,
    removeError,
  } = useExitLogin({});
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
          <h1 className={styles.headingText}>Exit Interview</h1>
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
              isError={errorData?.emp_code}
              errorText={errorData?.emp_code}
              label={"Employee Code"}
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
              label={"OTP"}
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
            Login
          </ButtonBase>
        </div>
      </div>
      <SnackbarComponent />
    </div>
  );
}

export default ExitLogin;
