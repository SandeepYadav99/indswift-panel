import {
  ButtonBase,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React from "react";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import useTravelCreate from "./TravelCreate.hook";
import DetailsIncludeForm from "./component/Detailsincludes/DetailsIncludes.component";
import OtherDetailsIncludeForm from "./component/OtherDetailsincludes/OtherDetailsIncludes.component";
import TravelUpperCard from "./component/TravelUpperCard/TravelUpperCard";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";

function TravelCreate() {
  const {
    form,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    editData,
    declaration,
    setDeclaration,
    employeeDetails,
    travelRef,
    otherRef,
    isBond,
    handleCheckboxChange,
  } = useTravelCreate({});

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>New Travel Request Form</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <TravelUpperCard data={employeeDetails} />
      <div className={styles.plainPaper}>
        <div className={styles.formSelectWrapper}>
          <span className={styles.heading}>
            <b>Travel Planner</b>
          </span>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomDatePicker
                clearable
                label={"Tour Start Date"}
                // maxDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "start_date");
                }}
                value={form?.start_date}
                isError={errorData?.start_date}
              />
            </div>
            <div className={"formGroup"}>
              <CustomDatePicker
                clearable
                label={"Tour End Date"}
                // maxDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "end_date");
                }}
                value={form?.end_date}
                isError={errorData?.end_date}
              />
            </div>
          </div>
          <div className={"formFlex"} style={{ paddingBottom: "0" }}>
            <div className={"formGroup"} style={{ paddingBottom: "0" }}>
              <div className={styles.radioWrapper}>
                <div className={styles.radioheading}>Type of Tour:</div>
                <RadioGroup
                  aria-label="option"
                  name="tour_type"
                  value={form?.tour_type}
                  onChange={(e) => changeTextData(e.target.value, "tour_type")}
                  row
                >
                  <FormControlLabel
                    value="DOMESTIC"
                    control={<Radio />}
                    label="Domestic Travel"
                  />
                  <FormControlLabel
                    style={{ marginLeft: "20px" }}
                    value="FOREIGN"
                    control={<Radio />}
                    label="Foreign Travel"
                  />
                </RadioGroup>
              </div>
            </div>
            <div
              className={"formGroup"}
              style={{ marginTop: "10px", paddingBottom: "0" }}
            >
              <div className={styles.radioWrapper}>
                <div className={styles.radioheading}>Nature of Tour:</div>
                <RadioGroup
                  aria-label="option"
                  name="tour_nature"
                  value={form?.tour_nature}
                  onChange={(e) =>
                    changeTextData(e.target.value, "tour_nature")
                  }
                  row
                >
                  <FormControlLabel
                    value="FUNCTIONAL"
                    control={<Radio />}
                    label="Functional"
                  />
                  <FormControlLabel
                    style={{ marginLeft: "20px" }}
                    value="OPERATIONAL"
                    control={<Radio />}
                    label="Operational"
                  />
                  <FormControlLabel
                    style={{ marginLeft: "20px" }}
                    value="BUSINESS"
                    control={<Radio />}
                    label="Business"
                  />
                </RadioGroup>
              </div>
            </div>
          </div>
          <div className={"formFlex2"}>
            <div className={"formGroup1"}>
              <CustomTextField
                isError={errorData?.purpose}
                errorText={errorData?.purpose}
                label={"Describe the Purpose of your travel"}
                value={form?.purpose}
                onTextChange={(text) => {
                  changeTextData(text, "purpose");
                }}
                onBlur={() => {
                  onBlurHandler("purpose");
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Travel Details</div>
          <div>
            <DetailsIncludeForm
              ref={travelRef}
              grade={employeeDetails?.grade?.code}
              travelType={form?.tour_type}
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Accommodation Details</div>
          <div>
            <OtherDetailsIncludeForm
              ref={otherRef}
              grade={employeeDetails?.grade?.code}
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.formSelectWrapper}>
          <span className={styles.heading}>
            <b>Requirements</b>
          </span>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <div className={styles.checkBoxWrap}>
                <input
                  style={{ cursor: "pointer" }}
                  type="checkbox"
                  name={"isSame"}
                  value={"isSame"}
                  onClick={() => {
                    changeTextData(
                      !form?.exception_required,
                      "exception_required"
                    );
                  }}
                  id="exceptions"
                  checked={form?.exception_required}
                />
                <label>
                  I require exceptions approval for plan outside my entitlement.
                </label>
                <br />
              </div>
            </div>
          </div>
          {form?.exception_required && (
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.exception_details}
                errorText={errorData?.exception_details}
                label={"Mention details for exception"}
                value={form?.exception_details}
                onTextChange={(text) => {
                  changeTextData(text, "exception_details");
                }}
                onBlur={() => {
                  onBlurHandler("exception_details");
                }}
              />
            </div>
          )}
          {/* <div className={"formFlex"}>
            <div className={"formGroup"}>
              <div className={styles.checkBoxWrap}>
                <input
                  style={{cursor:'pointer'}}
                  type="checkbox"
                  name={"isSame"}
                  value={"isSame"}
                  onClick={() => {
                    changeTextData(
                      !form?.exception_required,
                      "exception_required"
                    );
                  }}
                  id="exceptions"
                  checked={form?.exception_required}
                />
                <label htmlFor="exceptions">
                I require imprest for my travel
                </label>
                <br />
              </div>
            </div>
          </div> */}
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <div className={styles.checkBoxWrap}>
                <input
                  style={{ cursor: "pointer" }}
                  type="checkbox"
                  name={"bond"}
                  value={isBond}
                  id="bond"
                  checked={isBond}
                />
                <label htmlFor="bond">
                  In case of Foreign travel. Total experience less than 5 years
                  or org experience of 2 years or less. Need to sign a bond. If
                  I leave within 2 years.
                </label>
                <br />
              </div>
            </div>
          </div>
          <div className={styles.lower}>
            Note: Giving Prefrence of Travel and Stay will not mean that these
            bookings will surely be done, if they are unavailiable or out of
            your entiltetelments, organziation will make the bookings as per
            Policy while keeping proximity to your choices in considration
          </div>
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
            I declare the information shared is best of my knowledge.
          </label>
          <br />
        </div>
      </div>
      <div className={styles.btnCont}>
        <ButtonBase
          type={"button"}
          disabled={!declaration || isLoading ? true : false}
          className={declaration ? styles.createBtn : styles.disabledCreatebtn}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <CircularProgress color="success" size="20px" />
          ) : (
            "Submit"
          )}
        </ButtonBase>
      </div>
    </div>
  );
}

export default TravelCreate;
