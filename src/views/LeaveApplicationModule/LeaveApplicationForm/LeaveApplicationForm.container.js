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
import TextField from "@material-ui/core/TextField";

const LeaveApplicationForm = () => {
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
              <span>
                <b>Name</b>:
              </span>
              <span>
                <b>Employee ID</b>:
              </span>
              <span>
                <b>Location</b>:
              </span>
            </div>
          </div>
          <div className={styles.otherInfo}>
            {" "}
            <span>
              <b>Designation</b>:
            </span>
            <span>
              <b>Grade/Level</b>:
            </span>
            <span>
              <b>Department</b>:
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
                value="Occasion Leave"
                control={<Radio />}
                label="Occasion Leave"
              />
              <FormControlLabel
                value="Bereavement Leave"
                control={<Radio />}
                label="Bereavement Leave"
              />
              <FormControlLabel
                value="Facilitation Leave"
                control={<Radio />}
                label="Facilitation Leave"
              />
              <FormControlLabel
                value="Paternity Leave"
                control={<Radio />}
                label="Paternity Leave"
              />
            </RadioGroup>
          </FormControl>
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
        </div>
      </Paper>
      <div className={styles.btnContainer}>
        <ButtonBase className={"createBtn"}>SUBMIT</ButtonBase>
      </div>
    </div>
  );
};

export default LeaveApplicationForm;
