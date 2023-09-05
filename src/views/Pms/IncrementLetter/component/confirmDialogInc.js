import styles from "../Style.module.css";
import { Close } from "@material-ui/icons";
import { ButtonBase, Dialog, Slide } from "@material-ui/core";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogIncComponent = ({ isOpen, handleClose, handleConfirm }) => {
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

        <div className={styles.loginSignupText}>
          <span className={styles.headingText}>Increment Letter Confirmation</span>
          <div className={styles.newLine} />
        </div>
        <div style={{textAlign:'center'}}>
          <p>Release of Increment Letter might affect the salary structure, designation & grade of the respective employees.</p>
        </div>
        <div onClick={handleConfirm} className={styles.confirmedWrapper}>
          <ButtonBase className={styles.createBtn}>CONFIRMED</ButtonBase>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogIncComponent;
