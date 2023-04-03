import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  ButtonBase,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@material-ui/core";
import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import useVacanciesDialogHook from "./VacanciesDialog.hook";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import SearchIcon from "@material-ui/icons/Search";
import CustomAutoComplete from "../../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";

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

const VacanciesDialog = ({ isOpen, handleToggle, empId, handleVerify, jobId, handleSubmit: handleSubmitProp }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    removeError,
    isSubmitting,
    employees,
  } = useVacanciesDialogHook({ isOpen, handleToggle, jobId, handleSubmitProp });

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
          <div className={styles.requiredWrapper}>
            <div className={styles.upperFlex}>Add Vacancy</div>
            <div className={styles.newLine} />
            <span style={{ marginTop: "10px", fontSize: ".785rem" }}>
              Please fill the below details to add vacancy
            </span>
          </div>
          {/*</DialogTitle>*/}
          <div className={styles.fieldWrapper}>
            <div>
            <CustomAutoComplete
              autoCompleteProps={{
                freeSolo: false,
                getOptionLabel: (option) => option.label,
              }}
              dataset={employees}
              datasetKey={"label"}
              onTextChange={(text, value) => {
                changeTextData(text, "employee_id");
              }}
              variant={"outlined"}
              label={"Replacing Person (Employee ID)"}
              name={"employee_id"}
              isError={errorData?.employee_id}
              value={form?.employee_id}
            />
            </div>
            <div>
            <CustomSelectField
                isError={errorData?.reason}
                errorText={errorData?.reason}
                label={"Reason"}
                value={form?.reason}
                handleChange={(value) => {
                  changeTextData(value, "reason");
                }}
              >
                {[
                  "ACTIVE",
                  "RESIGNED",
                  "TERMINATED",
                  "RETIRED",
                  "EXPIRED",
                  "ABSCONDED",
                  "INACTIVE",
                ].map((val) => {
                  return (
                    <MenuItem value={val} key={'REASON'+val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </CustomSelectField>
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={"createBtnreset"}
            >
              ADD
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default VacanciesDialog;
