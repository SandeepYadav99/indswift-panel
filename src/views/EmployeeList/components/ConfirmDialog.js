import styles from "./../Style.module.css";
import { Close } from "@material-ui/icons";
import { ButtonBase, Dialog, Slide } from "@material-ui/core";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComponent = ({ isOpen, handleClose, handleConfirm }) => {
  return (
    <Dialog
      keepMounted
      TransitionComponent={Transition}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // classes={{paper: classes.dialog}}
    >
      <div className={styles.InterviewPopUpWrapper}>
        <div className={styles.closeWrap}>
          <Close style={{ cursor: "pointer" }} onClick={handleClose}></Close>
        </div>

        <div className={styles.confirmWrap}>
          <span className={styles.headingText}>Approval Confirmation</span>
          <div className={styles.newLine} />
        </div>
        <div>
          <p>
            Are you sure you want to send this employee record for approval?
          </p>
        </div>
        <div onClick={handleConfirm} className={styles.confirmedWrapper}>
          <ButtonBase className={styles.createBtn}>CONFIRM</ButtonBase>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogComponent;
