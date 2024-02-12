import React, { useCallback, useMemo, useState } from "react";
import { ButtonBase } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import useRetireDialogHook from "./RetireDialog.hook";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";

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

const RetireDialog = ({ isOpen, handleToggle, candidateId }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    setDeclaration,
    declaration,
  } = useRetireDialogHook({ isOpen, handleToggle, candidateId });

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
            {/* <div className={styles.upperFlex}>Update Status</div> */}
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.headingWrapper}>
            <div className={styles.heading}>Retire Employee</div>
            <div className={styles.newLine}></div>
            <div className={styles.des}>
              Please specify the below details for retiring the employee.
            </div>
          </div>

          <div className={styles.fieldWrapper}>
            <div>
              <CustomDatePicker
                clearable
                label={"Retirement Date"}
                minDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "retiring_date");
                }}
                value={form?.retiring_date}
                isError={errorData?.retiring_date}
              />
            </div>
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
                I have verified the information .
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

export default RetireDialog;
