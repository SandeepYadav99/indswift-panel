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

const ChangeDialog = ({ isOpen, handleToggle, candidateId , claimAmount}) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    declaration,
    setDeclaration,
  } = useChangeDialogHook({ isOpen, handleToggle, candidateId });

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
                disabled={true}
               
                label={"Claimed Value"}
                value={claimAmount}
                 
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>

          <div className={styles.fieldWrapper}>
            <div>
              <CustomTextField
                type="number"
                isError={errorData?.approved_amount}
                errorText={errorData?.approved_amount}
                label={"Approved Value"}
                value={form?.name}
                onTextChange={(text) => {
                  changeTextData(text, "approved_amount");
                }}
                onBlur={() => {
                  onBlurHandler("approved_amount");
                }}
              />
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <div>
              <CustomTextField
                isError={errorData?.comment}
                errorText={errorData?.comment}
                label={"Add comments (Optional)"}
                value={form?.comment}
                onTextChange={(text) => {
                  changeTextData(text, "comment");
                }}
                onBlur={() => {
                  onBlurHandler("comment");
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
              I have verified and approve of the information and action on the
              claim request.
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
