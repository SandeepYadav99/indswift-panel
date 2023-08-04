import styles from "./Style.module.css";
import { Close } from "@material-ui/icons";
import { ButtonBase, Dialog, MenuItem, Slide } from "@material-ui/core";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AcceptanceLoanDialog = ({
  isOpen,
  handleDialog,
  isSubmitting,
  handleConfirm,
  type
}) => {
  return (
    <Dialog
      maxWidth={"xs"}
      keepMounted
      TransitionComponent={Transition}
      open={isOpen}
      onClose={handleDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className={styles.InterviewPopUpWrapper}>
        <div className={styles.closeWrap}>
          <Close style={{ cursor: "pointer" }} onClick={handleDialog}></Close>
        </div>

        <div className={styles.loginSignupText}>
          <h1 className={styles.headingText}>Acceptance Confirmation</h1>
          <div className={styles.newLine} />
        </div>
        <div>
          <p style={{ fontSize: ".87rem" }}>
            Are you sure you want to {`${type}`} the loan declaration ?
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
        </div>
      </div>
    </Dialog>
  );
};

export default AcceptanceLoanDialog;
