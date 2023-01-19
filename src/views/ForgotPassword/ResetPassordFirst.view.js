import React, { useCallback, useState } from "react";
import { Field, reduxForm } from "redux-form";
import styles from "./Forgot.module.css";
import {
  ButtonBase,
  IconButton,
  InputAdornment,
  withStyles,
} from "@material-ui/core";

import DashboardSnackbar from "../../components/Snackbar.component";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { isAlphaNumChars } from "../../libs/RegexUtils";

const ResetPasswordFirst = () => {
  const initialForm = {
    currentPassword: "",
    newPassword: "",
    verifyNewPassword: "",
  };
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordVerify, setShowPasswordVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["currentPassword", "newPassword", "verifyNewPassword"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (form.newPassword !== form.verifyNewPassword) {
        errors.verifyNewPassword = "New password does not match";
      } else if (form.newPassword === form.verifyNewPassword) {
        delete errors.verifyNewPassword;
      }
    });
    console.log("===>", errors);
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);
  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (
        fieldName === "currentPassword" ||
        fieldName === "newPassword" ||
        fieldName === "verifyNewPassword"
      ) {
        if (!text || (isAlphaNumChars(text) && text.toString().length <= 50)) {
          t[fieldName] = text;
        }
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }

    // submitToServer();
  }, [
    checkFormValidation,
    setErrorData,
    form,
    // submitToServer
  ]);
  //   const submitToServer = useCallback(() => {
  //     if (!isSubmitting) {
  //       setIsSubmitting(true);
  //       let req = null;
  //       if (id) {
  //         req = serviceUpdateLocation({
  //           ...form,
  //         });
  //       } else {
  //         req = serviceCreateLocation({
  //           ...form,
  //         });
  //       }
  //       req.then((res) => {
  //         // { error: true, message: tempRequest.data.response_message, authorization: true, response_code: tempRequest.data.response_code };
  //         if (!res.error) {
  //           historyUtils.push(RouteName.LOCATIONS);
  //         } else {
  //           SnackbarUtils.error(res.message);
  //         }
  //         setIsSubmitting(false);
  //       });
  //     }
  //   }, [form, isSubmitting, setIsSubmitting,]);

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );
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
              src={require("../../assets/img/login logo@2x.png")}
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
