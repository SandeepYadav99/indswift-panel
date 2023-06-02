import styles from "./Style.module.css";
import { Close } from "@material-ui/icons";
import { ButtonBase, Dialog, MenuItem, Slide } from "@material-ui/core";
import React from "react";
import historyUtils from "../../../../../libs/history.utils";
import RouteName from "../../../../../routes/Route.name";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FreezeDialog = ({ isOpen, handleDialog, isSubmitting, handleConfirm }) => {
  return (
    <Dialog
      // fullWidth={true}
      maxWidth={"xs"}
      keepMounted
      TransitionComponent={Transition}
      open={isOpen}
      onClose={handleDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // classes={{paper: classes.dialog}}
    >
      <div className={styles.InterviewPopUpWrapper}>
        <div className={styles.closeWrap}>
          <Close style={{ cursor: "pointer" }} onClick={handleDialog}></Close>
        </div>

        <div className={styles.loginSignupText}>
          <h1 className={styles.headingText}> Confirmation</h1>
          <div className={styles.newLine} />
        </div>
        <div>
          <p style={{ fontSize: ".87rem" }}>
            Are you sure you want to accept?
          </p>
        </div>
        <div className={styles.confirmedWrapper}>
          <ButtonBase
              disabled={isSubmitting}
            className={styles.createBtn}
            onClick={handleConfirm}
          >
            ACCEPT
          </ButtonBase>
          <ButtonBase
              disabled={isSubmitting}
            className={styles.createBtn}
            onClick={handleDialog}
          >
            Done
          </ButtonBase>
        </div>
      </div>
    </Dialog>
  );
};

export default FreezeDialog;
