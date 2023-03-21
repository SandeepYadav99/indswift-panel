import React from "react";
import { Button, ButtonBase, MenuItem } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import useReoccuringDialogHook from "./ReoccuringDialog.hook";
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

const ReoccuringDialog = ({ isOpen, handleToggle, empId }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    removeError,
    resData,
    isSubmitted,
    isSubmitting,
    isVerified,
    showPasswordCurrent,
    setShowPasswordCurrent,
  } = useReoccuringDialogHook({ isOpen, handleToggle, empId });

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
            <div className={styles.upperFlex}>PRC Details</div>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          {/*</DialogTitle>*/}
          <div className={styles.fieldWrapper}>
            <div>
              <CustomSelectField
                isError={errorData?.emp_status}
                errorText={errorData?.emp_status}
                label={"Select PRC"}
                value={form?.emp_status}
                handleChange={(value) => {
                  changeTextData(value, "emp_status");
                }}
              >
                {["ACTIVE", "RESIGNED"].map((val) => {
                  return (
                    <MenuItem value={val} key={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </CustomSelectField>
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <div>
              <CustomTextField label="Select Employee" />
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={"createBtnreset"}
            >
              Proceed
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ReoccuringDialog;
