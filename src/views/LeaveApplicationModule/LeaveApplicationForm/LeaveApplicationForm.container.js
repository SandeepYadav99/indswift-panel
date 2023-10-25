import React, { useState } from "react";
import styles from "./Style.module.css";
import { Paper, ButtonBase, MenuItem } from "@material-ui/core";
import CircularPng from "../../../assets/img/circulars illustration.png";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import File from "../../../components/FileComponent/FileComponent.component";
import useLeaveApplication from "./LeaveApplication.hook";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import { useSelector } from "react-redux";
import useClaimIntCard from "../../../views/ClaimsManagement/ClaimsDetail/components/ClaimIntCard/ClaimIntCard.hook";
import LogUtils from "../../../libs/LogUtils";
import ClaimUpperCard from "../../ClaimsManagement/ClaimsDetail/components/ClaimUpperCard/ClaimUpperCard";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";

const LeaveApplicationForm = () => {
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
  } = useLeaveApplication({});

  return (
    <div className={styles.container}>
      <div>
        <ButtonBase onClick={() => history.goBack()}>
          <ArrowBackIosIcon fontSize={"small"} />{" "}
          <span className={"capitalize"}>
            <b>Leave Application</b>
          </span>
        </ButtonBase>
        <div className={styles.newLine} />
      </div>
      <br />
      <ClaimUpperCard data={employeeDetails} />
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Employee Information</div>
        <div className={styles.leaveForm}>
          <div className={styles.heading}>Type of Leave</div>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              aria-label="option"
              name="type"
              value={form?.type}
              onChange={(e) => changeTextData(e.target.value, "type")}
              row
              className={styles.heading}
            >
              <FormControlLabel
                value="OCCASION_LEAVE"
                control={<Radio />}
                label="Occasion Leave"
                disabled={renderOccasion()}
              />
              <FormControlLabel
                value="BEREAVEMENT_LEAVE"
                control={<Radio />}
                label="Bereavement Leave"
              />
              <FormControlLabel
                value="FACILITATION_LEAVE"
                control={<Radio />}
                label="Facilitation Leave"
                disabled={FacilitationGiven()}
              />
              <FormControlLabel
                value="PATERNITY_LEAVE"
                control={<Radio />}
                label="Paternity Leave"
                disabled={PaternityLeaveApply()}
              />
            </RadioGroup>
          </FormControl>
          {form?.type === "OCCASION_LEAVE" && (
            <div className={styles.inputContainer}>
              <div className={styles.firstBlock}>
                <CustomSelectField
                  isError={errorData?.duration}
                  errorText={errorData?.duration}
                  label={"Choose Leave"}
                  value={form?.duration}
                  handleChange={(value) => {
                    changeTextData(value, "duration");
                  }}
                >
                  <MenuItem value="HALF_DAY">Half Day</MenuItem>
                  <MenuItem value="FULL_DAY">Full Day</MenuItem>
                </CustomSelectField>
                <CustomSelectField
                  isError={errorData?.event_type}
                  errorText={errorData?.event_type}
                  label={"Select Event"}
                  value={form?.event_type}
                  handleChange={(value) => {
                    changeTextData(value, "event_type");
                  }}
                >
                  <MenuItem value="BIRTHDAY">BIRTHDAY</MenuItem>
                  { employeeDetails?.family?.martial_status === "Married" &&
                    <MenuItem value="MARRIAGE_ANNIVERSARY">
                      MARRIAGE ANNIVERSARY
                    </MenuItem>
                  }
                </CustomSelectField>
                <div className={styles.leaveText}>
                  {form?.event_type === "MARRIAGE_ANNIVERSARY" ? (
                    <p>
                      <b>Anniversary</b>:{employeeDetails?.dom}
                    </p>
                  ) : (
                    <p>
                      <b>Birthday</b>:{employeeDetails?.dob}
                    </p>
                  )}
                </div>
                <div className={styles.leaveText}>
                  <p>
                    <b>Pending Leaves</b>:{count?.data?.pending_leave}
                  </p>
                </div>
              </div>
              <File
                max_size={10 * 1024 * 1024}
                type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                fullWidth={true}
                name="document"
                label="Document"
                accept={"application/pdf,application/msword,image/*"}
                // link={data?.slip ? data?.slip : null}
                error={errorData?.document}
                value={form?.document}
                placeholder={"Add Attachment (optional)"}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "document");
                  }
                }}
              />
              <CustomTextField
                isError={errorData?.comment}
                errorText={errorData?.comment}
                label={"Add comments "}
                value={form?.comment}
                onTextChange={(text) => {
                  changeTextData(text, "comment");
                }}
                onBlur={() => {
                  onBlurHandler("comment");
                }}
                multiline
                rows={3}
              />{" "}
            </div>
          )}
          {form?.type === "BEREAVEMENT_LEAVE" && (
            <div className={styles.inputContainer}>
              <CustomTextField
                isError={errorData?.deceased_relationship}
                errorText={errorData?.deceased_relationship}
                label={"Relation with Deceased"}
                value={form?.deceased_relationship}
                onTextChange={(text) => {
                  changeTextData(text, "deceased_relationship");
                }}
                onBlur={() => {
                  onBlurHandler("deceased_relationship");
                }}
                rows={1}
              />
              <div className={styles.firstBlock}>
                <CustomDatePicker
                  clearable
                  label={"Leave From"}
                  minDate={new Date()}
                  onChange={(date) => {
                    changeTextData(date, "start_date");
                  }}
                  value={form?.start_date}
                  isError={errorData?.start_date}
                />
                <CustomDatePicker
                  clearable
                  label={" Leave To"}
                  minDate={new Date()}
                  onChange={(date) => {
                    changeTextData(date, "end_date");
                  }}
                  value={form?.end_date}
                  isError={errorData?.end_date}
                />
                <div className={styles.leaveText}>
                  <p>
                    <b>No of Days</b>:{daysCount}
                  </p>
                </div>
                <div className={styles.leaveText}>
                  <p>
                    <b>Pending Leaves</b>:{count?.data?.pending_leave}
                  </p>
                </div>
              </div>
              <File
                max_size={10 * 1024 * 1024}
                type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                fullWidth={true}
                name="od1"
                label="Attachments"
                accept={"application/pdf,application/msword,image/*"}
                value={form?.document}
                placeholder={`Add Attachments (optional)`}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "document");
                  }
                }}
              />
              <CustomTextField
                isError={errorData?.comment}
                errorText={errorData?.comment}
                label={"Add comments "}
                value={form?.comment}
                onTextChange={(text) => {
                  changeTextData(text, "comment");
                }}
                onBlur={() => {
                  onBlurHandler("comment");
                }}
                multiline
                rows={3}
              />{" "}
            </div>
          )}
          {form?.type === "FACILITATION_LEAVE" && (
            <div className={styles.inputContainer}>
              <CustomTextField
                isError={errorData?.reason}
                errorText={errorData?.reason}
                label={"Reason for Leave"}
                value={form?.reason}
                onTextChange={(text) => {
                  changeTextData(text, "reason");
                }}
                onBlur={() => {
                  onBlurHandler("reason");
                }}
                rows={1}
              />{" "}
              <div className={styles.firstBlock}>
                <CustomDatePicker
                  clearable
                  label={"Leave From"}
                  minDate={new Date()}
                  onChange={(date) => {
                    changeTextData(date, "start_date");
                  }}
                  value={form?.start_date}
                  isError={errorData?.start_date}
                />
                <CustomDatePicker
                  clearable
                  label={" Leave To"}
                  minDate={new Date()}
                  onChange={(date) => {
                    changeTextData(date, "end_date");
                  }}
                  value={form?.end_date}
                  isError={errorData?.end_date}
                />
                <div className={styles.leaveText}>
                  <p>
                    <b>No of Days</b>:{daysCount}
                  </p>
                </div>
                <div className={styles.leaveText}>
                  <p>
                    <b>Pending Leaves</b>:{count?.data?.pending_leave}
                  </p>
                </div>
              </div>
              <File
                max_size={10 * 1024 * 1024}
                type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                fullWidth={true}
                name="od1"
                label="Attachments"
                accept={"application/pdf,application/msword,image/*"}
                value={form?.document}
                placeholder={`Add Attachments (optional)`}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "document");
                  }
                }}
              />
              <CustomTextField
                isError={errorData?.comment}
                errorText={errorData?.comment}
                label={"Add comments "}
                value={form?.comment}
                onTextChange={(text) => {
                  changeTextData(text, "comment");
                }}
                onBlur={() => {
                  onBlurHandler("comment");
                }}
                multiline
                rows={3}
              />{" "}
            </div>
          )}
          {form?.type === "PATERNITY_LEAVE" && (
            <div className={styles.inputContainer}>
              <div className={styles.parentalLeaveBlock}>
                <CustomSelectField
                  isError={errorData?.event_type}
                  errorText={errorData?.event_type}
                  label={"Type Of Event"}
                  value={form?.event_type}
                  handleChange={(value) => {
                    changeTextData(value, "event_type");
                  }}
                >
                  <MenuItem value="NORMAL_DELIVERY">Normal Delievery</MenuItem>
                  <MenuItem value="C_SECTION_DELIVERY">
                    C_Section_Delievery
                  </MenuItem>
                  <MenuItem value="MISCARRIAGE">Miscarriage</MenuItem>
                </CustomSelectField>
                <CustomSelectField
                  isError={errorData?.child}
                  errorText={errorData?.child}
                  label={"Select Child"}
                  value={form?.child}
                  handleChange={(value) => {
                    changeTextData(value, "child");
                  }}
                >
                  <MenuItem value="FIRST_BABY">First Child</MenuItem>
                  <MenuItem value="SECOND_BABY">Second Child</MenuItem>
                </CustomSelectField>
              </div>
              <div className={styles.firstBlock}>
                <CustomDatePicker
                  clearable
                  label={"Leave From"}
                  minDate={new Date()}
                  onChange={(date) => {
                    changeTextData(date, "start_date");
                  }}
                  value={form?.start_date}
                  isError={errorData?.start_date}
                />
                <CustomDatePicker
                  clearable
                  label={" Leave To"}
                  minDate={new Date()}
                  onChange={(date) => {
                    changeTextData(date, "end_date");
                  }}
                  value={form?.end_date}
                  isError={errorData?.end_date}
                />
                <div className={styles.leaveText}>
                  <p>
                    <b>No of Days</b>:{daysCount}
                  </p>
                </div>
                <div className={styles.leaveText}>
                  <p>
                    <b>Pending Leaves</b>:{count?.data?.pending_leave}
                  </p>
                </div>
              </div>
              <File
                max_size={10 * 1024 * 1024}
                type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                fullWidth={true}
                name="od1"
                label="Attachments"
                accept={"application/pdf,application/msword,image/*"}
                value={form?.document}
                placeholder={`Add Attachments (optional)`}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "document");
                  }
                }}
              />
              <CustomTextField
                isError={errorData?.comment}
                errorText={errorData?.comment}
                label={"Add comments "}
                value={form?.comment}
                onTextChange={(text) => {
                  changeTextData(text, "comment");
                }}
                onBlur={() => {
                  onBlurHandler("comment");
                }}
                multiline
                rows={3}
              />{" "}
            </div>
          )}
        </div>
      </div>
      <div className={styles.btnContainer}>
        <ButtonBase className={"createBtn"} onClick={handleSubmit}>
          SUBMIT
        </ButtonBase>
      </div>
    </div>
  );
};

export default LeaveApplicationForm;
