import React, { useCallback, useMemo, useState } from "react";
import { Button, ButtonBase } from "@material-ui/core";
import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "../DisclaimerPopUp/Style.module.css";
import { makeStyles } from "@material-ui/styles";

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

const CompleteDialog = ({ isOpen, handleToggle, isPending }) => {
  const classes = useStyles();
  console.log("isPending", isPending);
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
            <div className={styles.loginSignupText}>
              <h1 className={styles.heading21}>
                {!isPending
                  ? "Request being placed"
                  : "Request placed successfully"}
              </h1>
              <div className={styles.newLine} />
            </div>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          {/*</DialogTitle>*/}
          <div className={styles.fieldWrapper21}>
            <span style={{ textAlign: "center", fontSize: ".9rem" }}>
              {!isPending
                ? "Please wait your request is being placed for approval."
                : "Your request has been placed for approval. Once approved the changes would be reflected in your profile."}
            </span>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CompleteDialog;
