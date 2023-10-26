import {
  ButtonBase,
  Checkbox,
  CircularProgress,
  MenuItem,
} from "@material-ui/core";
import React from "react";
import history from "../../../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ClaimUpperCard from "../ClaimUpperCard/ClaimUpperCard";
import styles from "./Style.module.css";
import ClaimInfo from "../ClaimInfo/ClaimInfo";
import { useState } from "react";
import File from "../../../../../components/FileComponent/FileComponent.component";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import useClaimTravelCard from "./ClaimTravelCard.hook";
import DetailsIncludeForm from "./component/Detailsincludes/DetailsIncludes.component";
import CoIncludeForm from "./component/Coincludes/Coinclude.component";
import OtherDetailsIncludeForm from "./component/OtherDetailsincludes/OtherDetailsIncludes.component";
import { CheckBox } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

function ClaimTravelCard() {
  const history = useHistory();
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
    claimInfo,
    getMonthsInRange,
    travelRef,
    otherRef,
    coRef,
    getTravelAmount,
    getotherAmount,
    startDate,
    endDate,
    employees,
    isChecked,
    handleCheckboxChange,
  } = useClaimTravelCard({});

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
      <ClaimUpperCard data={employeeDetails} />
      <div className={styles.plainPaper}>
        <ClaimInfo idCards={claimInfo} isLocal={true} />

        <div className={styles.formSelectWrapper}>
          <div className={"formFlex"} style={{ alignItems: "center" }}>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.rem_month}
                errorText={errorData?.rem_month}
                label={"Choose Reimbursement Month"}
                value={form?.rem_month}
                handleChange={(value) => {
                  changeTextData(value, "rem_month");
                }}
              >
                {getMonthsInRange()?.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </CustomSelectField>
            </div>
          </div>
          <div className={"formFlex"} style={{ alignItems: "center" }}>
            <div className={"formGroup"}>
              <File
                max_size={10 * 1024 * 1024}
                type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                fullWidth={true}
                name="od1"
                label="Upload OD Screenshot 1"
                accept={"application/pdf,application/msword,image/*"}
                link={editData?.od_ss ? editData?.od_ss : null}
                error={errorData?.od_ss}
                value={form?.od_ss}
                placeholder={"Upload OD Screenshot 1"}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "od_ss");
                  }
                }}
              />
            </div>
            <div className={"formGroup"}>
              <File
                max_size={10 * 1024 * 1024}
                type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                fullWidth={true}
                name="od2"
                label="Upload OD Screenshot 2"
                accept={"application/pdf,application/msword,image/*"}
                link={editData?.od_ss_2 ? editData?.od_ss_2 : null}
                error={errorData?.od_ss_2}
                value={form?.od_ss_2}
                placeholder={"Upload OD Screenshot 2"}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "od_ss_2");
                  }
                }}
              />
            </div>
          </div>
          <div className={styles.checkWrapper}>
            <div className={styles.chkwrapp}>
              <Checkbox
                disabled={false}
                onChange={handleCheckboxChange}
                checked={isChecked}
                value="secondary"
                color="primary"
                size="small"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <span className={styles.spanchk}>
                Do you have a co-traveler?
              </span>
            </div>
            {isChecked && (
              <div>
                <CoIncludeForm
                  ref={coRef}
                  employees={employees}
                  isChecked={isChecked}
                  employeeId={employeeDetails?.id}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Travel Details</div>
          <div>
            <DetailsIncludeForm
              startDate={startDate}
              endDate={endDate}
              ref={travelRef}
              grade={employeeDetails?.grade?.code}
              getTravelAmount={getTravelAmount}
              month={form?.rem_month}
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Other Expenses Details</div>
          <div>
            <OtherDetailsIncludeForm
              startDate={startDate}
              endDate={endDate}
              ref={otherRef}
              grade={employeeDetails?.grade?.code}
              getotherAmount={getotherAmount}
              month={form?.rem_month}
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

export default ClaimTravelCard;
