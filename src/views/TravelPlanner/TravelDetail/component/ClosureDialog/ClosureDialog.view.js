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
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import useClosureDialogHook from "./ClosureDialog.hook";

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

const ClosureDialog = ({ isOpen, handleToggle, candidateId ,data}) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    isSubmitting,
  } = useClosureDialogHook({ isOpen, handleToggle, candidateId ,data});

  return (
    <div>
      <Dialog
        onBackdropClick={() => {}}
        keepMounted
        fullWidth={true}
        maxWidth={"md"}
        TransitionComponent={Transition}
        open={isOpen}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
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
            <div className={styles.heading}>Confirm Travel Confirmation</div>
            <div className={styles.newLine}></div>
            <div className={styles.des}>
              You will only be able to raise claims for the travel, when you
              have marked the travel as completed.
            </div>
          </div>
          <div className={styles.detailWrap}>
            <b>Travel Details</b>
            <div className={styles.infoWrap}>
              <div className={styles.infoData}>
                <b>TAP</b>
                <br />
                <span>{data?.code}</span>
              </div>
              <div className={styles.infoData}>
                <b>Type:</b>
                <br />
                <span>{data?.tour_type}</span>
              </div>
            </div>
            <div className={styles.infoWrap}>
              <div className={styles.infoData}>
                <b>Nature:</b>
                <br />
                <span>{data?.tour_nature}</span>
              </div>
              <div className={styles.infoData}>
                <b>Tavel Dates:</b>
                <br />
                <span>{data?.startDateText}- {data?.endDateText}</span>
              </div>
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <div>
              <CustomTextField
                isError={errorData?.achievement}
                errorText={errorData?.achievement}
                label={"Describe Achievement"}
                value={form?.achievement}
                onTextChange={(text) => {
                  changeTextData(text, "achievement");
                }}
                onBlur={() => {
                  onBlurHandler("achievement");
                }}
                multiline
                rows={3}
              />
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase
              disabled={isSubmitting ? true : false}
              onClick={handleSubmit}
              className={styles.createBtn}
            >
              CONFIRM
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ClosureDialog;
