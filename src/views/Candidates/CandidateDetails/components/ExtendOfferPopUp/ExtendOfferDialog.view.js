import React from "react";
import {
  Button,
  ButtonBase,
  MenuItem,
} from "@material-ui/core";
import { Close, } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import useExtendOfferDialogHook from "./ExtendOfferDialog.hook";

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

const ExtendOfferDialog = ({ isOpen, handleToggle, candidateId }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    isSubmitting,
    IsReoccuring,
      jobs,
      employeeList
  } = useExtendOfferDialogHook({ isOpen, handleToggle, candidateId });
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
                isError={errorData?.job_id}
                errorText={errorData?.job_id}
                label={"Select PRC"}
                value={form?.job_id}
                handleChange={(value) => {
                  changeTextData(value, "job_id");
                }}
              >
                {jobs?.map((val) => {
                  return (
                    <MenuItem value={val?.job_openings?.id} key={val?._id}>
                      {val?.job_openings?.code}
                    </MenuItem>
                  );
                })}
              </CustomSelectField>
            </div>
          </div>
          { IsReoccuring && <div className={styles.fieldWrapper}>
            <div>
              <CustomSelectField
                isError={errorData?.employee_id}
                errorText={errorData?.employee_id}
                label={"Select Employees"}
                value={form?.employee_id}
                handleChange={(value) => {
                  changeTextData(value, "employee_id");
                }}
              >
                {employeeList?.map((val) => {
                  return (
                    <MenuItem value={val?.employee?.id} key={val?._id}>
                      {val?.employee?.name}
                    </MenuItem>
                  );
                })}
              </CustomSelectField>
            </div>
          </div>}
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

export default ExtendOfferDialog;
