import React, { useCallback, useState } from "react";
import { Field, reduxForm } from "redux-form";
import styles from "./Style.module.css";
import {
  ButtonBase,
  IconButton,
  InputAdornment,
  withStyles,
} from "@material-ui/core";

import DashboardSnackbar from "../../../components/Snackbar.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { isAlphaNumChars } from "../../../libs/RegexUtils";
import useResetPasswordFirst from "./ResetPasswordFirst.hook";

const ResetPasswordFirst = () => {
    const {showPasswordCurrent, setShowPasswordCurrent, isSubmitting, onBlurHandler, handleSubmit, form, errorData, changeTextData, showPasswordVerify, setShowPasswordNew, setShowPasswordVerify, showPasswordNew  } = useResetPasswordFirst({});
  return (
    <div className={styles.mainLoginView}>
      <div className={styles.loginFlex1}>
        <div className={styles.heading}>
          Success is always a <br />
          learning process
        </div>
      </div>
      <div className={styles.loginFlex2}>
        <div className={styles.signContainer}>
          <div className={styles.logoImg}>
            <img
              src={require("../../../assets/img/login logo@2x.png")}
              className={styles.sky}
            />
          </div>
          <div>
            <div className={styles.loginSignupText}>
              <h1 className={styles.headingText}>
                First Login - Reset Password
              </h1>
              <div className={styles.newLine} />
              <p className={styles.newLinetitle}>
                You need to reset your password because this is first time you
                are signing in
              </p>
            </div>
            <div>
              <div>
                <CustomTextField
                  type={showPasswordCurrent ? "text" : "password"}
                  label={"Enter current Password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowPasswordCurrent(!showPasswordCurrent)
                          }
                          // onMouseDown={handleMouseDownPassword}
                        >
                          {showPasswordCurrent ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={form?.currentPassword}
                  onTextChange={(text) => {
                    changeTextData(text, "currentPassword");
                  }}
                  isError={errorData?.currentPassword}
                  errorText={errorData?.currentPassword}
                  onBlur={() => {
                    onBlurHandler("currentPassword");
                  }}
                />
              </div>
              <br />
              <div>
                <CustomTextField
                  type={showPasswordNew ? "text" : "password"}
                  label={"Set New Password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPasswordNew(!showPasswordNew)}
                        >
                          {showPasswordNew ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={form?.newPassword}
                  onTextChange={(text) => {
                    changeTextData(text, "newPassword");
                  }}
                  isError={errorData?.newPassword}
                  errorText={errorData?.newPassword}
                  onBlur={() => {
                    onBlurHandler("newPassword");
                  }}
                />
              </div>

              <br />
              <div>
                <CustomTextField
                  type={showPasswordVerify ? "text" : "password"}
                  label={"Re-enter New Password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowPasswordVerify(!showPasswordVerify)
                          }
                          // onMouseDown={handleMouseDownPassword}
                        >
                          {showPasswordVerify ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={form?.verifyNewPassword}
                  onTextChange={(text) => {
                    changeTextData(text, "verifyNewPassword");
                  }}
                  isError={errorData?.verifyNewPassword}
                  errorText={errorData?.verifyNewPassword}
                  onBlur={() => {
                    onBlurHandler("verifyNewPassword");
                  }}
                />
              </div>
              <br />
              <ButtonBase onClick={handleSubmit} className={styles.login}>
                Reset Password
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>
      <DashboardSnackbar />
    </div>
  );
};

export default ResetPasswordFirst;
