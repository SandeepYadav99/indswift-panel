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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreateLeave } from "../../../actions/LeaveModule.action";
import useClaimIntCard from "../../../views/ClaimsManagement/ClaimsDetail/components/ClaimIntCard/ClaimIntCard.hook";
import LogUtils from "../../../libs/LogUtils";

const LeaveApplicationForm = () => {
  const dispatch = useDispatch();
  const { state } = useSelector((state) => state);
  const { employeeDetails } = useClaimIntCard({});

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
  } = useLeaveApplication({});

  return (
    <div className={styles.container}>
      <div>
        <span className={styles.title}>Leave Applications</span>
        <div className={styles.newLine} />
      </div>
      <Paper elevation={2} className={styles.profileDetail}>
        <span>
          <b>Employee Information</b>
        </span>
        <br />
        <div className={styles.about}>
          <div className={styles.imageBlock}>
            <img src={CircularPng} alt="profile" className={styles.image} />
            <div className={styles.name}>
              <span className={styles.formData}>
                <b>Name</b>:<span>{employeeDetails?.name}</span>
              </span>
              <span className={styles.formData}>
                <b>Employee ID</b>:{employeeDetails?.emp_code}
              </span>
              <span className={styles.formData}>
                <b>Location</b>:<span>{employeeDetails?.location?.name}</span>
              </span>
            </div>
          </div>
          <div className={styles.otherInfo}>
            {" "}
            <span className={styles.formData}>
              <b>Designation</b>:
              <span>{employeeDetails?.designation?.name}</span>
            </span>
            <span className={styles.formData}>
              <b>Grade/Level</b>:<span>{employeeDetails?.grade?.code}</span>
            </span>
            <span className={styles.formData}>
              <b>Department</b>:<span>{employeeDetails?.department?.name}</span>
            </span>
          </div>
        </div>
      </Paper>
      <Paper elevation={2} className={styles.formContainer}>
        <span>
          <b>Leave Details</b>
        </span>
        <div className={styles.leaveForm}>
          <span className={styles.leaveTitle}>
            <b>Type of Leave</b>
          </span>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              aria-label="option"
              name="type"
              value={form?.type}
              onChange={(e) => changeTextData(e.target.value, "type")}
              row
              className={styles.radioButtonContainer}
            >
              <FormControlLabel
                value="OCCASION_LEAVE"
                control={<Radio />}
                label="Occasion Leave"
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
              />
              <FormControlLabel
                value="PATERNITY_LEAVE"
                control={<Radio />}
                label="Paternity Leave"
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
                  <MenuItem value="MARRIAGE_ANNIVERSARY">
                    MARRIAGE ANNIVERSARY
                  </MenuItem>
                </CustomSelectField>
                <div className={styles.leaveText}>
                  <p>
                    <b>Birthday</b>:{employeeDetails?.dob}
                  </p>
                </div>
                <div className={styles.leaveText}>
                  <p>
                    <b>Pending Leaves</b>:
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
                link={""}
                error={""}
                value={""}
                placeholder={`Add Attachments (optional)`}
                onChange={() => {
                  console.log("hello");
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
                    <b>No of Days</b>:
                  </p>
                </div>
                <div className={styles.leaveText}>
                  <p>
                    <b>Pending Leaves</b>:
                  </p>
                </div>
              </div>
              <File
                max_size={10 * 1024 * 1024}
                type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                fullWidth={true}
                name="document"
                label="Upload document"
                accept={"application/pdf,application/msword,image/*"}
                // link={data?.document ? data?.document : null}
                error={errorData?.document}
                value={form?.document}
                placeholder={"Upload document"}
                onChange={(file) => {
                  if (file) {
                    LogUtils.log("file", file);
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
                    <b>No of Days</b>:
                  </p>
                </div>
                <div className={styles.leaveText}>
                  <p>
                    <b>Pending Leaves</b>:
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
                link={""}
                error={""}
                value={""}
                placeholder={`Add Attachments (optional)`}
                onChange={() => {
                  console.log("hello");
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
                  <MenuItem value="FIRST_CHILD">First Child</MenuItem>
                  <MenuItem value="SECOND_CHILD">Second Child</MenuItem>
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
                    <b>No of Days</b>:
                  </p>
                </div>
                <div className={styles.leaveText}>
                  <p>
                    <b>Pending Leaves</b>:
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
                link={""}
                error={""}
                value={""}
                placeholder={`Add Attachments (optional)`}
                onChange={() => {
                  console.log("hello");
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
      </Paper>
      <div className={styles.btnContainer}>
        <ButtonBase className={"createBtn"} onClick={handleSubmit}>
          SUBMIT
        </ButtonBase>
      </div>
    </div>
  );
};

export default LeaveApplicationForm;
