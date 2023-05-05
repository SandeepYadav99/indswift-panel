import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  ButtonBase,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@material-ui/core";
import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import useUpdateStatusDialogHook from "./RejectDialog.hook";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import useRejectDialogHook from "./RejectDialog.hook";

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

const RejectDialog = ({ isOpen, handleToggle, empId ,dataValue}) => {
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
  } = useRejectDialogHook({ isOpen, handleToggle, empId ,dataValue});

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
            <div className={styles.upperFlex}>Reject Candidate</div>
            <div className={styles.newLine}></div>
            <span className={styles.desCard}>
              Please choose the reason behind your decission
            </span>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          {/*</DialogTitle>*/}
          <div className={styles.checkBoxWrapper}>
            <div className={styles.checkBox}>
              <input
                type="checkbox"
                name={"notifyTeam"}
                value={"notifyTeam"}
                onClick={() => {
                  changeTextData(!form?.is_less_experience, "is_less_experience");
                }}
                id="experience"
                checked={form?.is_less_experience}
              />
              <label htmlFor="experience">Doesn't have enough experience</label>
              <br />
            </div>
            <div className={styles.checkBox}>
              <input
                type="checkbox"
                name={"notifyTeam"}
                value={"notifyTeam"}
                onClick={() => {
                  changeTextData(!form?.is_less_behaviour, "is_less_behaviour");
                }}
                id="behaviour"
                checked={form?.is_less_behaviour}
              />
              <label htmlFor="behaviour">Behavioural Issues</label>
              <br />
            </div>
          </div>
          <div className={styles.checkBoxWrapper}>
            <div className={styles.checkBox}>
              <input
                type="checkbox"
                name={"notifyTeam"}
                value={"notifyTeam"}
                onClick={() => {
                  changeTextData(!form?.is_not_fit, "is_not_fit");
                }}
                id="notfit"
                checked={form?.is_not_fit}
              />
              <label htmlFor="notfit">Not fit for the role</label>
              <br />
            </div>
            <div className={styles.checkBox}>
              <input
                type="checkbox"
                name={"notifyTeam"}
                value={"notifyTeam"}
                onClick={() => {
                  changeTextData(!form?.is_under_qualified, "is_under_qualified");
                }}
                id="underQualified"
                checked={form?.is_under_qualified}
              />
              <label htmlFor="underQualified">Underqualified</label>
              <br />
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <div>
              <CustomTextField
                isError={errorData?.note}
                errorText={errorData?.note}
                label={"Additional Comments (optional)"}
                value={form?.note}
                onTextChange={(text) => {
                  changeTextData(text, "note");
                }}
                onBlur={() => {
                  onBlurHandler("note");
                }}
                multiline
                rows={3}
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

export default RejectDialog;
