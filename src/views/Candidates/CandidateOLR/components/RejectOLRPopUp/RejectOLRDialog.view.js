import React, { useCallback, useMemo, useState } from "react";
import { ButtonBase } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import useRejectOLRDialogHook from "./RejectOLRDialog.hook";

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

const RejectOLRDialog = ({ isOpen, handleToggle, empId }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    removeError,
    isSubmitting,
  } = useRejectOLRDialogHook({ isOpen, handleToggle, empId });

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
            <div className={styles.upperFlex}>Reject OLR Sheet</div>
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
                  changeTextData(
                    !form?.is_incorrect_info,
                    "is_incorrect_info"
                  );
                }}
                id="incorrect"
                checked={form?.is_incorrect_info}
              />
              <label htmlFor="incorrect">Incorrect Candidate Information</label>
              <br />
            </div>
            <div className={styles.checkBox}>
              <input
                type="checkbox"
                name={"notifyTeam"}
                value={"notifyTeam"}
                onClick={() => {
                  changeTextData(!form?.is_joining, "is_joining");
                }}
                id="joining"
                checked={form?.is_joining}
              />
              <label htmlFor="joining">Need changes in joining details</label>
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
                  changeTextData(!form?.is_layout, "is_layout");
                }}
                id="layout"
                checked={form?.is_layout}
              />
              <label htmlFor="layout">Layout is not correct</label>
              <br />
            </div>
            <div className={styles.checkBox}>
              <input
                type="checkbox"
                name={"notifyTeam"}
                value={"notifyTeam"}
                onClick={() => {
                  changeTextData(
                    !form?.is_underqualified,
                    "is_underqualified"
                  );
                }}
                id="underQualified"
                checked={form?.is_underqualified}
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

export default RejectOLRDialog;
