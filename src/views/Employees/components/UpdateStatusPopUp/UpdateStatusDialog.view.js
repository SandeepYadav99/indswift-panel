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
import useUpdateStatusDialogHook from "./UpdateStatusDialog.hook";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
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

const UpdateStatusDialog = ({ isOpen, handleToggle, empId }) => {
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
  } = useUpdateStatusDialogHook({ isOpen, handleToggle, empId });

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
            <div className={styles.upperFlex}>Update Status</div>
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
              <CustomSelectField
                isError={errorData?.emp_status}
                errorText={errorData?.emp_status}
                label={"Status"}
                value={form?.emp_status}
                handleChange={(value) => {
                  changeTextData(value, "emp_status");
                }}
              >
                {['ACTIVE', 'RESIGNED', 'TERMINATED', 'RETIRED', 'EXPIRED', 'ABSCONDED', 'INACTIVE',].map((val) => {
                  return (<MenuItem value={val} key={val}>{val}</MenuItem>);
                })}
              </CustomSelectField>
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <div>
              <CustomDatePicker
                clearable
                label={"Effective Date"}
                // maxDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "effective_date");
                }}
                value={form?.effective_date}
                isError={errorData?.effective_date}
              />
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <div>
              <CustomDatePicker
                clearable
                label={"Last Working Day"}
                minDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "last_working_date");
                }}
                value={form?.last_working_date}
                isError={errorData?.last_working_date}
              />
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <div>
              <CustomTextField
                isError={errorData?.note}
                errorText={errorData?.note}
                label={"Notes (if any)"}
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
            <div className={styles.checkBox}>
              <input
                type="checkbox"
                name={"notifyTeam"}
                value={"notifyTeam"}
                onClick={() => {
                  changeTextData(!form?.is_notify_email, "is_notify_email");
                }}
                id="notifyTeam"
                checked={form?.is_notify_email}
              />
              <label htmlFor="notifyTeam">Notify team on email</label>
              <br />
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={"createBtnreset"}
            >
              Update
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default UpdateStatusDialog;
