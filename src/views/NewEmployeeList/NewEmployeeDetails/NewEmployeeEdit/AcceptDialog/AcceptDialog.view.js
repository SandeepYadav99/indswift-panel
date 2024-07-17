import React from "react";
import { Button, ButtonBase, CircularProgress } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "../ConfirmationDialog/Style.module.css";
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

const AcceptDialog = ({ isOpen, handleToggle, handleSubmit, isSubmitting }) => {
  const classes = useStyles();

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
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.headerWrap}>
            <div className={styles.upperFlex21}>Approval Confirmation</div>
            <div className={styles.newLine}></div>
            <div className={styles.upperFlex2}>
              <br />
              Are you sure you want to approve the employee record creation, the
              new employee would be taking over the assigned roles and position
              of reviewer/HOD/Overall HOD/ Site Head for the locations?
              <br />
              <br /> *This step is non reversible and the access would be
              updated accordingly
              <br />
              <br />
            </div>
          </div>

          <div className={styles.printFlex21}>
          <ButtonBase
              onClick={() => handleSubmit("NO")}
              disabled={isSubmitting}
              className={styles.editGreen}
            >
              {isSubmitting ? (
                <CircularProgress color="success" size="20px" />
              ) : (
                "CREATE ONLY"
              )}
            </ButtonBase>
            <ButtonBase
              onClick={() => handleSubmit("YES")}
              disabled={isSubmitting}
              className={"createBtnreset"}
            >
              {isSubmitting ? (
                <CircularProgress color="success" size="20px" />
              ) : (
                "CREATE & APPROVE"
              )}
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AcceptDialog;
