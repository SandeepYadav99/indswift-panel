import styles from "./Style.module.css";
import { Close } from "@material-ui/icons";
import { ButtonBase, Dialog, MenuItem, Slide } from "@material-ui/core";
import React from "react";
import historyUtils from "../../../../libs/history.utils";
import RouteName from "../../../../routes/Route.name";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AcceptanceDialog = ({ isOpen, handleDialog }) => {
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
          <h1 className={styles.headingText}>Acceptance Confirmation</h1>
          <div className={styles.newLine} />
        </div>
        <div>
          <p style={{ fontSize: ".87rem" }}>
            Are you sure you want to accept this offer letter?
          </p>
        </div>
        <div className={styles.confirmedWrapper}>
          <ButtonBase
            className={styles.createBtn}
            onClick={() => {
              historyUtils.push(RouteName.OFFER_SUCCESS);
            }}
          >
            ACCEPT
          </ButtonBase>
        </div>
      </div>
    </Dialog>
  );
};

export default AcceptanceDialog;
