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

const AcceptDialog = ({
  isOpen,
  handleToggle,
  handleSubmit,
  isSubmitting,
}) => {
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
              <br/>
              Are you sure you want to approve this employee record creation?
              <br/>
              <br/>

            </div>
          </div>

          <div className={styles.printFlex}>
            <ButtonBase
              onClick={()=>handleSubmit()}
              disabled={isSubmitting}
              className={"createBtnreset"}
            >
              {isSubmitting ? (
                <CircularProgress color="success" size="20px" />
              ) : (
                "APPROVE"
              )}
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AcceptDialog;
