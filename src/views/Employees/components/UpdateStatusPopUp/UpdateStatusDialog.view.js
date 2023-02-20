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
                isError={errorData?.status}
                errorText={errorData?.status}
                label={"Status"}
                value={form?.status}
                handleChange={(value) => {
                  changeTextData(value, "status");
                }}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>


                {/* {listData?.LOCATION_DEPARTMENTS?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.name}
                  </MenuItem>
                );
              })} */}
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
                  changeTextData(date, "last_working");
                }}
                value={form?.last_working}
                isError={errorData?.last_working}
              />
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <div>
              <CustomTextField
                isError={errorData?.optional_notes}
                errorText={errorData?.optional_notes}
                label={"Notes (if any)"}
                value={form?.optional_notes}
                onTextChange={(text) => {
                  changeTextData(text, "optional_notes");
                }}
                onBlur={() => {
                  onBlurHandler("optional_notes");
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
                  changeTextData(!form?.notify_team, "notify_team");
                }}
                id="notifyTeam"
                checked={form?.notify_team}
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
