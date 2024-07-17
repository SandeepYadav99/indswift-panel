import styles from "./../Style.module.css";
import { Close } from "@material-ui/icons";
import { ButtonBase, Dialog, Slide } from "@material-ui/core";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComponent = ({
  isOpen,
  handleClose,
  handleConfirm,
}) => {
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

        <div className={styles.titlewrap}>
          <span className={styles.headingText}>
            Pass current employee authorities to replacing person
          </span>
          <div className={styles.newLine}></div>
        </div>
        <div>
          <p className={styles.desc}>
            Do you want the replacing person to take over the assigned roles and
            position of reviewer/HOD/Overall HOD/ Site Head for the locations?
          </p>
        </div>
        <p className={styles.desc1}>
          *This step is non reversible and the access would be updated
          accordingly.
        </p>
        <div className={styles.confirmedWrapper}>
          <div className={styles.editBtn2}>
            <ButtonBase className={styles.edit}
            onClick={()=>handleConfirm("NO")}
             >
              NO
            </ButtonBase>
          </div>
          <ButtonBase className={styles.createBtn}
          onClick={()=>handleConfirm("YES")}
          >YES</ButtonBase>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogComponent;
