import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  ButtonBase,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import useResetPasswordDialogHook from "./ResetPasswordDialog.hook";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "blue",
    textDecoration: "underline",
  },
  textField: {
    width: "100%",
  },
  closeBtn: {
    position: "absolute",
    right: "10px",
    top: "10px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ResetPasswordDialog = ({ isOpen, handleToggle }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    removeError,
    resData,
    isSubmitted,
    isSubmitting,
    isVerified,
    showPasswordCurrent,
    setShowPasswordCurrent,
  } = useResetPasswordDialogHook({ isOpen, handleToggle });

  return (
    <div>
      <Dialog
        onBackdropClick={() => {}}
        keepMounted
        fullWidth={true}
        maxWidth={"sm"}
        TransitionComponent={Transition}
        open={isOpen}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/*<DialogTitle id="alert-dialog-title">*/}
        <div className={styles.resetPasswordWrapper}>
          <div className={styles.resetWrapper}>
            <div className={styles.upperFlex}>Reset Password</div>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          {/*</DialogTitle>*/}
          <div className={styles.fieldWrapper}>
            <div>
              <CustomTextField
                type={showPasswordCurrent ? "text" : "password"}
                label={"Set Password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowPasswordCurrent(!showPasswordCurrent)
                        }
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
                //   value={form?.currentPassword}
                //   onTextChange={(text) => {
                //     changeTextData(text, "currentPassword");
                //   }}
                //   isError={errorData?.currentPassword}
                //   errorText={errorData?.currentPassword}
                //   onBlur={() => {
                //     onBlurHandler("currentPassword");
                //   }}
              />
            </div>
            <div className={styles.checkBox}>
              <input
                type="checkbox"
                name={"isSame"}
                value={"isSame"}
                onClick={() => {
                  changeTextData(!form?.is_address_same, "is_address_same");
                }}
                id="vehicle1"
                checked={form?.is_address_same}
              />
              <label htmlFor="vehicle1">
                Share password on registered email
              </label>
              <br />
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={"createBtnreset"}
              
            >
              Reset 
            </ButtonBase>
          </div>
        </div>

        {/*</DialogActions>*/}
        <div className={styles.tableCont}></div>
      </Dialog>
    </div>
  );
};

export default ResetPasswordDialog;
