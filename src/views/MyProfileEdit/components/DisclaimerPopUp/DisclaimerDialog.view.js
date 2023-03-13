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
import useDisclaimerDialogHook from "./DisclaimerDialog.hook";

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

const DisclaimerDialog = ({ isOpen, handleToggle, empId ,handleSubmit}) => {
  const classes = useStyles();
  const {
    is_Checked,
    setIs_Checked,
    isSubmitting

  } = useDisclaimerDialogHook({ isOpen, handleToggle, empId });
console.log("handleSumit",handleSubmit)
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
            <div className={styles.loginSignupText}>
              <h1 className={styles.headingText}>Disclaimer</h1>
              <div className={styles.newLine} />
            </div>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          {/*</DialogTitle>*/}
          <div className={styles.fieldWrapper}>
            <div className={styles.textWrapper}>
              <span>
                It is very important to note that Personal Information of
                employee and their family members is a complete responsibility
                of employee. Employee holds complete right to amend the same as
                per situation with employee. Group entitlements of employees and
                his/her family (for example- Group Medi claim, Group term
                insurance or other related coverages) depend on fact that
                employee has accurately maintained/updated his/her personal data
                on SkyNet. Organization do not scrutinize or interfere with
                personal information of employees. Organization is free of any
                responsibility or liability, if any insurance claim of any
                employee gets rejected due to inaccurate/old/obsolete personal
                data maintained by employee on SkyNet.
              </span>
            </div>
            <div className={styles.checkBox} >
              <input
              className={styles.checkbox32}
                type="checkbox"
                name={"sharePassword"}
                value={"sharePassword"}
                onClick={() => {
                  setIs_Checked(!is_Checked);;
                }}
                id="vehicle1"
                checked={is_Checked}
              />
              <label htmlFor="vehicle1" className={styles.checkBoxDes}>
              I agree to the disclaimer
              </label>
              <br />
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase
              onClick={handleSubmit}
              disabled={!is_Checked}
              className={ !is_Checked ? styles.disabledBtn:"createBtnreset"}
            >
              I Agree
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DisclaimerDialog;
