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
import usePasswordDialogHook from "./PasswordDialog.hook";

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

const PasswordDialog = ({ isOpen, handleToggle, empId, handleVerify }) => {
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
  } = usePasswordDialogHook({ isOpen, handleToggle, empId, handleVerify });

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

            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.requiredWrapper}>
          <div className={styles.upperFlex}>Authorization Required</div>
          <div className={styles.newLine}/>
          <span style={{marginTop:"10px",fontSize:".785rem"}}>Enter password to authorize and submit the form</span>
          </div>
          {/*</DialogTitle>*/}
          <div className={styles.fieldWrapper}>
            <div>
              <CustomTextField
                type={showPasswordCurrent ? "text" : "password"}
                label={"Password"}
                    value={form?.password}
                    onTextChange={(text) => {
                      changeTextData(text, "password");
                    }}
                    isError={errorData?.password}
                    errorText={errorData?.password}
                    onBlur={() => {
                      onBlurHandler("password");
                    }}
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
              />
            </div>

          </div>
          <div className={styles.printFlex}>
            <ButtonBase
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={"createBtnreset"}

            >
              submit
            </ButtonBase>
          </div>
        </div>

      </Dialog>
    </div>
  );
};

export default PasswordDialog;
