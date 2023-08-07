import React from "react";
import { Button, ButtonBase } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import useRejectDialogHook from "./RejectDialog.hook";

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

const RejectDialog = ({ isOpen, handleToggle, candidateId }) => {
  const classes = useStyles();
  const { changeTextData, errorData, form, handleSubmit, onBlurHandler } =
    useRejectDialogHook({ isOpen, handleToggle, candidateId });

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
            {/* <div className={styles.upperFlex}>Update Status</div> */}
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.headingWrapper}>
            <div className={styles.heading}>Rejection Confirmation</div>
            <div className={styles.newLine}></div>
            <div className={styles.des}>
              Are you sure you want to reject this employee creation?
              <br />
              Describe the reason for the same
            </div>
          </div>

          <div className={styles.fieldWrapper}>
            <div>
              <CustomTextField
                isError={errorData?.comment}
                errorText={errorData?.comment}
                label={"Reason for Rejection"}
                value={form?.comment}
                onTextChange={(text) => {
                  changeTextData(text, "comment");
                }}
                onBlur={() => {
                  onBlurHandler("comment");
                }}
                multiline
                rows={3}
              />
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase onClick={handleSubmit} className={styles.createBtn}>
              Reject
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default RejectDialog;
