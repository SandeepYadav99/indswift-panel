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
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import CustomDatePicker from "../../../../../components/FormFields/DatePicker/CustomDatePicker";
import useChangeDialogHook from "./ChangeDialog.hook";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";

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

const ChangeDialog = ({ isOpen, handleToggle, empId }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    declaration,
    setDeclaration,
  } = useChangeDialogHook({ isOpen, handleToggle, empId });

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
          <div className={styles.headingWrapper}>
            <div className={styles.heading}>Confirm Action</div>
            <div className={styles.newLine}></div>
            <div className={styles.des}>
              Do you approve the documents and the reimbursement amount.
            </div>
          </div>
          {/*</DialogTitle>*/}
          <div className={styles.fieldWrapper}>
            <div>
              <CustomTextField
                isError={errorData?.claim_value}
                errorText={errorData?.claim_value}
                label={"Claimed Value"}
                value={form?.name}
                onTextChange={(text) => {
                  changeTextData(text, "claim_value");
                }}
                onBlur={() => {
                  onBlurHandler("claim_value");
                }}
              />
            </div>
          </div>

          <div className={styles.fieldWrapper}>
            <div>
              <CustomTextField
                isError={errorData?.approved_value}
                errorText={errorData?.approved_value}
                label={"Approved Value"}
                value={form?.name}
                onTextChange={(text) => {
                  changeTextData(text, "approved_value");
                }}
                onBlur={() => {
                  onBlurHandler("approved_value");
                }}
              />
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <div>
              <CustomTextField
                isError={errorData?.note}
                errorText={errorData?.note}
                label={"Add comments (Optional)"}
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
          <div className={styles.cleckboxWrapper}>
            <div className={styles.checkBox}>
              <input
                checked={declaration}
                type="checkbox"
                id="confirmation"
                name="confirmation"
                onChange={() => {
                  setDeclaration((s) => !s);
                }}
              />
              <label htmlFor="confirmation">
                I approve of the information and action.
              </label>
              <br />
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase
              onClick={handleSubmit}
              disabled={!declaration ? true : false}
              className={
                declaration ? styles.createBtn : styles.disabledCreatebtn
              }
            >
              CONFIRM
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ChangeDialog;
