import React, { useState } from "react";
import styles from "./Styled.module.css";
import { ButtonBase, MenuItem } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import { useSelector } from "react-redux";
import useClaimIntCard from "../../../views/ClaimsManagement/ClaimsDetail/components/ClaimIntCard/ClaimIntCard.hook";
import ClaimUpperCard from "../../ClaimsManagement/ClaimsDetail/components/ClaimUpperCard/ClaimUpperCard";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import usePendingApplication from "./PendingApplication.hook";

const PendingApplication = () => {
  const { employeeDetails } = useClaimIntCard({});
  let Designation = ["G1", "G2", "G3", "G4", "G5", "G6"];
  let gradeLevel = employeeDetails?.grade?.code;
  let Experience = employeeDetails?.experience?.total;
  let FacilitationCondition = [0.1, 0.2, 0.3];
  let ExperienceInCompany = employeeDetails?.experience?.current;

  function FacilitationGiven() {
    if (FacilitationCondition.includes(Experience)) {
      return false;
    } else {
      return true;
    }
  }

  function renderOccasion() {
    if (!Designation.includes(gradeLevel) || Experience < 1.0) {
      return true;
    } else {
      return false;
    }
  }

  function PaternityLeaveApply() {
    if (!Designation.includes(gradeLevel) || ExperienceInCompany < 1) {
      return true;
    } else {
      return false;
    }
  }

  const { count } = useSelector((state) => state.LeaveModule);

  const {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    isEdit,
    handleDelete,
    includeRef,
    handleReset,
    id,
    leaveType,
    setLeaveType,
    daysCount,
    leaveCount,
  } = usePendingApplication({});

  return (
    <div className={styles.container}>
      <div>
        <ButtonBase onClick={() => history.goBack()}>
          <ArrowBackIosIcon fontSize={"small"} />{" "}
          <span className={"capitalize"}>
            <b>Leave Detail</b>
          </span>
        </ButtonBase>
        <div className={styles.newLine} />
      </div>
      <br />
      <ClaimUpperCard data={employeeDetails} />
      <div className={styles.plainPaper}></div>
      <div className={styles.plainPaper}></div>
      <div className={styles.btnContainer}>
        <ButtonBase className={"createBtn"} onClick={handleSubmit}>
          SUBMIT
        </ButtonBase>
      </div>
    </div>
  );
};

export default PendingApplication;
