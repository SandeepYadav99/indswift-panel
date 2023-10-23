import React, { useState } from "react";
import styles from "./Style.module.css";
import { Paper, ButtonBase } from "@material-ui/core";
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
import { useDispatch,useSelector } from "react-redux";
import { actionCreateLeave } from "../../../actions/LeaveModule.action";
import useClaimIntCard from '../../../views/ClaimsManagement/ClaimsDetail/components/ClaimIntCard/ClaimIntCard.hook';

const LeaveApplicationForm = () => {
  const dispatch = useDispatch();
  const { state} = useSelector((state)=>state)
  const {
    employeeDetails,
  } = useClaimIntCard({});

  const { leaveType, setLeaveType } = useLeaveApplication({});

  console.log(state,"state");
  console.log(employeeDetails,"employeeDetails is here")

  const data = {
    type: "OCCASION_LEAVE",
    duration: "FULL_DAY",
    duration_days: "1",
    event_type: "BIRTHDAY",
    start_date: `2023-10-15T16:41:00.000Z`,
    end_date: `2023-10-19T16:41:00.000Z`,
    purpose: "official work",
    document:"document",
    comment: "Test comment",
    deceased_relationship:"",
    reason: "test",
    child: "FIRST_BABY"
  };



  useEffect(() => {
    dispatch(actionCreateLeave(data));
  }, []);

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
              <b>Designation</b>:<span>{employeeDetails?.designation?.name}</span>
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
              defaultValue=""
              name="radio-buttons-group"
              className={styles.radioButtonContainer}
            >
              <FormControlLabel
                value="OCCASION_LEAVE"
                control={<Radio />}
                label="Occasion Leave"
                onClick={() => setLeaveType("OCCASION_LEAVE")}
              />
              <FormControlLabel
                value="BEREAVEMENT_LEAVE"
                control={<Radio />}
                label="Bereavement Leave"
                onClick={() => setLeaveType("BEREAVEMENT_LEAVE")}
              />
              <FormControlLabel
                value="FACILITATION_LEAVE"
                control={<Radio />}
                label="Facilitation Leave"
                onClick={() => setLeaveType("FACILITATION_LEAVE")}
              />
              <FormControlLabel
                value="PATERNITY_LEAVE"
                control={<Radio />}
                label="Paternity Leave"
                onClick={() => setLeaveType("PATERNITY_LEAVE")}
              />
            </RadioGroup>
          </FormControl>
          {leaveType === "OCCASION_LEAVE" && (
            <div className={styles.inputContainer}>
              <div className={styles.firstBlock}>
                <CustomSelectField
                  label={"Choose Leave"}
                  value={""}
                  handleChange={() => console.log("Hello")}
                >
                  <p>Hello</p>
                  <p>Hey</p>
                </CustomSelectField>
                <CustomSelectField
                  label={"Select Event"}
                  value={""}
                  handleChange={() => console.log("Hello")}
                >
                  <p>Hello</p>
                  <p>Hey</p>
                </CustomSelectField>
                <div className={styles.leaveText}>
                  <p>
                    <b>Birthday</b>:
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
              <CustomTextField label={"Comment"} rows={4} columns={3} />
            </div>
          )}
          {leaveType === "BEREAVEMENT_LEAVE" && (
            <div className={styles.inputContainer}>
              <CustomTextField
                label={
                  leaveType === "BEREAVEMENT_LEAVE"
                    ? "Relationship with Deceased"
                    : "Reason for Leave"
                }
                rows={2}
              />
              <div className={styles.firstBlock}>
                <CustomDatePicker
                  disabled={false}
                  clearable
                  label={"Leave From"}
                  onChange={(e) => console.log("Hello World")}
                />
                <CustomDatePicker
                  disabled={false}
                  clearable
                  label={"Leave To"}
                  onChange={(e) => console.log("Hello World")}
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
              <CustomTextField label={"Comment"} rows={3} columns={3} />
            </div>
          )}
          {leaveType === "FACILITATION_LEAVE" && (
            <div className={styles.inputContainer}>
              <CustomTextField label={"Reason for Leave"} rows={2} />
              <div className={styles.firstBlock}>
                <CustomDatePicker
                  disabled={false}
                  clearable
                  label={"Leave From"}
                  onChange={(e) => console.log("Hello World")}
                />
                <CustomDatePicker
                  disabled={false}
                  clearable
                  label={"Leave To"}
                  onChange={(e) => console.log("Hello World")}
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
              <CustomTextField label={"Comment"} rows={4} columns={3} />
            </div>
          )}
          {leaveType === "PATERNITY_LEAVE" && (
            <div className={styles.inputContainer}>
              <div className={styles.parentalLeaveBlock}>
                <CustomSelectField
                  label={"Type of Event"}
                  value={""}
                  handleChange={() => console.log("Hello")}
                >
                  <p>Hello</p>
                  <p>Hey</p>
                </CustomSelectField>
                <CustomSelectField
                  label={"Select Child"}
                  value={""}
                  handleChange={() => console.log("Hello")}
                >
                  <p>Hello</p>
                  <p>Hey</p>
                </CustomSelectField>
              </div>
              <div className={styles.firstBlock}>
                <CustomSelectField
                  label={"Choose Leave"}
                  value={""}
                  handleChange={() => console.log("Hello")}
                >
                  <p>Hello</p>
                  <p>Hey</p>
                </CustomSelectField>
                <CustomSelectField
                  label={"Select Event"}
                  value={""}
                  handleChange={() => console.log("Hello")}
                >
                  <p>Hello</p>
                  <p>Hey</p>
                </CustomSelectField>
                <div className={styles.leaveText}>
                  <p>
                    <b>Birthday</b>:
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
              <CustomTextField label={"Comment"} rows={4} columns={3} />
            </div>
          )}
        </div>
      </Paper>
      <div className={styles.btnContainer}>
        <ButtonBase className={"createBtn"}>SUBMIT</ButtonBase>
      </div>
    </div>
  );
};

export default LeaveApplicationForm;
