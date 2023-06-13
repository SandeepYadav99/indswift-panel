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
import history from "../../../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ClaimUpperCard from "../ClaimUpperCard/ClaimUpperCard";
import styles from "./Style.module.css";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import { CheckBox } from "@material-ui/icons";
import useClaimLocCard from "./ClaimLocCard.Hook";
import CustomDatePicker from "../../../../../components/FormFields/DatePicker/CustomDatePicker";
import LocOtherDetailsIncludeForm from "./component/LocOtherDetailsincludes/LocOtherDetailsIncludes.component";
function ClaimLocCard() {
  const {
    form,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isLoading,
    errorData,
    editData,
    declaration,
    setDeclaration,
    employeeDetails,
    claimInfo,
    travelRef,
    getAmount
  } = useClaimLocCard({});

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Local Travel Claim Form</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <ClaimUpperCard data={employeeDetails} isLoc={true} />
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Claim Details</div>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Amount Claimed:</span>
                {claimInfo?.total_claim && `₹ ${claimInfo?.total_claim}`}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Claim in Process:</span>
                {claimInfo?.progress_claim && `₹ ${claimInfo?.progress_claim}`}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formSelectWrapper}>
          <div className={"formFlex"} style={{ alignItems: "center" }}>
            <div className={"formGroup"}></div>
          </div>
          <div className={"formFlex"} style={{ alignItems: "center" }}>
            <div className={"formGroup"}>
              <div className={styles.radioWrapper}>
                <div className={styles.radioheading}>Claim Type:</div>
                <RadioGroup
                  aria-label="option"
                  name="relocation_type"
                  value={form?.relocation_type}
                  onChange={(e) => changeTextData(e.target.value, "relocation_type")}
                  row
                >
                  
                  <FormControlLabel
                    // style={{ marginLeft: "20px" }}
                    value="NEW_JOINEE"
                    control={<Radio />}
                    label="New Joinee"
                  />
                  <FormControlLabel
                    value="TRANSFER_CASE"
                    control={<Radio />}
                    label="Transfer Case"
                  />
                </RadioGroup>
              </div>
            </div>
            <div className={"formGroup"}>
              <CustomDatePicker
                // disabled={form?.relocation_type !== 'TRANSFER_CASE'}
                clearable
                label={"Date of Joining/Transfer"}
                maxDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "relocation_date");
                }}
                value={form?.relocation_date}
                isError={errorData?.relocation_date}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Expense Details</div>
          <div>
          <LocOtherDetailsIncludeForm
              ref={travelRef}
              grade={employeeDetails?.grade?.code}
              getAmount={getAmount}
            />
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
            {" "}
            I declare the information shared is best of knowledge and I have
            submitted genuine claim will authenticate bills as and where
            attached. I understand that any disparity found in claims/bills with
            respect to the organizational policies may cause auto rejection of
            claim with or without an opportunity of re-applying. I also
            understand that if any part/bill of claim is found to be forged with
            respect to laws of land or organizational policies then I will be
            individually accountable for all related legal or organizational
            consequences. I understand the submitted claim/bill is not part of
            my earning and it is a subject of approval/rejection from
            organization which can also be altered by organization as per my
            entitlements before approval or rejection.
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

export default ClaimLocCard;
