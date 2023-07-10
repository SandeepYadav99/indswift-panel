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

const ConfirmationDialog = ({
  isOpen,
  handleToggle,
  empId,
  form,
  errorData,
  changeTextData,
  onBlurHandler,
  handleSubmit

}) => {
  const classes = useStyles();
 

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
          <div className={styles.headerWrap}>
            <div className={styles.upperFlex21}>Salary Update Confirmation</div>
            <div className={styles.newLine}></div>
            <div className={styles.upperFlex2}>
              Please fill the below details to confirm updates in Salary
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <div>
              <CustomDatePicker
                clearable
                label={"Effective From"}
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
              <CustomTextField
                isError={errorData?.salary_notes}
                errorText={errorData?.salary_notes}
                label={"Notes (if any)"}
                value={form?.salary_notes}
                onTextChange={(text) => {
                  changeTextData(text, "salary_notes");
                }}
                onBlur={() => {
                  onBlurHandler("salary_notes");
                }}
                multiline
                rows={3}
              />
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase
              onClick={handleSubmit}
              // disabled={isSubmitting}
              className={"createBtnreset"}
            >
              Submit
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialog;
