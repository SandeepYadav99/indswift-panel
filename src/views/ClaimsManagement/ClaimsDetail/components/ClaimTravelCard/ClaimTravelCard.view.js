import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
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
import OtherDetailsIncludeForm from "./component/OtherDetailsincludes/OtherDetailsIncludes.component";

function ClaimTravelCard() {
  const {
    form,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    jobDetails,
    selectedJobId,
    editData,
    declaration,
    setDeclaration,
    employeeDetails,
    claimInfo,
    getMonthlyArray,
    travelRef,
    otherRef
  } = useClaimTravelCard({});
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };
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
                {getMonthlyArray()?.map((item) => (
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
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Travel Details</div>
          <div>
            <DetailsIncludeForm ref={travelRef} grade={employeeDetails?.grade?.code}/>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Other Expenses Details</div>
          <div>
            <OtherDetailsIncludeForm ref={otherRef}grade={employeeDetails?.grade?.code} />
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
