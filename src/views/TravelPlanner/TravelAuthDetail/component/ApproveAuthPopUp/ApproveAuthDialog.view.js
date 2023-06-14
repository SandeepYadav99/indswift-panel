import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  ButtonBase,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";

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

const ApproveAuthDialog = ({
  enableType,
  TypeEnabledStatus,
  exceptionRejected,
  isOpen,
  handleToggle,
  candidateId,
  form,
  changeTextData,
  onBlurHandler,
  handleSubmit,
  errorData,
  isSubmitting,
}) => {
  const [declaration, setDeclaration] = useState(false);
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
            {/* <div className={styles.upperFlex}>Update Status</div> */}
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.headingWrapper}>
            <div className={styles.heading}>Confirm Action</div>
            <div className={styles.newLine}></div>
            {/* <div className={styles.des}>
              Do you approve the documents and the reimbursement amount.
            </div> */}
          </div>
          <div className={styles.fieldWrapper}>
            <div>
              { enableType && !TypeEnabledStatus && !exceptionRejected && <div className={styles.radioWrap21}>
                Action on exception requested by the employee
              </div>}
              {
                enableType && !TypeEnabledStatus && !exceptionRejected &&  <RadioGroup
                aria-label="option"
                name="exception_approved"
                value={form?.exception_approved}
                onChange={(e) =>
                  changeTextData(e.target.value, "exception_approved")
                }
                row
              >
                <FormControlLabel
                  value="APPROVED"
                  control={<Radio />}
                  label="Approved"
                />
                <FormControlLabel
                  style={{ marginLeft: "20px" }}
                  value="REJECTED"
                  control={<Radio />}
                  label="Rejected"
                />
              </RadioGroup>
              }
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <div>
              <CustomTextField
                isError={errorData?.comment}
                errorText={errorData?.comment}
                label={"Add comments (Optional)"}
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
          <div className={styles.cleckboxWrapper}>
            <div className={styles.checkBox}>
              <input
                checked={declaration}
                type="checkbox"
                id="confirmation"
                name="confirmation"
                onChange={() => {
                  setDeclaration((s) => !s);
                }}
              />
              <label htmlFor="confirmation">
                I have verified and approve of the information and action on the
                claim request.
              </label>
              <br />
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase
              onClick={handleSubmit}
              disabled={!declaration || isSubmitting ? true : false}
              className={
                declaration && !isSubmitting
                  ? styles.createBtn
                  : styles.disabledCreatebtn
              }
            >
              {isSubmitting ? (
                <CircularProgress color="success" size="20px" />
              ) : (
                "CONFIRM"
              )}
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ApproveAuthDialog;
