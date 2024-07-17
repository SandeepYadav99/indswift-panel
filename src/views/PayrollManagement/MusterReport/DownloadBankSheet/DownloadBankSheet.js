import React from "react";
import { ButtonBase, MenuItem } from "@material-ui/core";

import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";

import useDownloadBankSheetHook from "./DownloadBankSheetHook";
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

const DownloadBankSheet = ({ isOpen, handleToggle, empId, data }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    removeError,
    isSubmitting,
    listData,
  } = useDownloadBankSheetHook({ isOpen, handleToggle, empId, data });

  const getMaxDate = () => {
    const now = new Date();
    if (form.date) {
      const selectedDate = new Date(form.date);
      if (
        selectedDate.getMonth() === now.getMonth() &&
        selectedDate.getFullYear() === now.getFullYear()
      ) {
        return now;
      }
    }
    return null;
  };

  const getStartOfMonth = (date) => {
    const d = new Date(date);
    d.setDate(1);
    return d;
  };

  const getEndOfMonth = (date) => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + 1);
    d.setDate(0);
    return d;
  };

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
            <div className={styles.upperFlex}>Download Bank Transfer Sheet</div>
            <div className={styles.newLine}></div>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          {/*</DialogTitle>*/}
          <div className={styles.fieldWrapper}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomDatePicker
                  clearable
                  label={"Select Year"}
                  maxDate={new Date()}
                  onChange={(date) => {
                    changeTextData(date, "date");
                  }}
                  format={"yyyy"}
                  value={form?.date}
                  isError={errorData?.date}
                />
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomDatePicker
                  clearable
                  label={"Select Month"}
                  minDate={form?.date}
                  onChange={(date) => {
                    changeTextData(date, "startDate");
                  }}
                  format={"MM"}
                  value={form?.startDate}
                  isError={errorData?.startDate}
                />
              </div>
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase onClick={handleSubmit} className={"createBtn"}>
              Download
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DownloadBankSheet;
